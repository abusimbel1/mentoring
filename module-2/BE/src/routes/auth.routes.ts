const { Router } = require('express');
import { Request, Response, NextFunction } from 'express';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const _config = require('config');
const _jwt = require('jsonwebtoken');
const _router = Router();

//api/auth/login
_router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: any = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No user found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = _jwt.sign(
      { userId: user.id },
      _config.get('jwtSecret')
    )

    res.json({ token, userId: user.id });
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: 'Error. Try again' });
  }
});

module.exports = _router;
