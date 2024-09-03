const Post = require('../models/postModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const HttpError = require('../models/errorModel');

// Create a post
// POST req : api/posts/create-post
// Protected
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;
        const {thumbnail} = req.files;
        if(!title || !category || !description || !thumbnail) return next(new HttpError('Fill in all fields and choose a thumbnail', 422));
        if(thumbnail.size > 2000000) return next(new HttpError('Thumbnail is too big. File should be less than 2mb', 422));

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];

        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if(err) return next(new HttpError(err));
            
            const newPost = await Post.create({title, category, description, thumbnail: newFilename, creator: req.user.id});
            if(!newPost) return next(new HttpError("Post couldn't be created", 422));

            const currUser = await User.findById(req.user.id);
            const newCnt = currUser.posts + 1;
            await User.findByIdAndUpdate(req.user.id, {posts: newCnt});

            res.status(201).json(newPost);
        })
    }
    catch (error) {
        return next(new HttpError(error, 500));    
    }
}

// Get all posts
// GET req : api/posts
// Unprotected
const getPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find().sort({createdAt: -1});
        res.status(200).json(allPosts);
    }
    catch (error) {
       return next(new HttpError(error, 500));
    }
}

// Get single post
// GET req : api/posts/:id
// Unprotected
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if(!post) return next(new HttpError('Post not found', 404));

        res.status(200).json(post);
    }
    catch (error) {
        return next(new HttpError(error, 500))
    }
}

// Get posts by category
// GET req : api/posts/categories/:category
// Unprotected
const getCategoryPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1});

        res.status(200).json(catPosts);
    }
    catch (error) {
       return next(new HttpError(error, 500)); 
    }
}

// Get posts by the author
// GET req : api/posts/users/:id
// Unprotected
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const AuthorPosts = await Post.find({creator : id}).sort({createdAt: -1});

        res.status(200).json(AuthorPosts);
    }
    catch (error) {
       return next(new HttpError(error, 500)); 
    }
}

// Edit post
// Patch req : api/posts/users/:id
// Protected
const editPost = async (req, res, next) => {
    try {
        let fileName, newFilename, updatedPost;
        const postId = req.params.id;
        const {title, category, description} = req.body;
        const thumbnail = req.files?.thumbnail;

        if(!title || !category || description.length < 12 /*ReactQuill has 11 characters by default(opening and closing tags with a break)*/)
            return next(new HttpError('Fill in all fields', 422));

        if(!thumbnail) updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true});
        else {
            const oldPost = await Post.findById(postId);
            if(req.user.id != oldPost.creator) return next(new HttpError("Post couldn't be edited", 403));
            
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if(err) return next(new HttpError(err, 500));
            });

            if(thumbnail.size > 2000000) return next(new HttpError('Thumbnail is too big. File shjould be less than 2MB', 422));

            fileName = thumbnail.name;
            let splittedFilename = fileName.split('.');
            newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                if(err) return next(new HttpError(err, 422));
            });

            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFilename}, {new: true});
        }
        if(!updatedPost) return next(new HttpError("Couldn't update the post", 400));

        res.status(200).json(updatedPost);
    }
    catch (error) {
        return next(new HttpError(error, 500));
    }
}

// Delete post
// DELETE req : api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId) return next(new HttpError('Post unavailable', 400));
    
        const post = await Post.findById(postId);
        const fileName = post.thumbnail;

        if(req.user.id != post.creator) return next(new HttpError("Post couldn't be deleted", 403));

        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) return next(new HttpError(err, 500));
            else {
                await Post.findByIdAndDelete(postId);

                const currUser = await User.findById(req.user.id);
                const postsCnt = currUser.posts - 1;

                await User.findByIdAndUpdate(req.user.id, {posts: postsCnt});
                res.status(200).json('Post deleted successfully.');
            }
        })
    }
    catch (error) {
        return next(new HttpError(error, 500));
    }
}

module.exports = {createPost, getPosts, getPost, getCategoryPosts, getUserPosts, editPost, deletePost};