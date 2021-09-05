const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRoute = require('./courses');
const siteRoute = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRoute);
    app.use('/me', meRouter);
    app.use('/', siteRoute);
}

module.exports = route;
