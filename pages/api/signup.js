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

  try {
    const value = await schema.validateAsync({
      fullName,
      password,
      confirm_password,
      email,
    });
    res.status(201).json({ message: 'Created user!', data: value });
  } catch (err) {
    res.status(422).json({
      message: err.details[0].message,
    });
    return;
  }
}
export default handler;
