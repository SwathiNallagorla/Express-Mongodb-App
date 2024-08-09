const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb+srv://test:test@cluster0.upmdo8b.mongodb.net/gl-mern-1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(bodyParser.json());
app.use('/', userRoutes);  // Use the userRoutes module

app.listen(port, () => {
  console.log(`Server running on porthttp://localhost:${port}`);
});






//mongodb+srv://test:test@cluster0.upmdo8b.mongodb.net/gl-mern-1?retryWrites=true&w=majority