import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const generateCommonInputHandler = (fieldName, handler) => e => {
  e.preventDefault();
  handler(fieldName, e.target.value)
}

const NewItemForm = ({classes, name, description, handleFieldUpdate, handleSubmit}) =>
  <div>
    <Typography type="headline" gutterBottom>
      Give away thing
    </Typography>
    <form
      className={classes.container}
      onSubmit={e => {e.preventDefault(); handleSubmit()}}>
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        value={name}
        onChange={generateCommonInputHandler('name', handleFieldUpdate)}
        margin="normal"
        fullWidth
      />
      <TextField
        id="description"
        label="Description"
        className={classes.textField}
        value={description}
        onChange={generateCommonInputHandler('description', handleFieldUpdate)}
        margin="normal"
        fullWidth
      />
      <Button type="submit" raised color="primary">
        Submit
      </Button>
    </form>
  </div>

NewItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(NewItemForm);
