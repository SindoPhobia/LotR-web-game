const fs = require('fs');
const path = require('path');

const textToType = Object.freeze({
    'id': 'Id',
    'foreignId': 'ForeignId',
    'timestamp': 'Timestamp',
    'timestamps': 'Timestamps',
    'text': 'string',
    'text': 'string',
    'integer': 'number',
    'rememberToken': 'string',
})

const getTypeCustom = (typeName) => {
    if(typeName.toLowerCase().includes('text')){
        return textToType['text'];
    }else if(typeName.toLowerCase().includes('integer')){
        return textToType['integer'];
    }else if(typeName.toLowerCase()==='id'){
        return textToType['id'];
    }else if(typeName.toLowerCase().includes('timestamp')){
        return textToType['timestamp'];
    }else if(typeName.toLowerCase().includes('foreignid')){
        return textToType['foreignId'];
    }else if(typeName.toLowerCase().includes('remembertoken')){
        return textToType['rememberToken'];
    }
    return typeName;
}
const getTypeTs = (typeName) => {
    if(typeName.toLowerCase().includes('id')){
        return 'number';
    }else {
        return 'string';
    }
}
const isOptional = (modifiers) => {
    return modifiers.includes('nullable');
}
const getModifierComments = (modifiers) => {
    console.log(modifiers)
    const defaultValueString = '[Default value]: '
    const uniqueValueString = '[Unique value]'
    if(modifiers.includes('useCurrent')){
        return `${defaultValueString}Date.now()`;
    }else if(modifiers.includes('default')){
        return `${defaultValueString}${modifiers.split('default(')[1].trim()}`;
    }
    else if (modifiers.includes('unique')){
        return uniqueValueString;
    }else if(modifiers.includes('index')){
        return '[Index]';
    }else if(modifiers.includes('primary')){
        return '[Primary Key]';
    }
    return null;
}

const customObjects = Object.values(textToType).filter(item => item.at(0).toUpperCase()===item.at(0));
const migrations = fs.readdirSync(path.join(__dirname, 'database/migrations'));
let fileNames = {};

fs.rmSync(path.join(__dirname, `resources/js/types/models/tables`), { recursive: true,force: true });
fs.mkdirSync(path.join(__dirname, `resources/js/types/models/tables`), { recursive: true });

migrations.forEach((migration) => {
    // if(!migration.includes('todos'))return;
    const migrationText = fs.readFileSync(path.join(__dirname, 'database/migrations', migration), 'utf8');
    // const fieldRegex = /\$table->(\w+)\('(\w+)'\)|\$table->(\w+)\(\)/g;
    const fieldRegex = /\$table->(\w+)\((?:'(\w+)'(?:, ?(\d+))?)?\)(.*?)(?=\$table|\}|\);)/gs;
    const schemaRegex =  /Schema::create\('(\w+)'\, function \(Blueprint \$table\) \{([\s\S]+?)\}\);/g;

    const _fileName = migration.replace('.php','').split('_').at(-2);
    const fileName = _fileName.charAt(0).toUpperCase() + _fileName.slice(1,_fileName.length-1);
    fileNames[fileName] = [];

    const tables = [];

    let schemaMatch;
    while ((schemaMatch = schemaRegex.exec(migrationText)) !== null) {
        const _tableName = schemaMatch[1]; // e.g., 'users', 'password_reset_tokens', etc.
        const tableName = _tableName.at(0).toUpperCase() + _tableName.slice(1,_tableName.length-1);
        const tableFields = [];
        console.log(migrationText);

        // Extract fields within the current table's definition
        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(schemaMatch[2])) !== null) {
            // console.log(fieldMatch);
            const fieldType = fieldMatch[1];  // e.g., 'string', 'foreignId', 'timestamp'
            const fieldName = fieldMatch[2] ?? fieldMatch[1];  // e.g., 'name', 'email', 'user_id'
            const fieldModifiers = fieldMatch[4]?.trim();  // Any chained methods like '->nullable()->unique()'
            console.log(fieldType)


            // Push the field with its type and modifiers
            tableFields.push({
                fieldType,
                fieldName,
                fieldModifiers: fieldModifiers || null,  // Capture the modifiers, if any
            });
        }

        // Store the table and its fields in the result
        tables.push({
            tableName,
            fields: tableFields,
        });
    }
    fileNames[fileName] = ([...tables.map(({ tableName: _tableName }) => _tableName)]);
    let fileText = `import {${customObjects.join(', ')}} from '../index';\n\n`;
    tables.forEach(({ tableName: tableName, fields }) => {

      let typeDefinition = `export type ${tableName} = {
    ${fields.map(({ fieldType, fieldName,fieldModifiers }) => `${fieldName}${isOptional(fieldModifiers) ? '?' : ''}: ${getTypeCustom(fieldType)}; ${getModifierComments(fieldModifiers) ? `//\* ${getModifierComments(fieldModifiers)}` : ''}`).join('\n    ')}
}`;
        fileText += `${typeDefinition}\n\n`;
    });
    fs.writeFileSync(path.join(__dirname, `resources/js/types/models/tables/${fileName}.ts`), fileText);
});

const customObjectsDefinitions = customObjects.map((customObject) => `export type ${customObject} = ${getTypeTs(customObject)};`).join('\n\n');

const importsText = Object.keys(fileNames).map((fileName) => `import {${fileNames[fileName].join(', ')}} from './tables/${fileName}';`).join('\n');
fs.writeFileSync(path.join(__dirname, `resources/js/types/models/index.ts`), `${importsText}\n\n${customObjectsDefinitions}`);
