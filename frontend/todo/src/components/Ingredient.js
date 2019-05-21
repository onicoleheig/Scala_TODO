import React, { Component } from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import theme from '../util/Theme';

const styles = {
  div: {
    marginBottom: '10px',
  },

  ingredients: {
    listStyleType: 'none',
    paddingLeft: '8px',
  },

  title: {
    fontSize: '20px',
    marginBottom: '10px',
  },

  ingredient: {
    display: 'flex',
  },

  quantity: {
    width: '80px',
    marginRight: '20px',
  },

  name: {
    fontWeight: 'bold',
  },
};

/*
 * component that represent a set of related ingredients
 */
class Ingredient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.div}>
          <Typography className={classes.title}>{this.props.ingredient.category}</Typography>
          <ol className={classes.ingredients}>
            {this.props.ingredient.ingredients.map(ingredient => (
              <Typography key={ingredient.name}>
                <li className={classes.ingredient}>
                  <span key={ingredient.quantity} className={classes.quantity}>{ingredient.quantity}</span>
                  <span key={ingredient.name} className={classes.name}>{ingredient.name}</span>
                </li>
              </Typography>
            ))}
          </ol>
        </div>
      </MuiThemeProvider>
    );
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ingredient);
