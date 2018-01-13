import React from 'react';

const generateCommonInputHandler = (fieldName, handler) => e => {
  e.preventDefault();
  handler(fieldName, e.target.value)
}

const NewItemForm = ({name, description, handleFieldUpdate, handleSubmit}) =>
  <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
    <label htmlFor="itemNameInput">
      Item name
    </label>
    <input
      value={name}
      onChange={generateCommonInputHandler('name', handleFieldUpdate)}
      type="text" id="itemNameInput" placeholder="Item Name"/>
    <label htmlFor="itemDescriptionInput">
      Item description
    </label>
    <input
      value={description}
      onChange={generateCommonInputHandler('description', handleFieldUpdate)}
      type="text" id="itemDescriptionInput" placeholder="Item Description"/>
    <button type="submit">Submit</button>
  </form>
export default NewItemForm;
