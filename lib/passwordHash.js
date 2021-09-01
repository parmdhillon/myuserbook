import { hash, compare } from 'bcryptjs';

export async function comparePassword(password, encryptedPassword) {
  return await compare(password, encryptedPassword);
}

export async function encryptPassword(password) {
  return await hash(password, 10);
}
