import clientPromise from '../../lib/db';
import { comparePassword } from '../../lib/passwordHash';
import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_KEY;

export default async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const client = await clientPromise;

    const user = await client.db().collection('users').findOne({
      userName,
    });

    if (!user) {
      res.status(400).json({ message: 'User does not exists' });
      return;
    }

    if (user) {
      const userId = user._id,
        userName = user.userName,
        userPassword = user.password;

      const isValid = await comparePassword(password, userPassword);

      if (isValid) {
        const payload = {
          id: userId,
          userName,
        };

        jwt.sign(
          payload,
          JWT_KEY,
          {
            expiresIn: 2592000,
          },
          (err, token) => {
            res.status(200).json({
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        res.status(400).json({ message: 'Password incorrect' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something went Wrong!' });
  }
};
