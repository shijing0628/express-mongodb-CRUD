require('./models/db');
const express = require('express');
const path = require('path');
// this part for handlebar working well
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// end of this part for handlebar working well

const employeeController = require('./controllers/employeeController');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');

app.engine('hbs', exphbs({ extname: "hbs", defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', handlebars: allowInsecurePrototypeAccess(Handlebars) }));


app.use('/employee', employeeController);

app.listen(3000, () => {
 console.log('Express server start at port:3000')
})