const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// connect to db
db.connect();

//Load static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json()); //XMLHTTPRequest, fetch, axios

//Apply middleware
app.use(SortMiddleware);

//HTTP Logger
app.use(morgan('combined'));

//Override method
app.use(methodOverride('_method'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return ` <a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
                </a>`;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
