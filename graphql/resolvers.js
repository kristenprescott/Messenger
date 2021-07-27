const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");

const { User } = require("../models");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();

        return users;
      } catch (error) {
        console.log(error);
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
          throw new AuthenticationError("incorrect password", { errors });
        }

        return user;
      } catch (err) {
        console.log(err);
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

        // // Check if username / email exists
        // const userByUsername = await User.findOne({ where: { username } });
        // const userByEmail = await User.findOne({ where: { email } });

        // if (userByUsername) {
        //   errors.username = "This username is taken.";
        // }
        // if (userByEmail) {
        //   errors.email =
        //     "There is already an account using that email address.";
        // }

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
        console.log(err);
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
  },
};

/*
mutation register{
  register(username: "aello", email: "aello@email.com", password: "lamppost", confirmPassword: "lamppost"){
    username email
  }
}

query login{
  login(username:"aello" password:"lamppost"){
    username
    email
  }
}

*/
