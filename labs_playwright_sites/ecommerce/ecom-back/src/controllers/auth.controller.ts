import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../models/user.model';
import { createUserInMemory } from './user.controller';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const register = async (req: Request, res: Response) => {
    const result = await createUserInMemory(req.body);
  
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
  
    const newUser = result.user!;
    const token = jwt.sign({ email: newUser.email, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
  
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600000,
    });
  
    const { password, ...safeUser } = newUser;
    res.status(201).json({ message: 'User registered and logged in', user: safeUser });
  };

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: 'Login successful' });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
