import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String },
  amountAvailable: { type: Number, default: 0 },
  sellerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  cost: { type: Number, default: 0 },
  currency: { type: String },
},
{ timestamps: true });

const product = mongoose.model('product', productSchema);

export default product;
