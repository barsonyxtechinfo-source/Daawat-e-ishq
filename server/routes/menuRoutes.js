// server/routes/menuRoutes.js
const express = require('express');
const MenuItem = require('../models/MenuItem');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');

/* =======================
   USER MENU ROUTES
======================= */
const userMenuRouter = express.Router();

/**
 * GET /api/menu
 * Public – fetch all menu items
 */
userMenuRouter.get('/', async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.status(200).json(menu);
  } catch (error) {
    console.error('Menu fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

/* =======================
   ADMIN MENU ROUTES
======================= */
const adminMenuRouter = express.Router();

/**
 * Protect all admin menu routes
 */
adminMenuRouter.use(authMiddleware, requireAdmin);

/**
 * POST /admin/menu
 * Create new menu item
 */
adminMenuRouter.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Menu create error:', error.message);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

/**
 * PUT /admin/menu/:id
 * Update menu item
 */
adminMenuRouter.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Menu update error:', error.message);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

/**
 * DELETE /admin/menu/:id
 * Delete menu item
 */
adminMenuRouter.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Menu delete error:', error.message);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

module.exports = {
  userMenuRouter,
  adminMenuRouter
};
