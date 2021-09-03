import { verifyToken, getCookieToken } from '../../../lib/utils';

export default async (req, res) => {
  const token = getCookieToken(req);
  let profile = verifyToken(token);
  const mapBoxToken = process.env.MAPBOX_KEY;
  const positionStackApiKey = process.env.CORDS_KEY;
  if (profile) {
    const address = req.body.address || 'Brampton, Canada'; //default address
    const apiUri = `http://api.positionstack.com/v1/forward?access_key=${positionStackApiKey}&query=${address}`;
    try {
      const response = await fetch(apiUri, {
        method: 'GET',
      });
      const result = await response.json();
      res.status(200).json({
        result: {
          lat: result.data[0].latitude,
          log: result.data[0].longitude,
          mapBoxToken,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!', error });
    }
  } else {
    return res.status(401).json({
      message: 'Not Authorized',
    });
  }
};
