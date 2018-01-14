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

const Item = ({classes, item: {name, description, state}}) =>
  <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>{name}</Typography>
        <Typography className={classes.description}>{description}</Typography>
        <Typography className={classes.description}>{stateToString(state)}</Typography>
      </CardContent>
      <CardActions>
        <Button dense>Request Take</Button>
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
  }
});

const StyledItem = withStyles(itemStyles)(Item);

const ItemList = ({items}) =>
  <div>
    <Typography type="headline" gutterBottom>
      List of Item to be taken
    </Typography>
    {
      items.map(item =>
        <StyledItem
          key={item.id}
          item={item}/>
      )
    }
  </div>

export default ItemList;
