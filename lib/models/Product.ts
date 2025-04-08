import mongoose from "mongoose";
import { parse } from "path";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    media: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    collection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    }],
    tags: [String],
    size: [String],
    color: [String],
    price: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => {
            return parseFloat(v.toString())
        },
        required: true
    },
    expense: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => {
            return parseFloat(v.toString())
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { getters: true } })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product