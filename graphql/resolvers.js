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
};
