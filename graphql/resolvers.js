const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const { User } = require("../models");

// A map of functions which return data for the schema.
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
  },
  Mutation: {
    // register: async (parent, args, context, info) => {
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

        // Return user to client
        return user;
      } catch (err) {
        console.log(err);
        //
        if (err.name === "SequelizeUniqueConstraintError") {
          /*
          SQL errors arr:
            errors: [
              ValidationErrorItem {
                message: 'users.username must be unique',
                type: 'unique violation',
                path: 'users.username',
                value: 'okaycorral',
                origin: 'DB',
                instance: [User],
                validatorKey: 'not_unique',
                validatorName: null,
                validatorArgs: []
              }
            ],
          */
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.value} is already taken.`)
          );
        }
        throw new UserInputError("Bad input: ", { errors });
      }
    },
  },
};
