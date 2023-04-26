const express = require('express')
require('dotenv').config()
const albumsRouter = require('./routes/albums');
const homeRouter = require('./routes/home')
const createDBConnection = require('./dbConnection')

const app = express() // Set up express
app.use(express.json())
app.use(express.static('frontend'));
app.use(express.urlencoded({ extended: false })) //when extended property is set to false, the URL-encoded data will instead be parsed with the query-string library.


// Create DB connection
createDBConnection()

app.use('/api/albums', albumsRouter);
app.use('/', homeRouter);


// LISTENING ON PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening port to ${port}...`));
