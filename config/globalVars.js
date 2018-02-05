//setup a global object
/**for local db
module.exports = {
										db:'mongodb://localhost:/comp2068',
										secret:'This is awsome',
										ids:{
											facebook:{
																	clientID:'1282717475121948',
																	clientSecret:'75683a11202c41e978107cfd33eb4dee',
																	callbackURL: 'http://localhost:3000/facebook/callback'
											}
										}
									};
*/
	/** for mlab server*/
	module.exports = {
	db: 'mongodb://deepak:2481053@ds032319.mlab.com:32319/comp2068',
	options: { promiseLibrary: require('bluebird') },
	secret:'This is awsome',
	ids:{
		facebook: {
			clientID:'1282717475121948',
			clientSecret:'75683a11202c41e978107cfd33eb4dee',
			callbackURL: 'https://abcaccounting.herokuapp.com/facebook/callback'
		}
	}
};
