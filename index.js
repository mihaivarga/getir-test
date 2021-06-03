const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const createServer = require('./src/server')
const app = createServer();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./src/routes/routes.js')(app);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
