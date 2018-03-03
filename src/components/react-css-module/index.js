import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './table.less';

class ReactCssModule extends React.PureComponent{
    render() {
        return <div styleName='table'>
            <div styleName='ant-form-item'>
                <div styleName='cell'>A0</div>
                <div styleName='cell'>B0</div>
            </div>
        </div>;
    }
}

export default CSSModules(ReactCssModule, styles);