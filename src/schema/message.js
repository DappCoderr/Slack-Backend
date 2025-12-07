import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types.ObjectId

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Message body is required']
  },
  image: {
    type: String
  },
  channelId: {
    type: ObjectId,
    ref: 'Channel',
    required: [true, 'Channel id is required']
  },
  senderId: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Sender id is required']
  },
}, {timestamps:true});

const Message = mongoose.model('Message', messageSchema);

export default Message;
