require('dotenv').config();
const connectToMongo=require('./db');
const express = require('express')
connectToMongo();
const cors = require('cors')


const app = express()
app.use(cors())
const port = 5000;


app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook backend  listening at port http://localhost:${port}`)
})