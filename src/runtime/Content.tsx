import { useRoutes } from 'react-router-dom';

import { routes } from 'timo:routes';
export const Content = () => {
    return useRoutes(routes);
};
