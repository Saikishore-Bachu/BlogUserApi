const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../models/user')
const SECRET_KEY = 'NOT_SO_SECRET_KEY'

// create main Model
const User = db.user
const Blog = db.blog

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email : email,
      password : hashedPassword,
      name : name
    });
    const token = jwt.sign({ email: result.email, id: result.id},SECRET_KEY);
    res.status(200).json({ result, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}



exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    console.log(existingUser)
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}

exports.oneToOne = async (req, res) => {
  let data = await User.findAll({
    attributes: ['name', 'email'],
    include: [
      {
        model: Blog,
        attributes: ['title', 'content', 'imageUrl'],
      },
    ],
    where: { id: req.params.id },
  })
  res.send(data)
}

// exports.belongsto = async (req, res) => {
//   let data = await Blog.findAll({
//     attributes: ['title', 'content', 'imageUrl'],
//     include: [
//       {
//         model: user,
//         attributes: ['name', 'email'],
//       },
//     ],
//     where: { id: req.params.id },
//   })
//   res.send(data)
// }