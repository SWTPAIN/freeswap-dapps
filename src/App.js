import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import NewItemForm from './components/NewItemForm';
import * as ACTIONS from './redux/swapItem/actions';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  componentWillMount() {
    this.props.getTotalNumberOfItems();
  }

  handleCreateItem() {
    //this.freeSwapInstance.createSwapItem("pencil", "black pencil", {from: accounts[0]});
  }

  handleFormFieldUpdate = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        this.props.updateNewItemName(value);
      case 'description':
        this.props.updateNewItemDescription(value);
    }
  }

  render() {
    const {form} = this.props;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {
                this.props.totalNumberOfItems
              }
            </div>
          </div>
        </main>
        <div>
          <NewItemForm
            name={form.name}
            description={form.description}
            handleFieldUpdate={this.handleFormFieldUpdate}
            handleSubmit={this.handleCreateItemButton} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }),
  totalNumberOfItems: PropTypes.number
};

const mapStateToProps = state => ({
  form: state.swapItem.form,
  totalNumberOfItems: state.swapItem.totalNumberOfItems
});

const AppContainer = connect(
  mapStateToProps,
  {
    updateNewItemName: ACTIONS.updateNewItemName,
    updateNewItemDescription: ACTIONS.updateNewItemDescription,
    getTotalNumberOfItems: ACTIONS.getTotalNumberOfItems,
  }
)(App);

export default AppContainer;
