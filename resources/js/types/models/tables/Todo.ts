import {Id, ForeignId, Timestamp, Timestamps} from '../index';

export type Todo = {
    id: Id; 
    name: string; 
    description: string; //* [Default value]: 'defaylt'
    category: string; 
}

