const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/record')
const cors = require('cors');
const path = require('path');


dotenv.config();

mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

app.use('/api/records', userRoute);


app.listen(8800, () => {
    console.log('Server is connected to http://localhost:8800')
})

