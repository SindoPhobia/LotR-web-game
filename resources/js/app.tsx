import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { useBasicStore } from './Store/basic_store';
import { PageProps } from './types';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName} ${useBasicStore.getState().value}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        // Runs on every page change
        props.initialPage.props.value = useBasicStore.getState().value;
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} initialPage={props.initialPage} />);
        }else{
            createRoot(el).render(<App {...props} initialPage={props.initialPage}/>);
        }

    },
    progress: {
        color: '#4B5563',
    },
});
