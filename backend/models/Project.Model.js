import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  coverImage: { 
    type: String 
  }
}, { 
  timestamps: true 
});

projectSchema.virtual('id').get(function() {
  return this._id.toString();
});

projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

export default mongoose.model('Project', projectSchema);