import React from 'react';
import { Select, Spin, Input } from 'antd';
import debounce from 'lodash/debounce';
const Option = Select.Option;
const Search = Input.Search;

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    this.handleChange = debounce(this.handleChange, 800);
    this.onSearchChange = debounce(this.onSearchChange, 800);
  }
  componentWillMount(){
    console.log('componentWillMount');
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  onSearchChange = (value) => {
      console.log(value);
    //   setTimeout(() => {
    //       console.log(e.type);
    //   }, 200)
    //   console.log(e.type);
    //   console.log(e.target.value);
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <div style={{ width: '200px', height: '200px', margin: '50px'}}>
        <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '100%' }}
        >
            {data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
        <Search onChange={ e => { this.onSearchChange(e.target.value)}}
        />
      </div>
    );
  }
}

export default UserRemoteSelect;
