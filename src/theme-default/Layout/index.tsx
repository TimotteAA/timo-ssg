import { FC, useState } from 'react';

const Layout: FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>default layout component</h2>
            <div>
                {count}
                <button onClick={() => setCount(count + 1)}>Add count by 1</button>
                <div>FUck you</div>
            </div>
        </div>
    );
};

export default Layout;
