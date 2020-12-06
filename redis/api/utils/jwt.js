const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
    const  secret  = 'test-secret';
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/v1/register',
            '/v1/authenticate'
        ]
    });
}
