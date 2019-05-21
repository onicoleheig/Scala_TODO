import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Link from './Link';
import theme from '../util/Theme';
import cookbookIcon from '../assets/images/cookbook_icon.png';

const styles = {
  thumpnail: {
    width: '20%',
    minWidth: '200px',
    borderRadius: '2px',
    backgroundColor: theme.palette.background.light,
    margin: '10px',
    display: 'inline-block',
    position: 'relative',
  },

  image: {
    width: '100%',
    paddingBottom: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    borderRadius: '2px 2px 0px 0px',
  },

  name: {
    marginTop: '5px',
    marginBottom: '5px',
    fontSize: '18px',
  },

  text: {
    paddingLeft: '10px',
  },

  description: {
    wordWrap: 'break-word',
  },

  tags: {
    bottom: '25px',
    paddingLeft: '10px',
    paddingBottom: '22px',
  },

  tag: {
    fontStyle: 'italic',
    fontSize: '12px',
  },

  chief: {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
  },

  link: {
    color: theme.palette.secondary.light,
  },
};

/*
 * component that represent a thumbnail for a recipe
 */
class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.recipe = props.recipe;
    this.image = this.recipe.image === '' ? cookbookIcon : this.recipe.image;
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.thumpnail}>
          <a href={`/recipes/${this.recipe.id}`}>
            <div
              alt={this.alt}
              className={classes.image}
              style={{
                backgroundImage: `url(${this.image})`,
              }}
            />
          </a>
          <Typography color="primary" className={classNames(classes.name, classes.text)}>
            {this.recipe.name}
          </Typography>
          <div className={classes.tags}>
            <Typography className={classes.tag}>
              { this.recipe.tags
                ? this.recipe.tags.map(tag => (
                  <span>{`#${tag} `}</span>
                )) : null
                }
            </Typography>
          </div>
          <Typography className={classes.chief}>
            {'by '}
            <Link href={`users/${this.recipe.chief.id}`} className={classes.link}>
              {this.recipe.chief.name}
            </Link>
          </Typography>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

Thumbnail.propTypes = {
  recipe: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thumbnail);
