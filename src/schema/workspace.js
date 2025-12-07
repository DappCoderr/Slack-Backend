import mongoose from 'mongoose';

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
        type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
