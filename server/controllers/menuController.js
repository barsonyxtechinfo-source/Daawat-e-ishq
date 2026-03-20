// controllers/menuController.js
const MenuItem = require('../models/MenuItem');

/* =========================
   GET ALL MENU ITEMS (PUBLIC)
========================= */
exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json(menu);
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch menu'
    });
  }
};

/* =========================
   ADD MENU ITEM (ADMIN)
========================= */
exports.addMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Menu create error:', error);
    res.status(500).json({
      message: 'Failed to create menu item'
    });
  }
};

/* =========================
   UPDATE MENU ITEM (ADMIN)
========================= */
exports.updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Menu update error:', error);
    res.status(500).json({
      message: 'Failed to update menu item'
    });
  }
};

/* =========================
   DELETE MENU ITEM (ADMIN)
========================= */
exports.deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error('Menu delete error:', error);
    res.status(500).json({
      message: 'Failed to delete menu item'
    });
  }
};
