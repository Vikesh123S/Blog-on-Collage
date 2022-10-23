const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validatePost } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(post.index))
    .post(isLoggedIn, upload.array('image'), validatePost, catchAsync(post.createNewPost))

router.route('/searchPost',async(req,res)=>{
    console.log("here");
    const title=req.body.post;
    const post = await Post.findById(title);
    console.log(post);
})
router.get('/new', isLoggedIn, post.renderNewForm)

//delete  single post
router.route('/:id')
    .get(catchAsync(post.showPost))
    .put(isLoggedIn, isAuthor, upload.array('image'), validatePost, catchAsync(post.updatePost))
    .delete(isLoggedIn, isAuthor, catchAsync(post.deletePst));

//edit post    
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(post.renderEditForm))



module.exports = router;