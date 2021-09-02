const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
import middleware from '../../../middlewares/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  //console.log(req.body);
  console.log(req.files);

  cloudinary.uploader.upload(
    req.files.profilePic[0].path,
    function (error, result) {
      console.log(result, error);
    }
  );
  res.status(200).json({ message: 'OK!' });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
