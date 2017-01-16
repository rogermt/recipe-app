/**
 * External dependencies
 */
import React, { Component } from 'react';
import moment from 'moment';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

/**
 * Internal dependencies
 */
import RecipeStore from '../../stores/RecipeStore';
import RecipeActions from '../../actions/RecipeActions';

export default class RecipeList extends Component {
  componentDidMount() {
    RecipeStore.addChangeListener( this.onStoreChange );
  }

  componentWillUnmount() {
    RecipeStore.removeChangeListener( this.onStoreChange );
  }

  onStoreChange() {
    this.setState( { recipes: RecipeStore.get() } );
  }

  componentWillMount() {
    RecipeActions.GetAll();
    this.state = { recipes: RecipeStore.get() };
  }

  render() {
    return (
      <div className={ this.props.className + ' row' }>
        { this.getRecipeElements() }
      </div>
    );
  }

  getRecipeElements() {
    return this.state.recipes.map( ( recipe, index ) => {
      const creationDate = 'Recipe created on ' +
        moment( recipe.creation ).format( 'DD-MM-YYYY' );

      return (
        <div key={ index } style={ { marginBottom: 10 } } className="col-xs-12 col-md-3">
          <Card>
            <CardTitle title={ recipe.name } subtitle={ creationDate } />
            <CardText>{ recipe.description }</CardText>
          </Card>
        </div>
      );
    } );
  }
};
