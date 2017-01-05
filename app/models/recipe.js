/**
 * External dependencies
 */
import each from 'lodash/each';
import findIndex from 'lodash/findIndex'

export const CreateRecipe = ( user, record, done ) => {
  user.recipes.push( record );
  user.save( done );
};

export const EditRecipe = ( user, id, changes, done ) => {
  const recipeIndex = findIndex( user.recipes, ( recipe ) => recipe.id === ( id.toString ? id.toString() : id ) );

  if (recipeIndex === -1) return done( Error( 'Recipe does not exist.' ) );

  each( changes, ( value, key ) => user.recipes[ recipeIndex ][ key ] = value );

  user.save( done );
};

export const DeleteRecipe = ( user, id, done ) => {
  const recipeIndex = findIndex( user.recipes, ( recipe ) => recipe.id === ( id.toString ? id.toString() : id ) );

  if ( recipeIndex === -1 ) return done( Error( 'Recipe does not exist.' ) );

  user.recipes[ recipeIndex ].remove();
  user.save( done );
}
