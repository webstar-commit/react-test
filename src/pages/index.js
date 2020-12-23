import React, { Component } from 'react'

class MyIndex extends Component {
  constructor(props) {
    super(props);
  }

  onClickButton = (mode) => {
    console.log('this.props', this.props)
    if (mode === 'A') {
      this.props.history.push('/modal_a');
    } else {
      this.props.history.push('/modal_b');
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: 'calc(100vh)'}}>
          <button className="btn btn-a mr-2" onClick={() => this.onClickButton('A')}>Button A</button>
          <button className="btn btn-b" onClick={() => this.onClickButton('B')}>Button B</button>
      </div>
    )
  }
}

export default MyIndex;
