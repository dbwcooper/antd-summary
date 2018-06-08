import React, { Component } from 'react';


// 错误处理组件
class ErrorHandle extends Component {
  state = {
    error: null,
    errorInfo: null
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
  }
  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if(errorInfo) {
      return (<div>
        <h2> 组件出现错误</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>)
    }
    return children;
  }
}

class Counter extends Component {
  state = {
    counter: 0
  }
  handleClick = () => {
    console.log('handle');
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  render() {
    const { counter } = this.state;
    if (counter === 5) {
      
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{counter}</h1>;
  }
}

class ErrorCounter extends Component {
  render() {
    return (
      <ErrorHandle>
        <Counter />
      </ErrorHandle>
    )
  }
}
export default ErrorCounter;
