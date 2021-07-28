const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { Message, User } = require("../models");
const { JWT_SECRET } = require("../config/env.json");

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        // Authorization:
        if (!user) throw new AuthenticationError("Unauthenticated");

        const users = await User.findAll({
          // Get all users EXCEPT currently authenticated user:
          where: { username: { [Op.ne]: user.username } },
        });

        return users;
      } catch (err) {
        throw err;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      const errors = {};

      try {
        // Check for empty username/password fields:
        if (username.trim() === "") {
          errors.username = "Username cannot be left blank.";
        }
        if (password === "") {
          errors.password = "Password cannot be left blank.";
        }

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("blank user input", { errors });
        }

        const user = await User.findOne({
          where: { username },
        });

        // Check if user exists:
        if (!user) {
          errors.username = "User not found.";
          throw new UserInputError("invalid user", { errors });
        }

        // Compare password correctness:
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "Password is incorrect.";
          throw new UserInputError("incorrect password", { errors });
        }

        // Issue jwt/send it back:
        const token = jwt.sign({ username }, JWT_SECRET, {
          expiresIn: "1h",
        });

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};

      // Validate input data
      try {
        // If a field is empty:
        if (username.trim() === "") {
          errors.username = "Username must not be empty.";
        }
        if (email.trim() === "") {
          errors.email = "Email must not be empty.";
        }
        if (password.trim() === "") {
          errors.password = "Password must not be empty.";
        }
        if (confirmPassword.trim() === "") {
          errors.confirmPassword = "Password confirmation must not be empty.";
        }

        // If passwords don't match:
        if (password !== confirmPassword) {
          errors.confirmPassword = "Passwords must match.";
        }

        // If the errors object is not empty, throw errors
        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // Hash password
        password = await bcrypt.hash(password, 6);

        // Create user(If data is valid)
        const user = await User.create({
          username,
          email,
          password,
        });

        return user;
      } catch (err) {
        // Check for username/email uniqueness:
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.value} is already taken.`)
          );
          // Check for valid email:
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Bad input: ", { errors });
      }
    },
    sendMessage: async (parent, { to, content }, { user }) => {
      try {
        // Make sure user is authenticated:
        if (!user) throw new AuthenticationError("Unauthenticated");

        const recipient = await User.findOne({ where: { username: to } });

        if (!recipient) {
          throw new UseerInputError("User not found.");
        } else if (recipient.username === user.username) {
          throw new UserInputError("You can't message yourself.");
        }

        // Validate content:
        if (content.trim() === "") {
          throw new UseerInputError("Empty message.");
        }

        // Send message to recipient:

        const message = await Message.create({
          from: user.username,
          to,
          content,
        });

        return message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

/*
mutation register{
  register(username: "aello", email: "aello@email.com", password: "lamppost", confirmPassword: "lamppost"){
    username 
    email
  }
}
RES:
{
  "data": {
    "register": {
      "username": "aello",
      "email": "aello@email.com"
    }
  }
}
____________________________________________________
query login{
  login(username:"aello" password:"lamppost"){
    username
    email
    createdAt
    token
  }
}
RES:
{
  "data": {
    "login": {
      "username": "aello",
      "email": "aello@email.com",
      "createdAt": "2021-07-27T16:28:50.000Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFlbGxvIiwiaWF0IjoxNjI3NDA1NzU2LCJleHAiOjE2Mjc0MDkzNTZ9.f7E0yR3TxUkKTjeRz4bwn34N6sHVT2cpLGHtBu1wMoo"
    }
  }
}
____________________________________________________
query getUsers{
  getUsers {
    username 
    email 
    createdAt
  }
}
HEADERS:
'Authorization': 'Bearer <token>';
RES:
{
  "data": {
    "getUsers": [
      {
        "username": "fyrefaux420",
        "email": "fyrefaux420@email.com",
        "createdAt": "1627024983000"
      },
      {
        "username": "daffy_duck",
        "email": "daffy_duck@email.com",
        "createdAt": "1627025321000"
      },
      {
        "username": "laffingtaffy",
        "email": "laffingtaffy@email.com",
        "createdAt": "1627026014000"
      },
      {
        "username": "nuSka",
        "email": "nuska@email.com",
        "createdAt": "1627026178000"
      },
      {
        "username": "okaycorral",
        "email": "okaycorral@email.com",
        "createdAt": "1627401011000"
      },
      {
        "username": "JMack",
        "email": "jmack@email.com",
        "createdAt": "1627402357000"
      },
      {
        "username": "gobabygogo",
        "email": "gobabygogo@email.com",
        "createdAt": "1627405102000"
      }
    ]
  }
}
____________________________________________________
mutation sendMessage{
  sendMessage(to: "JMack" content:"eyooooo what up Jay!" ){
    uuid
    from
    to
    content
    createdAt
  }
}
RES:
{
  "data": {
    "sendMessage": {
      "uuid": "0dc8aaaa-f29f-4c77-99fb-088e1be1c0af",
      "from": "aello",
      "to": "JMack",
      "content": "eyooooo what up Jay!",
      "createdAt": "1627437424066"
    }
  }
}
____________________________________________________

*/
