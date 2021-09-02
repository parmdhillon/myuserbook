const cloudinary = require('cloudinary').v2;
import middleware from '../../../middlewares/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  //console.log(req.body);
  console.log(req.files);

  try {
    cloudinary.uploader.upload(
      req.files.profilePic[0].path,
      function (error, result) {
        console.log(result, error);
        if (error) {
          res.status(400).json({ message: 'Something went wrong!', error });
          return;
        }
        res.status(200).json({ message: 'OK!', result });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something went wrong!', error });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
