import React, { Component } from 'react'
import ListModal from '../components/modals/list';

class ModalaA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_is_open: true,
    }
  }

  setIsOpen = (val) => {
    this.setState({
      modal_is_open: val,
    }, () => {
      this.props.history.push('/');
    });
  }

  redirectPage = (page) => {
    if (page === 'A') {
      this.props.history.push('/modal_a');
    } else {
      this.props.history.push('/modal_b');
    }
  }

  render() {
    return (
      <div>
        {this.state.modal_is_open && <ListModal type='all' caption='Modal A' setIsOpen={this.setIsOpen} redirectPage={this.redirectPage} />}
      </div>
    )
  }
}

export default ModalaA;
