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
    const { immutable: { TreeData } } = props;
    for (let i = 0; i < TreeData.length; i++) {
      let value = TreeData[i].eu.euName + ' (' + TreeData[i].eu.size +')';
      children.push(<Option key={TreeData[i].eu.euNo}> {value} </Option>);
    }
  }
  tabChange = (activeKey) => {
    const { dispatch } = this.props;
    let payload = { activeKey };
    dispatch({ type: 'immutable/r_setState', payload})
  }
  handleChange = (values) => {
    console.log(`Selected: ${values}`);
  }
  render() {
    const { immutable: { TreeData, activeKey }, dispatch } = this.props;
    return (
      <div className={styles.page}>
        <h3>选择用于显示的列表</h3>
        <Select
            mode="multiple"
            placeholder="请选择"
            onChange={this.handleChange}
            style={{ width: '100%' }}
        >
        {children}
        </Select>
        <Tabs
          activeKey={activeKey}
          onChange={this.tabChange}
          tabPosition="top"
        >
        {TreeData.map(({ eu: { euName, size, euNo}, children}) =>
          <TabPane tab={euName + ' (' + size +')'} key={euNo}>
            <Table dataSource={children} dispatch={dispatch}  />
          </TabPane>)
        }
        </Tabs>
        
      </div>
    );
  }
}

export default Immutable;