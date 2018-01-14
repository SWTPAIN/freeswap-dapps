import React from 'react';

const Item = ({item: {name, description, state}}) =>
  <div>
    <span>{name}</span>
    <span>{description}</span>
    <span>{state}</span>
  </div>

const ItemList = ({items}) =>
  <div>
    {
      items.map(item =>
        <Item
          key={item.id}
          item={item}/>
      )
    }
  </div>

export default ItemList;
