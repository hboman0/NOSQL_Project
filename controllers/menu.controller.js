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
  const { search, category, page = 1, limit = 9 } = req.query;

  const filter = {};

  // Search by name or description (case-insensitive partial match)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  // Filter by category
  if (category && category !== "all") {
    filter.category = category;
  }

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 9, 1);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    MenuItem.find(filter).skip(skip).limit(limitNum),
    MenuItem.countDocuments(filter)
  ]);

  res.json({
    items,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum) || 1
  });
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

