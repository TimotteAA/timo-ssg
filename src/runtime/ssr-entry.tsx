import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../theme-default/App';

/**
 * ssg与ssr类似，需要在服务端直出html
 *
 * @returns
 */
export function render() {
    return renderToString(
        <StaticRouter location={'/guide'}>
            <App />
        </StaticRouter>,
    );
}
