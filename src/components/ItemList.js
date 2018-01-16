import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const stateToString = state => {
  switch(state) {
    case 0:
      return 'Available';
    case 1:
      return 'Swaped';
    case 2:
      return 'Disabled';
  }
}

const Item = ({
  classes,
  handleDisableButtonClick,
  handleRequestButtonClick,
  item: {name, description, state}}) =>
  <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>{name}({stateToString(state)})</Typography>
        <Typography className={classes.description}>{description}</Typography>
      </CardContent>
      <CardActions>
        {
          (state === 0) &&
          [
            <Button
              key="requestButton"
              onClick={handleRequestButtonClick}
              dense>Request Take</Button>,
            <Button
              key="disableButton"
              onClick={handleDisableButtonClick} 
              dense>Disabled</Button>
          ]
        }
      </CardActions>
    </Card>
  </div>

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

const itemStyles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  description: {
    fontSize: 14,
  },
  status: {
    margin: 4
  }
});

const StyledItem = withStyles(itemStyles)(Item);

const ItemList = ({items, handleDisableItemButtonClick, handleRequestItemButtonClick}) =>
  <div>
    <Typography type="headline" gutterBottom>
      List of Item to be taken
    </Typography>
    {
      items.map(item =>
        <StyledItem
          key={item.id}
          item={item}
          handleRequestButtonClick={() => handleRequestItemButtonClick(item.id)}
          handleDisableButtonClick={() => handleDisableItemButtonClick(item.id)}
        />
      )
    }
  </div>

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.number
  })),
  handleRequestItemButtonClick: PropTypes.func.isRequired,
  handleDisableItemButtonClick: PropTypes.func.isRequired,
}

export default ItemList;
