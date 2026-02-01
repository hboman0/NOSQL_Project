const MenuItem = require("../models/menuitem.model");

exports.createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMenuItems = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

exports.getMenuItemById = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Menu item not found" });
  res.json(item);
};

exports.updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Menu item not found" });
  res.json(updated);
};

exports.deleteMenuItem = async (req, res) => {
  const deleted = await MenuItem.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Menu item not found" });
  res.json({ message: "Menu item deleted" });
};

exports.incrementViews = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );

  res.json(updated);
};

