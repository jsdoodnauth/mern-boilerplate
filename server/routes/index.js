/**
 * Application Routing
 */
const passport = require('passport');

module.exports = (app) => {
    app.use('/api', require('./api'));
    app.use('/api/users', require('./api/users'));

    // app.use('/admin', passport.authenticate('jwt', { session: false }), require('./admin/index'));
}