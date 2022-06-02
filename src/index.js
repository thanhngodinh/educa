const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

// Connect to DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// HTTP Logger
// app.use(morgan('combined'));

// Template Engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi:elevator',
                    asc: 'cil:sort-ascending',
                    desc: 'cil:sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="iconify" data-icon="${icon}"></span>
                </a>
                `;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
