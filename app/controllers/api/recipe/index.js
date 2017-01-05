/**
 * External dependencies
 */
import passport from 'passport';

/**
 * Internal dependencies
 */
import { CreateRecipe } from '../../../models/recipe';

/**
 * Returns a list with recipes when hit.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandleGetRequest = ( req, res ) => res.json(req.user.recipes);

/**
 * Adds a new recipe to the current user.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandlePostRequest = ( req, res ) => {
  CreateRecipe( req.user, req.body, ( err, user ) => {
    if ( err ) {
      return res
      .status( 406 )
      .json( { message: err } )
      .send();
    }

    res.redirect( '/api/recipe/' + user.recipes[ user.recipes.length - 1 ].id );
  } );
};

export default ( app ) => {
  const auth = passport.authenticate( 'local-token' );

  app.get( '/api/recipe', auth, HandleGetRequest );
  app.post( '/api/recipe', auth, HandlePostRequest );
  //app.put('/api/recipe/:id', auth, HandlePutRequest);
  //app.delete('/api/recipe/:id', auth, HandleDeleteRequest);

  //app.get('/api/recipe/:id', auth, HandleSingleGetRequest);
};
