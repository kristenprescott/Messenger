const { UserInputError, AuthenticationError } = require("apollo-server");

const { Message, User } = require("../../models");

module.exports = {
  Mutation: {
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
