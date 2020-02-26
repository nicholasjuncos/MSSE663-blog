import * as express from 'express';
import { auth } from '../middleware/auth';
import { postAuth } from '../middleware/postAuth';
import {
    createPost,
    readPost,
    updatePost,
    deletePost,
    listPosts,
    listMyPosts,
    listUserPosts,
    readPublishedPost
} from '../controllers/post.controller';

export const postRoutes = express.Router();

// Create Post
postRoutes.post('/create', auth, createPost);

// List All PUBLISHED Posts
postRoutes.get('/list', listPosts);

// List My Posts
postRoutes.get('/list/me', auth, listMyPosts);

// List User Published Posts
postRoutes.get('/list/:id', listUserPosts);

// Read Published Post
postRoutes.get('/:id', readPublishedPost);

// Read Any of your own Posts
postRoutes.get('/:id/me', postAuth, readPost);

// Update Post
postRoutes.put('/:id/update', postAuth, updatePost);

// Delete Post
postRoutes.post('/:id/delete', postAuth, deletePost);


