import {User} from '../models/user.model';

export const updateUser = async (req: any, res: any, next: any) => {
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
