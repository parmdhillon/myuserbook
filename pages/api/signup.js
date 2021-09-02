import clientPromise from '../../lib/db';
import { encryptPassword } from '../../lib/passwordHash';
const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string()
    .regex(/^[ A-Za-z]+$/)
    .min(3)
    .max(20)
    .required()
    .label('Your First Name'),
  lastName: Joi.string()
    .regex(/^[ A-Za-z]+$/)
    .min(3)
    .max(20)
    .required()
    .label('Your Last Name'),
  password: Joi.string().required().label('Password'),
  confirm_password: Joi.ref('password'),
  userName: Joi.string()
    .regex(/^[ A-Za-z]+$/)
    .min(3)
    .max(20)
    .required()
    .label('Username'),
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Bad Request' });
    return;
  }

  const data = req.body;
  const { firstName, lastName, userName, password, confirm_password } = data;

  let value;
  try {
    value = await schema.validateAsync({
      firstName,
      lastName,
      password,
      confirm_password,
      userName,
    });
  } catch (err) {
    res.status(422).json({
      message: err.details[0].message, //Error Message for JOI Validation
    });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ userName });
    if (existingUser) {
      console.log('Username existed');
      res.status(422).json({ message: 'Username already taken!' });
      return;
    }
    const hashedPassword = await encryptPassword(password);

    const result = await db.collection('users').insertOne({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'Created user!', data: value });
  } catch (error) {
    //console.log(error.message);
    res.status(422).json({ message: 'Something is wrong!' });
  }
}
export default handler;
