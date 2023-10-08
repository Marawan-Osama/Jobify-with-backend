import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};
