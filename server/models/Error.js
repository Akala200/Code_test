import mongoose from 'mongoose';

const { Schema } = mongoose;


const ErrorSchema = new Schema(
  {
    error_type: {
      type: String,
      trim: true,
      required: true,
    },
    error_message: {
      type: String,
    },
  },
  { timestamps: true }
);


const Error = mongoose.model('Error', ErrorSchema);

export default Error;
