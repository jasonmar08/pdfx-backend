import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: String,
  filePath: String,
  converted: { type: Boolean, default: false },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
