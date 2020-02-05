import { User } from '../models/user.model';

export const registerUser = async(req: any, res: any) => {
    try {
        // Req.body should have username and password. isAuthor also doubles as staff for this application
        const user = new User(req.body);
        await user.save();
        // @ts-ignore
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getLoggedInUser = async (req: any, res: any) => {
    res.send(req.user);
};

export const loginUser = async (req: any, res: any) => {
    // Login a registered user
    try {
        const {username, password} = req.body;
        // @ts-ignore
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
};

export const logoutUser = async (req: any, res: any) => {
    // Logout from ONE device. Just current device.
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send({user: req.user});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const logoutAllUser = async (req: any, res: any) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send({user: req.user});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUser = async (req: any, res: any) => {
    if (req.body.password) {
        req.user.password = req.body.password;
    }
    if (req.body.isAuthor) {
        req.user.isAuthor = req.body.isAuthor;
    }
    try {
        await req.user.save();
        res.send({user: req.user});
    } catch (error) {
        res.status(500).send(error);
    }
};
