import clientPromise from '../../../lib/db';
import { verifyToken, getCookieToken } from '../../../lib/utils';

export default async (req, res) => {
  const token = getCookieToken(req);
  let profile = verifyToken(token);
  if (profile) {
    const client = await clientPromise;
    const user = await client.db().collection('users').findOne({
      userName: profile.userName,
    });
    if (user) {
      const { firstName, lastName, address, profilePic } = user;
      const data = { firstName, lastName, address, profilePic };
      res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: 'User not found!',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Not Authorized',
    });
  }
};
