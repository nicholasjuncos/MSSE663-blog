import * as jwt from 'jsonwebtoken';

import {databaseSecret} from '../environment';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

export const postAuth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization').replace('JWT ', '');
        const data = jwt.verify(token, databaseSecret);
        try {
            // @ts-ignore
            const user = await User.findOne({_id: data._id, 'tokens.token': token});
            if (!user) {
                throw new Error();
            }
            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            res.status(401).send({error: 'Not authorized to access these resources.'});
        }
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access these resources'});
    }
};
