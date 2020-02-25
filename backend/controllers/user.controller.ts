import {User} from '../models/user.model';
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

// THIS IS USED FOR POSTS
export const getUserById = (id: string, callback: any) => {
    User.findById(id, callback);
};

// THIS IS USED FOR POSTS
export const getUserByUsername = (username: string, callback: any) => {
    const query = {username};
    User.findOne(query, callback);
};

export const registerUser = async (req: any, res: any) => {
    try {
        // Req.body should have username and password. isAuthor also doubles as staff for this application
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            img: null,
            isAuthor: false
        };
        if (data.password.length < 6) {
            res.status(400).send('AUTH_PASS_LENGTH')
        } else {
            data.password = await bcrypt.hash(data.password, 8);
            const user = await new User(data);
            const token = await generateAuthToken(user);
            res.status(201).send({user, token});
        }
    } catch (error) {
        if (error['code'] === 11000) {
            res.status(400).send('AUTH_USERNAME')
        } else {
            res.status(400).send('OTHER_ERROR');
        }
    }
};

export const getLoggedInUser = async (req: any, res: any) => {
    res.send(req.user);
};

export const loginUser = async (req: any, res: any) => {
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

export const logoutUser = async (req: any, res: any) => {
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

export const logoutAllUser = async (req: any, res: any) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send({success: true});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUser = async (req: any, res: any) => {
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
    if (req.files) {
        newData['img'] = {
            imageURL: req.files.img[0].path,
            data: fs.readFileSync(req.files.img[0].path),
            contentType: req.files.img[0].mimetype
        }
    }
    User.findByIdAndUpdate(req.user._id, {
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
