import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? 'admin' : 'user';
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
};

export const login = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  res.status(StatusCodes.OK).json({ msg: 'login successful', name });
};
