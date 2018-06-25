import React, { Component } from 'react';
import { Select, Tabs  } from "antd";
import Table from "./Table";
import styles from "./style";

const Option = Select.Option;
const { TabPane } = Tabs;
const children = [];
class Immutable extends Component {
  constructor(props, context) {
    super(props, context);
    const { immutable } = props;
    const TreeData = immutable.get('TreeData')
    for (let i = 0; i < TreeData.length; i++) {
      let value = TreeData[i].eu.euName + ' (' + TreeData[i].eu.size +')';
      children.push(<Option key={TreeData[i].eu.euNo}> {value} </Option>);
    }
  }
  tabChange = (activeKey) => {
    const { dispatch } = this.props;
    dispatch({ type: 'immutable/r_setState', activeKey})
  }
  render() {
    const { immutable, dispatch } = this.props;
    const activeKey = immutable.get('activeKey');
    const TreeData = immutable.get('TreeData');
    return (
      <div className={styles.page}>
        <Tabs
          activeKey={activeKey}
          onChange={this.tabChange}
          tabPosition="top"
        >
        {TreeData.map((item) =>
          <TabPane tab={item.getIn(['eu', 'euName']) + ' (' + item.getIn(['eu', 'size']) +')'} key={item.getIn(['eu', 'euNo'])}>
            <Table dataSource={item.get('children').toJS()} dispatch={dispatch}  />
          </TabPane>)
        }
        </Tabs>
        
      </div>
    );
  }
}

export default Immutable;