'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/password').post(users.changePassword);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	app.route('/auth/password/forgot').post(users.forgotPassword)
	app.route('/auth/password/reset/:token').get(users.newPassword)
	app.route('/auth/password/reset/').post(users.resetPassword)

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		// scope: ['email', 'user_status']
    scope: ['email']
  }));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the instagram oauth routes
	app.route('/auth/instagram').get(passport.authenticate('instagram'));
	app.route('/auth/instagram/callback').get(users.oauthCallback('instagram'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};