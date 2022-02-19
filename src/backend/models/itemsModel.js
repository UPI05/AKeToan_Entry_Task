const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

exports.Items = mongoose.model('Items', itemsSchema);
