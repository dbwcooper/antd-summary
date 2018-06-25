
import { fromJS } from 'immutable';
import euTreeData from '../assets/eutree.json';

let Store = {
    title: 'immutable page',
    TreeData: euTreeData.data.children,
    activeKey: '-1001'
}

export default fromJS(Store);
