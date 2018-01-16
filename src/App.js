import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import NewItemForm from './components/NewItemForm';
import ItemList from './components/ItemList';
import * as ACTIONS from './redux/swapItem/actions';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  componentWillMount() {
    this.props.getAllItems();
  }

  handleFormSubmit = () => {
    const {name, description} = this.props.form;
    this.props.createItem(name, description);
  }

  handleFormFieldUpdate = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return this.props.updateNewItemName(value);
      case 'description':
        return this.props.updateNewItemDescription(value);
    }
  }

  render() {
    const {form, items} = this.props;
    console.log('items', items);
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">FreeSwap</a>
        </nav>
        <main className="container">
         <div>
            <NewItemForm
              name={form.name}
              description={form.description}
              handleFieldUpdate={this.handleFormFieldUpdate}
              handleSubmit={this.handleFormSubmit} />
          </div>
          <div>
            <ItemList
              items={items}
              handleRequestItemButtonClick={this.props.requestItem}
              handleDisableItemButtonClick={this.props.disableItem}/>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    getAllItems: PropTypes.func,
    disableItem: PropTypes.func
  }),
  totalNumberOfItems: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.number
  }))
};

const mapStateToProps = ({swapItem})=> ({
  form: swapItem.form,
  totalNumberOfItems: swapItem.totalNumberOfItems,
  items: swapItem.items
});

const AppContainer = connect(
  mapStateToProps,
  {
    updateNewItemName: ACTIONS.updateNewItemName,
    updateNewItemDescription: ACTIONS.updateNewItemDescription,
    createItem: ACTIONS.createItem,
    getAllItems: ACTIONS.getAllItems,
    disableItem: ACTIONS.disableItem,
    requestItem: ACTIONS.requestItem,
  }
)(App);

export default AppContainer;
