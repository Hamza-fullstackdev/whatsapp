import Conservation from "../models/conservation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChat } = req.params;
    const { id: senderId } = req.user;
    const conversations = await Conservation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("messages");

    if (!conversations) return res.status(200).json([]);
    const messages = conversations.messages;
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
