import {User} from '../models/user.model';
import {Post} from '../models/post.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import {databaseSecret} from '../environment';

const generateAuthToken = async (user) => {
    const token = jwt.sign({_id: user._id}, databaseSecret);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

const findByCredentials = async (username: string, password: string) => {
    // Search for a user by username and password.
    const user = await User.findOne({username});
    if (!user) {
        throw new Error('AUTH_FAIL');
    }
    // @ts-ignore
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('AUTH_FAIL');
    }
    return user;
};

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
            quote: req.body.quote,
            quoter: req.body.quoter,
            tags: req.body.tags,
            likeCount: 0
        };
        if (req.files) {
            data['coverImg'] = {
                imageURL: req.files.coverImg[0].path,
                data: fs.readFileSync(req.files.coverImg[0].path),
                contentType: req.files.coverImg[0].mimetype
            };
            data['img1'] = {
                imageURL: req.files.img1[0].path,
                data: fs.readFileSync(req.files.img1[0].path),
                contentType: req.files.img1[0].mimetype
            };
            data['img2'] = {
                imageURL: req.files.img2[0].path,
                data: fs.readFileSync(req.files.img2[0].path),
                contentType: req.files.img2[0].mimetype
            };
            data['img3'] = {
                imageURL: req.files.img3[0].path,
                data: fs.readFileSync(req.files.img3[0].path),
                contentType: req.files.img3[0].mimetype
            };
        }
        const post = await new Post(data);
        await post.save();
        res.status(201).send({post})
    } catch (error) {
        console.log(error);
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
    if (req.body.quote) {
        newData['quote'] = req.body.quote;
    }
    if (req.body.quote) {
        newData['quoter'] = req.body.quoter;
    }
    if (req.body.tags) {
        newData['tags'] = req.body.tags;
    }
    if (req.files) {
        newData['coverImg'] = {
            imageURL: req.files.coverImg[0].path,
            data: fs.readFileSync(req.files.coverImg[0].path),
            contentType: req.files.coverImg[0].mimetype
        };
        newData['img1'] = {
            imageURL: req.files.img1[0].path,
            data: fs.readFileSync(req.files.img1[0].path),
            contentType: req.files.img1[0].mimetype
        };
        newData['img2'] = {
            imageURL: req.files.img2[0].path,
            data: fs.readFileSync(req.files.img2[0].path),
            contentType: req.files.img2[0].mimetype
        };
        newData['img3'] = {
            imageURL: req.files.img3[0].path,
            data: fs.readFileSync(req.files.img3[0].path),
            contentType: req.files.img3[0].mimetype
        };
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
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send({success: true});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listMyPosts = async (req: any, res: any) => {
    // Login a registered user
    try {
        const {username, password} = req.body;
        const user = await findByCredentials(username, password);
        if (!user) {
            return res.status(400).send('AUTH_FAIL');
        }
        const token = await generateAuthToken(user);
        res.send({user, token});
    } catch (error) {
        res.status(400).send('AUTH_FAIL');
    }
};

export const listUserPosts = async (req: any, res: any) => {
    // Login a registered user
    try {
        const {username, password} = req.body;
        const user = await findByCredentials(username, password);
        if (!user) {
            return res.status(400).send('AUTH_FAIL');
        }
        const token = await generateAuthToken(user);
        res.send({user, token});
    } catch (error) {
        res.status(400).send('AUTH_FAIL');
    }
};
