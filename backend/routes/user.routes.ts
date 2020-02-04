import express = require('express');
import { User } from '../models/user.model';
import { auth } from '../middleware/auth';
import {updateUser} from '../controllers/user.controller';

export const userRoutes = express.Router();

userRoutes.post('/register', async (req: any, res: any) => {
  try {
    const user = new User(req.body);
    await user.save();
    // @ts-ignore
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

userRoutes.post('/login', async (req: any, res: any) => {
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

});

userRoutes.get('/me', auth, async (req: any, res: any) => {
  res.send(req.user);
});

userRoutes.post('/logout', auth, async (req: any, res: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({user: req.user});
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.post('/logoutAll', auth, async (req: any, res: any) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send({user: req.user});
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.put('/update', auth, updateUser);

// module.exports = userRoutes;
