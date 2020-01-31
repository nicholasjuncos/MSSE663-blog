import express = require('express');
import { User } from '../models/user.models';
import { auth } from '../middleware/auth';

export const user3Routes = express.Router();

user3Routes.post('/register', async (req: any, res: any) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

user3Routes.post('/login', async (req: any, res: any) => {
  // Login a registered user
  try {
    const {username, password} = req.body;
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

user3Routes.get('/me', auth, async (req: any, res: any) => {
  res.send(req.user);
});

user3Routes.post('/logout', auth, async (req: any, res: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({user: req.user});
  } catch (error) {
    res.status(500).send(error);
  }
});

user3Routes.post('/logoutAll', auth, async (req: any, res: any) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send({user: req.user});
  } catch (error) {
    res.status(500).send(error);
  }
});

// module.exports = user3Routes;
