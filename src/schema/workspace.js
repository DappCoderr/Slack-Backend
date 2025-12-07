import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types.ObjectId

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    unique: true
  },
  description: {
    type: String
  },
  members: [
    {
      userId: {
        type: ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['Owner', 'Admin', 'Member', 'Guest'],
        default: 'Member'
      }
    }
  ],
  joinCode: {
    type: String,
    required: [true, 'Join code is required']
  },
  channels: [
    {
      type: ObjectId,
      ref: 'Channel'
    }
  ]
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
