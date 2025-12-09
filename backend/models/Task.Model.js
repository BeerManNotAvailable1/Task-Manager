import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  status: { 
    type: String, 
    enum: ['todo', 'progress', 'done'], 
    default: 'todo' 
  },
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
  },
  attachments: [{ 
    type: String 
  }]
}, { 
  timestamps: true 
});

taskSchema.virtual('id').get(function() {
  return this._id.toString();
});

taskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

export default mongoose.model('Task', taskSchema);