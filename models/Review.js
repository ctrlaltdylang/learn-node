const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Author is required to submit a review',
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'How you gonna leave a review on no store? Dont make no sense, chill.',
  },
  text: {
    type: String,
    required: 'Literally the whole point of reviews is this, what are you even doing',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  }
});

function autopopulate(next) {
  this.populate('author');
  next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Review', reviewSchema);
