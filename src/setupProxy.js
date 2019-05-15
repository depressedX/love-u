const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/may_4th',proxy('/may_4th', {
        target: 'http://120.78.6.190'
    }));

};