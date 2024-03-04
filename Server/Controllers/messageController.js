const messageModel = require("../Model/messageModel");

//addmessage
const addmessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added to database successfully" });
    }

    return res.json({ msg: "Failed to send message" });
  } catch (e) {
    console.error("Error in addmessage:", e);
    next(e);
  }
};

//getmessage
const getmessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    let messages = await messageModel.find({
      users: { $all: [from, to] },
    });

    let projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectMessages);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getmessage,
  addmessage,
};
