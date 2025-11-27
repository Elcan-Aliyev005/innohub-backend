const Course = require('../models/Course');
const Event = require('../models/Event');
const Blog = require('../models/Blog');

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Axtarış sorğusu tələb olunur' });
    }

    const searchRegex = new RegExp(q, 'i');

    const [courses, events, blogs] = await Promise.all([
      Course.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      }),
      Event.find({
        $or: [
          { title: searchRegex },
          { topic: searchRegex },
          { speaker: searchRegex }
        ]
      }),
      Blog.find({
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      })
    ]);

    res.json({
      courses,
      events,
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

