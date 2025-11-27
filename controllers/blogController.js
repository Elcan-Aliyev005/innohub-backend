const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog yazısı tapılmadı' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.image = req.file.path;
    }
    const blog = new Blog(blogData);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.image = req.file.path;
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog yazısı tapılmadı' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog yazısı tapılmadı' });
    }
    res.json({ message: 'Blog yazısı silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

