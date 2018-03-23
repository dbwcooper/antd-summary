import React, { Component } from 'react';
import { Select, Spin, Input } from 'antd'
import debounce from 'lodash.debounce';
const Search = Input.Search;
const Option = Select.Option;
/**
|--------------------------------------------------
| 尝试使用antd官方的 select组件 UserRemoteSelect案例 来学习react生命周期 
| 远程数据仍然使用redux来保存
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| react 创建组件的方式
| react.createClass 所有函数的this指向当前组件 
| extends react.Component  箭头函数的 this指向当前组件 
| https://segmentfault.com/a/1190000005863630
|--------------------------------------------------
*/
class LifeCycle extends Component{
    constructor(params) {
        /**
        |--------------------------------------------------
        | params 是上级传递过来的参数, 在组件中相当于 this.props
        | super() 这里我理解为初始化上下文的操作 调用父类的constructor 并创建一个对象(new) 并将这个对象作为当前类的上下文(即是初始化this)， 所以this必须在super后调用。
        | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super 
        | https://www.zhihu.com/question/38292361?sort=created 
        |--------------------------------------------------
        */
        super(params); // 初始化this 
        console.time('super()Time');
        console.log('this.props', this.props);
        this.fetchUser = debounce(this.fetchUser, 500);
        // this.state = {
        //     render: true,
        //   }
    }
    static defaultProps = {
        data: [],
        selectList: []
    }
    state = {
        cycleValue: 1,
        fetching: false
    }
    componentWillMount() {
        console.timeEnd('super()Time'); // 198ms
        this.setState({cycleValue: 2 })
        console.log('componentWillMount---- 组件初次渲染时才会调用--');
    }
    componentWillUnmount() {
        console.log('到达componentWillUnmount');
    }
    componentDidCatch(){
        console.log('到达componentWillUpdate');
    }
    /**
    |--------------------------------------------------
    | 在整个组件的生命周期中只会执行一次
    | 如果强制多次在componentDidMount中改变数据(state/props) 会导致内存溢出。页面卡死
    |--------------------------------------------------
    */
    componentDidMount = () => {
        if(this.state.cycleValue < 5) {
            this.setState({cycleValue: this.state.cycleValue  })
        }
        console.log('到达componentDidMount', this.state.cycleValue);
    }
    
    /**
    |--------------------------------------------------
    | props发生变化时触发 然后依次触发 scu, cwu, render, cdu
    |--------------------------------------------------
    */
    componentWillReceiveProps = (nextProps, nextState) => {
      console.log('到达 componentWillReceiveProps', nextProps, nextState);
    }
    /**
    |--------------------------------------------------
    | 执行了this.setState 触发, 即使数据未改变也会触发,
    | 这个函数要求返回一个boolean值 如果没有返回值默认返回false, 并出现wain
    | 如果返回 true -> cwu, render, cdu
    |--------------------------------------------------
    */
   
    shouldComponentUpdate = (nextProps, nextState) => {
        let flag = true;
        console.log('到达shouldComponentUpdate', flag, '将不会执行render', nextProps, nextState);
        return flag;
    }
    
    componentWillUpdate(nextProps, nextState){
        console.log('到达componentWillUpdate', nextProps, nextState);
    }
    /**
    |--------------------------------------------------
    | forceUpdate 将会强行再次执行render 并且脱离原来的数据更新顺序
    | -> cdu
    |--------------------------------------------------
    */
    forceUpdate(){
        console.log('到达 forceUpdate');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('到达componentDidUpdate', prevProps, prevState);
        if(this.state.cycleValue < 5) {
            this.setState({cycleValue: this.state.cycleValue + 1 })
        }
        
    }

    fetchUser = (value) => {
        console.log('fetchUser', value);
        this.props.dispatch({type: 'example/e_lifeCycleFetch', payload: value })
    }
    handleChange = (selectList) => {
        this.setState({selectList})
        this.props.dispatch({ type: 'example/r_save', payload: {selectList}});
        console.log('handleChange', selectList);
    }
    onSearchChange = (value) => {
        console.log('onSearchChange', value);
    }
    render() {
        console.log('render', this.props);
        // this.forceUpdate();
        return (
          <div style={{ width: '200px', height: '200px', margin: '50px'}}>
            <Select
                mode="multiple"
                labelInValue
                value={this.props.selectList}
                placeholder="Select users"
                notFoundContent={<Spin size="small" /> }
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '100%' }}
            >
                {this.props.data.map(item => <Option key={item.key}> {item.value}</Option>)}
            </Select>
            <Search onChange={ e => { this.onSearchChange(e.target.value)}} />
          </div>
        );
    }
}
export default LifeCycle;