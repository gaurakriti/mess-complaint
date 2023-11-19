const express = require('express');
const router = express.Router();
const Menu = require('../models/MenuModel');

// Update menu route
router.post('/update-menu', async (req, res) => {
  try {
    const { day, meal, item } = req.body;

    // Check if the menu item already exists
    const existingMenuItem = await Menu.findOne({ day, meal });

    if (existingMenuItem) {
      // Update the existing menu item
      existingMenuItem.item = item;
      await existingMenuItem.save();
    } else {
      // Create a new menu item if it doesn't exist
      await Menu.create({ day, meal, item });
    }

    res.status(200).send('Menu updated successfully');
  } catch (error) {
    console.error('Error updating menu:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
