import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IProduct {
    product: string;
    quantity: number;
    unit: string;
    registeredBy: string;
    createdAt: any;
}

const ProductSchema = new Schema<IProduct>({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    registeredBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ProductSchema.plugin(mongoosePaginate);

model<IProduct>('IProduct', ProductSchema);