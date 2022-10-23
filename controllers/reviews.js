const Post = require('../models/post');
const Review = require('../models/review');
const { param } = require('../routes/post');

//write review
module.exports.createReview = async (req, res) => {
    //param.di is post id on which we are writing review.
    const post = await Post.findById(req.params.id);

    //creating object of review table and putting rview text in object
    const review = new Review(req.body.review);
    //putting autor id who is writing rview in review object
    review.author = req.user._id;

    //push review's in post object,since review is array in post so we can push
    post.reviews.push(review);

    //save review object in review table and post object in post table
    await review.save();
    await post.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${post._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}