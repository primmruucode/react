const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/Users.js');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://admin:admin@34.87.180.34:27017/test?authSource=admin', { useNewUrlParser: true, 
useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/images', imageRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));