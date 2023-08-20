import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '../theme-default/App';
import siteData from 'timo:site-data';

console.log('配置对象 ', siteData);

/**
 * 浏览器入口
 */
function renderInBrowser() {
    const root = document.getElementById('root');
    if (!root) {
        throw new Error('#root element not found');
    }
    createRoot(root).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );
}

renderInBrowser();
