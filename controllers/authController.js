import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? 'admin' : 'user';

  const hashedPass = await hashPassword(req.body.password);
  req.body.password = hashedPass;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Email does not exist');
  }
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};
