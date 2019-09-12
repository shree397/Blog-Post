const express = require('express');
const app = express();
const connectDB = require('./config/db');

//Connect MongoDB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('api running'));
const PORT = 4100;

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/blogs', require('./routes/api/blogposts'));

app.listen(PORT, console.log(`Server is running port number ${PORT} `));
