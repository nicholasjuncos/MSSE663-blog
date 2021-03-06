import * as jwt from 'jsonwebtoken';

import {databaseSecret} from '../environment';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

export const postAuth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization').replace('JWT ', '').replace('Bearer ', '');
        const data = jwt.verify(token, databaseSecret);
        try {
            // @ts-ignore
            const user = await User.findOne({_id: data._id, 'tokens.token': token});
            if (!user) {
                throw new Error();
            }
            req.user = user;
            req.token = token;
            try {
                const post = await Post.findOne({_id: req.params.id});
                if (!post) {
                    throw new Error();
                }
                try {
                    const post2 = await Post.findOne({_id: req.params.id, author: user.id});
                    if (!post2) {
                        throw new Error();
                    }
                    req.post = post2;
                    next();
                } catch (error) {
                    res.status(401).send('UNAUTHORIZED_ERROR');
                }
            } catch (error) {
                res.status(401).send('POST_DNE');
            }
        } catch (error) {
            res.status(401).send('UNAUTHORIZED_ERROR');
        }
    } catch (error) {
        res.status(401).send('UNAUTHORIZED_ERROR');
    }
};
