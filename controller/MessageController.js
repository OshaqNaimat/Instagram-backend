import { Messages } from "../models/messageModal.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { sender_id, receiver_id } = req.params;

  // check if any message exists
  let findChat = await Messages.findOne({
    $or: [
      { $and: [{ sender_id: sender_id }, { receiver_id: receiver_id }] },
      { $and: [{ sender_id: receiver_id }, { receiver_id: sender_id }] },
    ],
  });

  if (!findChat) {
    let newChat = await Messages.create({
      chats: [{ message, sender_id, receiver_id }],
      sender_id,
      receiver_id,
    });
    res.send(newChat);
  } else {
    findChat.chats.push({ message, sender_id, receiver_id });
    await findChat.save();
    res.send(findChat);
  }
};

// get message

export const getMyMessages = async (req, res) => {
  const { sender_id, receiver_id } = req.params;

  let myChat = await Messages.findOne({
    $or: [
      { $and: [{ sende_id: sender_id }, { receiver_id: receiver_id }] },
      { $and: [{ sender_id: receiver_id }, { receiver_id: sender_id }] },
    ],
  });

  if (!myChat) {
    res.send([]);
  } else {
    res.send(myChat);
  }
};

// Get all conversations for a user
export const getAllConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all messages where user is either sender or receiver
    const conversations = await Messages.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }],
    })
      .populate("sender_id", "username name avatar") // Adjust fields based on your user model
      .populate("receiver_id", "username name avatar")
      .sort({ updatedAt: -1 }); // Sort by most recent

    // Format the conversations for the frontend
    const formattedConversations = conversations.map((conv) => {
      const lastChat = conv.chats[conv.chats.length - 1];
      const otherUser =
        conv.sender_id._id.toString() === userId
          ? conv.receiver_id
          : conv.sender_id;

      // Check if last message is from the other user (unread)
      const isUnread = lastChat.sender_id.toString() !== userId;

      return {
        id: conv._id,
        username: otherUser.username,
        name: otherUser.name,
        avatar:
          otherUser.avatar ||
          `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
        lastMessage: lastChat.message,
        time: formatTime(conv.updatedAt),
        unread: isUnread,
        userId: otherUser._id,
      };
    });

    res.json(formattedConversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to format time
const formatTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};
