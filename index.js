const connectDB = require('./db.js');
const express = require('express')

connectDB();

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Middleware to parse JSON data
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth')); // here we are using the routes , /api/auth is the prefix for the routes
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})