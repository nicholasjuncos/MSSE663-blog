import {Post} from '../models/post.model';
import * as fs from 'fs';

export const createPost = async (req: any, res: any) => {
    try {
        // Req.body should have data for post
        const data = {
            author: req.user.id,
            published: req.body.published,
            postDate: req.body.postDate,
            title: req.body.title,
            title2: req.body.title2,
            subtitle1: req.body.subtitle1,
            description1: req.body.description1,
            subtitle2: req.body.subtitle2,
            description2: req.body.description2,
            subtitle3: req.body.subtitle3,
            description3: req.body.description3,
            quote1: req.body.quote1,
            quoter1: req.body.quoter1,
            quote2: req.body.quote2,
            quoter2: req.body.quoter2,
            category: req.body.category,
            likeCount: 0
        };
        if (req.files) {
            if (req.files.coverImg) {
                data['coverImg'] = {
                    imageURL: req.files.coverImg[0].path,
                    data: fs.readFileSync(req.files.coverImg[0].path),
                    contentType: req.files.coverImg[0].mimetype
                };
            }
            if (req.files.img1) {
                data['img1'] = {
                    imageURL: req.files.img1[0].path,
                    data: fs.readFileSync(req.files.img1[0].path),
                    contentType: req.files.img1[0].mimetype
                };
            }
            if (req.files.img2) {
                data['img2'] = {
                    imageURL: req.files.img2[0].path,
                    data: fs.readFileSync(req.files.img2[0].path),
                    contentType: req.files.img2[0].mimetype
                };
            }
            if (req.files.img3) {
                data['img3'] = {
                    imageURL: req.files.img3[0].path,
                    data: fs.readFileSync(req.files.img3[0].path),
                    contentType: req.files.img3[0].mimetype
                };
            }
        }
        const post = await new Post(data);
        await post.save();
        res.status(201).send({post})
    } catch (error) {
        if (error['code'] === 11000) {
            res.status(400).send('OTHER_ERROR');
        } else {
            res.status(400).send('OTHER_ERROR');
        }
    }
};

export const readPost = async (req: any, res: any) => {
    try {
        const post = await Post.findById(String(req.params.id), (err: any, result: any) => {
            if (err) {
                res.status(500).send('READ_POST_FAIL');
            }
        });
        if (!post) {
            throw new Error();
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        res.status(500).send('POST_DNE');
    }
};

export const readPublishedPost = async (req: any, res: any) => {
    const currentDate = Date();
    try {
        const post = await Post.findOne({_id: req.params.id, published: true, postDate: {$lte: currentDate}}, (err: any, result: any) => {
            if (err) {
                res.status(500).send('READ_POST_FAIL');
            }
        });
        if (!post) {
            throw new Error();
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        res.status(500).send('POST_DNE');
    }
};

export const updatePost = async (req: any, res: any) => {
    const newData = {};
    if (req.body.published) {
        newData['published'] = req.body.published;
    }
    if (req.body.postDate) {
        newData['postDate'] = req.body.postDate;
    }
    if (req.body.title) {
        newData['title'] = req.body.title;
    }
    if (req.body.title2) {
        newData['title2'] = req.body.title2;
    }
    if (req.body.subtitle1) {
        newData['subtitle1'] = req.body.subtitle1;
    }
    if (req.body.description1) {
        newData['description1'] = req.body.description1;
    }
    if (req.body.subtitle2) {
        newData['subtitle2'] = req.body.subtitle2;
    }
    if (req.body.description2) {
        newData['description2'] = req.body.description2;
    }
    if (req.body.subtitle3) {
        newData['subtitle3'] = req.body.subtitle3;
    }
    if (req.body.description3) {
        newData['description3'] = req.body.description3;
    }
    if (req.body.quote1) {
        newData['quote1'] = req.body.quote1;
    }
    if (req.body.quoter1) {
        newData['quoter1'] = req.body.quoter1;
    }
    if (req.body.quote2) {
        newData['quote2'] = req.body.quote2;
    }
    if (req.body.quoter2) {
        newData['quoter2'] = req.body.quoter2;
    }
    if (req.body.category) {
        newData['category'] = req.body.category;
    }
    if (req.files) {
        if (req.files.coverImg) {
            newData['coverImg'] = {
                imageURL: req.files.coverImg[0].path,
                data: fs.readFileSync(req.files.coverImg[0].path),
                contentType: req.files.coverImg[0].mimetype
            };
        }
        if (req.files.img1) {
            newData['img1'] = {
                imageURL: req.files.img1[0].path,
                data: fs.readFileSync(req.files.img1[0].path),
                contentType: req.files.img1[0].mimetype
            };
        }
        if (req.files.img2) {
            newData['img2'] = {
                imageURL: req.files.img2[0].path,
                data: fs.readFileSync(req.files.img2[0].path),
                contentType: req.files.img2[0].mimetype
            };
        }
        if (req.files.img3) {
            newData['img3'] = {
                imageURL: req.files.img3[0].path,
                data: fs.readFileSync(req.files.img3[0].path),
                contentType: req.files.img3[0].mimetype
            };
        }
    }
    Post.findByIdAndUpdate(req.params.id, {
            $set: newData
        }, (error: any, data: any) => {
            if (error) {
                res.status(500).send('UPDATE_FAIL');
            } else {
                data.coverImg = data.coverImg.toString('base64');
                data.img1 = data.img1.toString('base64');
                data.img2 = data.img2.toString('base64');
                data.img3 = data.img3.toString('base64');
                res.send(data);
            }
        }
    );
};

export const deletePost = async (req: any, res: any) => {
    // Delete post
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.send({success: true});
    } catch (error) {
        res.status(500).send('DELETE_ERROR');
    }
};

export const listPosts = async (req: any, res: any) => {
    const currentDate = Date();
    try {
        const posts = await Post.find({published: 'true', postDate: {$lte: currentDate}});
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listMyPosts = async (req: any, res: any) => {
    try {
        const posts = await Post.find({author: req.user.id});
        const post_length = posts.length;
        res.send({posts, post_length});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listUserPosts = async (req: any, res: any) => {
    const currentDate = Date();
    try {
        const posts = await Post.find({author: req.params.id, published: 'true', postDate: {$lte: currentDate}});
        const post_length = posts.length;
        res.send({posts, post_length});
    } catch (error) {
        res.status(500).send(error);
    }
};
