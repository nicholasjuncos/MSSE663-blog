import * as express from 'express';
import { auth } from '../middleware/auth';
import { postAuth } from '../middleware/postAuth';
import { createPost, readPost, updatePost, deletePost, listPosts, listMyPosts, listUserPosts } from '../controllers/post.controller';

export const postRoutes = express.Router();

// Create Post
postRoutes.post('/create', auth, createPost);

// Read Post
postRoutes.get('/:id', readPost);

// Update Post
postRoutes.put('/:id/update', postAuth, updatePost);

// Delete Post
postRoutes.post('/:id/delete', postAuth, deletePost);

// List All Published Posts
// postRoutes.post('/list', listPosts);

// List My Posts
// postRoutes.post('/list/me', postAuth, listMyPosts);

// List User Published Posts
// postRoutes.post('/list/:id', listUserPosts);
