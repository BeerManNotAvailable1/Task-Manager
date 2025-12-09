import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['todo', 'progress', 'done'],
      default: 'todo'
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assigneeName: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date
    },
    attachments: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // Обработка projectId: если это объект (после populate), берем _id, иначе конвертируем ObjectId в строку
        if (ret.projectId) {
          if (ret.projectId._id) {
            ret.projectId = ret.projectId._id.toString();
          } else if (ret.projectId.toString) {
            ret.projectId = ret.projectId.toString();
          }
        }
        // Обработка assignee: если это объект (после populate), берем _id, иначе конвертируем ObjectId в строку
        if (ret.assignee) {
          if (ret.assignee._id) {
            ret.assignee = ret.assignee._id.toString();
          } else if (ret.assignee.toString) {
            ret.assignee = ret.assignee.toString();
          }
        }
        return ret;
      }
    }
  }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;

