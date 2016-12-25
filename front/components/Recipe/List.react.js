var React = require('react');
var moment = require('moment');

var RecipeStore = require('../../stores/RecipeStore');
var RecipeActions = require('../../actions/RecipeActions');

var Card = require('material-ui/lib/card/card');
var CardTitle = require('material-ui/lib/card/card-title');
var CardText = require('material-ui/lib/card/card-text');

module.exports = React.createClass({
  displayName: 'RecipeList',

  componentDidMount: function() {
    RecipeStore.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount: function() {
    RecipeStore.removeChangeListener(this.onStoreChange);
  },

  onStoreChange: function() {
    this.setState({recipes: RecipeStore.get()});
  },

  getInitialState: function() {
    RecipeActions.GetAll();
    return {recipes: RecipeStore.get()};
  },

  render: function() {
    return (
      <div className={this.props.className + ' row'}>
        {this.getRecipeElements()}
      </div>
    );
  },

  getRecipeElements: function() {
    return this.state.recipes.map(function(recipe, index) {
      var creationDate = 'Recipe created on ' +
        moment(recipe.created, 'x').format('DD-MM-YYYY');

      return (
        <div key={index} className="col-xs-12 col-md-3">
          <Card>
            <CardTitle title={recipe.name} subtitle={creationDate} />
            <CardText>{recipe.description}</CardText>
          </Card>
        </div>
      );
    });
  },
});
