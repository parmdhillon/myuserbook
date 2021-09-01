import clientPromise from '../../lib/db';
import { encryptPassword } from '../../lib/passwordHash';
const Joi = require('joi');

const schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[ A-Za-z]+$/)
    .min(3)
    .max(20)
    .required()
    .label('Your Name'),
  password: Joi.string().required().label('Password'),
  confirm_password: Joi.ref('password'),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .label('Email'),
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Bad Request' });
    return;
  }

  const data = req.body;
  const { fullName, email, password, confirm_password } = data;

  let value;
  try {
    value = await schema.validateAsync({
      fullName,
      password,
      confirm_password,
      email,
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
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }
    const hashedPassword = await encryptPassword(password);

    const result = await db.collection('users').insertOne({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    client.close();
    res.status(201).json({ message: 'Created user!', data: value });
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong!' });
  }
}
export default handler;
