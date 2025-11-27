const Carousel = require('../models/Carousel');

exports.getAllCarousels = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active === 'true' ? { isActive: true } : {};
    const carousels = await Carousel.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(carousels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarouselById = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel tapılmadı' });
    }
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCarousel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Şəkil tələb olunur' });
    }

    const carouselData = {
      ...req.body,
      image: req.file.path,
      order: req.body.order ? parseInt(req.body.order) : 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive === 'true' : true
    };

    const carousel = new Carousel(carouselData);
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCarousel = async (req, res) => {
  try {
    const carouselData = { ...req.body };
    
    if (req.file) {
      carouselData.image = req.file.path;
    }

    if (carouselData.order !== undefined) {
      carouselData.order = parseInt(carouselData.order);
    }

    if (carouselData.isActive !== undefined) {
      carouselData.isActive = carouselData.isActive === 'true' || carouselData.isActive === true;
    }

    const carousel = await Carousel.findByIdAndUpdate(req.params.id, carouselData, { new: true, runValidators: true });
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel tapılmadı' });
    }
    res.json(carousel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findByIdAndDelete(req.params.id);
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel tapılmadı' });
    }
    res.json({ message: 'Carousel silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCarouselOrder = async (req, res) => {
  try {
    const { carousels } = req.body;
    
    if (!Array.isArray(carousels)) {
      return res.status(400).json({ message: 'Carousels array formatında olmalıdır' });
    }

    const updatePromises = carousels.map(({ id, order }) => 
      Carousel.findByIdAndUpdate(id, { order: parseInt(order) }, { new: true })
    );

    await Promise.all(updatePromises);
    const updatedCarousels = await Carousel.find().sort({ order: 1 });
    res.json(updatedCarousels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

