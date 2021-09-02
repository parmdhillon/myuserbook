const cloudinary = require('cloudinary').v2;
import middleware from '../../../middlewares/middleware';
import nextConnect from 'next-connect';
import { verifyToken, getCookieToken } from '../../../lib/utils';
import clientPromise from '../../../lib/db';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const token = getCookieToken(req);
  let profile = verifyToken(token);
  if (profile) {
    try {
      cloudinary.uploader.upload(
        req.files.profilePic[0].path,
        async function (error, result) {
          if (error) {
            res.status(400).json({ error });
            return;
          }
          const client = await clientPromise;
          const user = await client.db().collection('users').findOne({
            userName: profile.userName,
          });
          if (user) {
            await client
              .db()
              .collection('users')
              .updateOne(
                { userName: profile.userName },
                { $set: { profilePic: result.url } }
              );
            return res.status(200).json({ message: 'OK!', result });
          } else {
            return res.status(400).json({
              message: 'User not found!',
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Something went wrong! Retry', error });
    }
  } else {
    return res.status(401).json({
      message: 'Not Authorized',
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
