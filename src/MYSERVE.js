const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const menuSchema = new mongoose.Schema({
  day: {},
});
const Menu = mongoose.model('Menu', menuSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
  
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/logout', (req, res) => {
  res.send('Logout');
});

app.use(express.static('public'));

app.get('/api/menu', async (req, res) => {
  try {
    const menuData = await Menu.find();
    
    res.json({ menu: menuData });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).json({ error: 'Error fetching menu data', message: error.message });
  }
});
app.post('/api/menu-update', async (req, res) => {
  console.log("Received update request:", req.body);

  try {
    const MY = req.body._id;
    console.log("Document ID:", MY);

    const filter = { _id: MY }; 
    const update = req.body; 
    console.log("Update data:", update);

    const doc = await Menu.findOneAndUpdate(filter, update, { new: true });
    if (doc) {
      console.log('Updated document:', doc);
      res.status(200).json({ message: 'Document updated successfully', updatedDoc: doc });
    } else {
      console.error('Document not found');
      res.status(404).json({ error: 'Document not found', message: 'The document with the specified ID was not found.' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
