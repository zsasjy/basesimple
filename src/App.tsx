import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useRoutes } from 'react-router-dom';
import routeConfig from 'src/config/router.config';

function App() {
    const element = useRoutes(routeConfig);
    return (
        <div className="App">
            <ErrorBoundary>{element}</ErrorBoundary>
        </div>
    );
}

export default App;
