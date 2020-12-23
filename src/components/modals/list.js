import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';

//LOCAL
import { fetchContacts } from '../../utils/service';
import Spinner from '../common/spinner';
import actions from '../../store/actions';

//SCSS
import './modal.scss';

function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e;
  };
}

class ListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      is_fetching: false,
      search_text: '',
    };

    this.is_mounted = false;
  }

  componentDidMount() {
    this.is_mounted = true;
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search_text !== this.state.search_text) {
      this.setState(
        {
          page: 1,
        },
        () => {
          this.getData();
        }
      );
    }
  }

  componentWillUnmount() {
    this.is_mounted = false;
    this.setContactsEmpty();
  }

  getPropsContacts = (props) => {
    return props.type === 'us' ? props.us_contacts : props.contacts;
  };

  async getData() {
    const props_contacts = this.getPropsContacts(this.props);

    if (props_contacts.total !== 0 && props_contacts.total === props_contacts.list.length) {
      return;
    }

    this.setState({
      is_fetching: true,
    });

    let contacts = [],
      fetched_contacts_info = {};
    let option = {};

    if (this.props.type === 'us') {
      option = { type: 'us' };
    } else {
      option = { type: 'all' };
    }

    option = { ...option, filter: this.state.search_text };

    try {
      fetched_contacts_info = await fetchContacts(this.state.page, option);
      console.log('fetched_contacts_info', fetched_contacts_info);
    } catch (e) {
      console.log('err', e);
    }

    const contacts_obj = fetched_contacts_info.data.contacts;

    Object.keys(contacts_obj).forEach(function eachKey(key) {
      contacts.push(contacts_obj[key]);
    });

    const setContacts = this.props.type === 'us' ? this.props.actions.setUSContacts : this.props.actions.setContacts;
    if (this.is_mounted) {
      setContacts([...props_contacts.list, ...contacts], fetched_contacts_info.data.total);
    }

    this.setState({
      is_fetching: false,
    });
  }

  showItemDetail = (item) => {
    this.setState({
      item_detail: item,
    });
  };

  onChangeCheckBox = (e) => {
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: target.checked,
    });
  };

  onChangeSeachText = debounce((val) => {
    this.setContactsEmpty();
    this.setState({
      search_text: val,
    });
  }, 1000);

  onClose = () => {
    this.props.setIsOpen(false);
  };

  setContactsEmpty = () => {
    const setContacts = this.props.type === 'us' ? this.props.actions.setUSContacts : this.props.actions.setContacts;
    setContacts([], 0);
  };

  render() {
    const props_contacts = this.getPropsContacts(this.props);

    const e = window.document.getElementById('main');

    return (
      <ReactModal isOpen={true} className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="fw-600 ">{this.props.caption}</div>
            </div>
            <div className="modal-body">
              {this.state.item_detail ? (
                <div>
                  <div>Name: {this.state.item_detail.first_name}</div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="row">
                    <div className={'col-12'}>
                      <input autoFocus={true} type="text" className="form-control" placeholder={'Filter by name/number'} onChange={(e) => this.onChangeSeachText(e.target.value)} />
                    </div>
                  </div>

                  <div className={'mt-2'}>
                    <Scrollbars
                      style={{ width: 460, height: 300 }}
                      onUpdate={({ top }) => {
                        if (top === 1 && !this.state.is_fetching && !this.state.is_only_even) {
                          this.setState(
                            {
                              page: this.state.page + 1,
                            },
                            () => {
                              this.getData();
                            }
                          );
                        }
                      }}
                    >
                      {props_contacts.list.map((item, index) => {
                        if (this.state.is_only_even && index % 2 === 1) {
                          return null;
                        }
                        return (
                          <li class="list-group-item list-group-item-action pointer" onClick={() => this.showItemDetail(item)}>
                            {item.first_name || '\u00A0'}
                          </li>
                        );
                      })}
                    </Scrollbars>

                    <Spinner show={this.state.is_fetching} />

                    <div className="mt-2">
                      <input name="is_only_even" type="checkbox" checked={this.state.is_only_even} onChange={this.onChangeCheckBox} />
                      <span className="ml-2">Only even</span>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-a mr-2" onClick={() => this.props.redirectPage('A')}>
                Modal A
              </button>
              <button className="btn btn-b mr-2" onClick={() => this.props.redirectPage('B')}>
                Modal B
              </button>
              <button className="btn btn-a" onClick={this.onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts,
  us_contacts: state.us_contacts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListModal);
