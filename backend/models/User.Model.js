import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'member'], 
    default: 'member' 
  },
  avatarUrl: { 
    type: String 
  }
}, { 
  timestamps: true 
});

// Виртуальное поле id вместо _id
userSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Преобразование для JSON
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.passwordHash;
  }
});

export default mongoose.model('User', userSchema);