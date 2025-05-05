import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import users, { User } from '../models/user.model';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUserInput(data: any): { valid: boolean; message?: string } {
  const { firstname, lastname, email, postalCode, address, country, username, password } = data;
  if (!firstname || !lastname || !email || !postalCode || !address || !country || !username || !password) {
    return { valid: false, message: 'All required fields must be provided.' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Invalid email format.' };
  }
  return { valid: true };
}

export const createUserInMemory = async (userData: any): Promise<{ success: boolean; user?: User; message?: string }> => {
  const validation = validateUserInput(userData);
  if (!validation.valid) return { success: false, message: validation.message };

  const exists = users.find(u => u.email === userData.email || u.username === userData.username);
  if (exists) return { success: false, message: 'User already exists with same email or username.' };

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: User = {
    ...userData,
    password: hashedPassword,
  };

  users.push(newUser);
  return { success: true, user: newUser };
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email === email);
};

export const getAllUsers = (req: Request, res: Response) => {
  const safeUsers = users.map(({ password, ...rest }) => rest); // exclude password
  res.json(safeUsers);
};

export const getUser = (req: Request, res: Response) => {
  const { email } = req.params;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const { password, ...safeUser } = user;
  res.json(safeUser);
};


export const createUser = async (req: Request, res: Response) => {
  const result = await createUserInMemory(req.body);

  if (!result.success) return res.status(400).json({ message: result.message });

  const { password, ...safeUser } = result.user!;
  res.status(201).json(safeUser);
};

// export const createUser = async (req: Request, res: Response) => {
//   const validation = validateUserInput(req.body);
//   if (!validation.valid) return res.status(400).json({ message: validation.message });

//   const exists = users.find(u => u.email === req.body.email || u.username === req.body.username);
//   if (exists) return res.status(409).json({ message: 'User already exists with same email or username.' });

//   const newUser: User = {
//     ...req.body,
//     password: await req.body.password,
//   };

//   users.push(newUser);
//   const { password, ...safeUser } = newUser;
//   res.status(201).json(safeUser);
// };

export const updateUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found.' });

  const updatedData = { ...users[userIndex], ...req.body };

  const validation = validateUserInput(updatedData);
  if (!validation.valid) return res.status(400).json({ message: validation.message });

  if (req.body.password) {
    updatedData.password = await req.body.password;
  }

  users[userIndex] = updatedData;
  const { password, ...safeUser } = updatedData;
  res.json(safeUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const { email } = req.params;
  const index = users.findIndex(u => u.email === email);
  if (index === -1) return res.status(404).json({ message: 'User not found.' });

  users.splice(index, 1);
  res.status(204).send();
};
