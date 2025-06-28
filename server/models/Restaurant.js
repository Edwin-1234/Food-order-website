const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
      available: Boolean,
    },
  ],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
