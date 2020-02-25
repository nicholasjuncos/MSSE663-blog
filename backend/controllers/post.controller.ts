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
            author: req.user._id,
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
        if (req.file) {
            data['coverImg'] = {
                imageURL: req.file.path,
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            };
            data['img1'] = {
                imageURL: req.file.path,
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            };
            data['img2'] = {
                imageURL: req.file.path,
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            };
            data['img3'] = {
                imageURL: req.file.path,
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            };
        }
    } catch (error) {
        console.log(error);
        if (error['code'] === 11000) {
            res.status(400).send('OTHER_ERROR');
            // res.status(400).send('AUTH_USERNAME')
        } else {
            res.status(400).send('OTHER_ERROR');
        }
    }
};

export const readPost = async (req: any, res: any) => {
    res.send(req.user);
};

export const deletePost = async (req: any, res: any) => {
    // Logout from ONE device. Just current device.
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send({success: true});
    } catch (error) {
        res.status(500).send(error);
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

export const updatePost = async (req: any, res: any) => {
    const newData = {};
    if (req.body.password) {
        newData['password'] = req.body.password;
        if (newData['password'].length < 6) {
            return res.status(400).send('AUTH_PASS_LENGTH')
        } else {
            newData['password'] = await bcrypt.hash(newData['password'], 8);
        }
    }
    if (req.body.firstName) {
        newData['firstName'] = req.body.firstName;
    }
    if (req.body.lastName) {
        newData['lastName'] = req.body.lastName;
    }
    if (req.body.isAuthor) {
        newData['isAuthor'] = req.body.isAuthor;
    }
    if (req.file) {
        newData['img'] = {
            imageURL: req.file.path,
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        }
    }
    Post.findByIdAndUpdate(req.body._id, {
            $set: newData
        }, (error: any, data: any) => {
            if (error) {
                res.status(500).send('UPDATE_FAIL');
            } else {
                data.img = data.img.toString('base64');
                res.send(data);
            }
        }
    );
};
