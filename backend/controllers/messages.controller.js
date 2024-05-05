import Conservation from "../models/conservation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
  const { id: receiverId } = req.params;
  const { id: senderId } = req.user;
  const { message } = req.body;
  try {
    let conservations = await Conservation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conservations) {
      conservations = await Conservation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conservations.messages.push(newMessage._id);
    }
    await Promise.all([conservations.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};