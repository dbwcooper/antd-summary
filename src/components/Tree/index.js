import React from 'react';
import { Icon, Popover, Tree, Input } from 'antd';
import debounce from 'lodash.debounce';
import styles from './style';

const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const generateList = [];
class CustTree extends React.Component {

  state = {
    expandedKeys: [],
    selectedKeys: [],
    searchValue: '',
  };
  
  componentDidMount(){
    const { treeData } = this.props;
    this.generateTreeList(treeData);
  }
  // expand / close
  onExpand = (expandedKeys) => {
    // const {
    //   unfold
    // } = this.props;

    // unfold();
    this.setState({
      expandedKeys,
    });
  };
  // onSearchClick = () => {
  //   this.props.unfold();
  // };
  /**
   *  searcHandler function
   */
  onSearchChange = (e) => {
    this.onSearchHandleByDebounce(e.target.value);
  };
  onSearchHandleByDebounce = debounce((value) => {
    console.log('onSearchHandleByDebounce value', value);
    // this.setState({
    //   searchValue: value
    // }) 因为generateList map需要一定时间, 如果将setState在map前被执行, 那么
    if (!value) {
      return this.setState({ expandedKeys: [], searchValue: value });
    }
    let expandedKeys = generateList.map((item) => {
      // LowerCase and UpperCase is the same case
      if ((item.title + '').toLocaleLowerCase().indexOf((value + '').toLocaleLowerCase()) > -1) {
        return item.key + '';
      }
      return null;
    }).filter(item => item !== null);
    this.setState({ expandedKeys, searchValue: value })
  }, 500);

  onSelectTree = (selectedKeys, e) => {
    console.log('e.node.props.eventKey', e.node.props);
    let { expanded, eventKey } = e.node.props;  // expand tree selected expanded eventKey
    let { expandedKeys } = this.state;
    if(eventKey < 0) { // expand parent nodes
      // let index = expandedKeys.findIndex(item => item === selectedKeys[0]);
      if(expanded) {
        // collopse;
        let index = expandedKeys.findIndex(item => item === selectedKeys[0]);
        expandedKeys.splice(index, 1);
      } else {
        expandedKeys.push(eventKey);
      }
      return  this.setState({ expandedKeys });
    }
    this.setState({ selectedKeys });
    if (eventKey > 0 && document.documentElement.scrollTop > 100) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  onFilter = (TreeList) => {
    // const { TreeList } = this.props;
    const isOuterTreeList = TreeList.some(item => item.children && item.children.length !== 0);

    if (isOuterTreeList) {
      let renderTreeList = [];
      TreeList.forEach((item) => {
        if (item.children && item.children.length) {
          let filterChildren = this.childrenData(item.children);
          if (filterChildren.length) {
            renderTreeList.push(
              {
                ...item,
                children: this.childrenData(item.children)
              }
            );
          }
        }
      });

      return renderTreeList;
    } else {
      return TreeList.map((item) => {
        if (item.children && item.children.length) {
          return {
            ...item,
            children: this.childrenData(item.children)
          }
        } else {
          return item;
        }
      });
    }
  };

  // all children nodes
  getTreeNodes = (data) => {
    let { searchValue } = this.state;
    searchValue = searchValue.toLowerCase();
    let searchLen = searchValue.length;
    let TreeList = data;
    if (searchLen) {
      TreeList = this.onFilter(data);
    } 
    return TreeList.map((item) => {
      let { euNo, size, euName, alert } = item.eu;
      let name = euName.toLowerCase();
      let index = name.indexOf(searchValue);
      let newEuNameStr = <span>{euName} {euNo < 0 && ` (${size})`} {alert === 'Yes' ? <Icon type="exclamation-circle-o" /> : ''}</span>;
      if(index > -1 && euNo > 0) {
        let beforeStr = euName.substr(0, index);
        let centerStr = euName.substr(index, searchLen);
        let afterStr = euName.substr(index + searchLen);
        newEuNameStr = <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{centerStr}</span>
            {afterStr}
          </span>
      }

      let popoverContent = (
        <div style={{ color: '#f50' }}> {euName} <div>Eu#:{euNo}</div> </div>);

      let title = <Popover content={popoverContent}> {newEuNameStr}</Popover>;
        
      if (item.children && item.children.length) {
        title = newEuNameStr;
      }

      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.eu.euNo}
            title={title}
          >
            {this.getTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.eu.euNo} title={<span>{title}</span>} />;
    });
  };
  generateTreeList = (data) => {
    for (let i = 0; i < data.length; i++) {
      generateList.push({
        key: data[i].eu.euNo,
        title: data[i].eu.euName + '(' + data[i].eu.size + ')',
        alert: data[i].eu.alert
      });
      if (data[i].children) this.generateTreeList(data[i].children);
    }
  };
  childrenData = (children) => {
    let arr = [];
    const { searchValue } = this.state;
    children.forEach((childrenItem) => {
      const { euName } = childrenItem.eu;
      const name = euName.toLowerCase();
      const value = searchValue.toLowerCase();
      const index = value ? name.indexOf(value) : -1;
      if (index > -1) {
        arr.push(childrenItem)
      }
    });
    return arr
  };

  render() {
    const { treeData }= this.props;
    const { expandedKeys, selectedKeys } = this.state;
    console.log('expandedKeys', expandedKeys);
    return (
      <div style={{ display: 'flex' }}>
        <div className={styles['search-tree']}>
          <Search
            placeholder={'search'}
            onChange={this.onSearchChange}
            onClick={this.onSearchClick}
            onSearch={this.onSearchClick}
          />
          <Tree
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={this.onExpand}
            onSelect={this.onSelectTree}
          >
            {this.getTreeNodes(treeData)}
          </Tree>
        </div>
        <p>
        react组件使用debounce时应该注意哪些问题
        </p>
      </div>
    )
  }
}

export default CustTree;
