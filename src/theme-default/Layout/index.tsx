import { FC } from 'react';
import { Content } from '../../runtime/Content';

const Layout: FC = () => {
    return (
        <div>
            <h2>default layout component</h2>
            <h3>Common compo</h3>
            <Content />
        </div>
    );
};

export default Layout;
