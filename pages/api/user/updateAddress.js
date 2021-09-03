import { verifyToken, getCookieToken } from '../../../lib/utils';
import clientPromise from '../../../lib/db';

export default async (req, res) => {
  const token = getCookieToken(req);
  let profile = verifyToken(token);
  const data = req.body;
  const { street, city, state, country, postal } = data;
  const address = `${street}, ${city}, ${state}, ${country}, ${postal}`;
  if (profile) {
    try {
      const client = await clientPromise;
      const user = await client.db().collection('users').findOne({
        userName: profile.userName,
      });
      if (!address) {
        throw new Error('Address invalid!');
      }
      if (user) {
        await client
          .db()
          .collection('users')
          .updateOne({ userName: profile.userName }, { $set: { address } });
        return res.status(200).json({ message: 'OK!', result: { address } });
      } else {
        return res.status(400).json({
          message: 'User not found!',
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: 'Something went wrong!',
        error,
      });
    }
  } else {
    return res.status(401).json({
      message: 'Not Authorized',
    });
  }
};
