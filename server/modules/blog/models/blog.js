import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
  message: String,
}, {
  timestamps: true,
});

export default mongoose.model('blog', BlogSchema);
