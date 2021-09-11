import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
            }
        ],
        brand: {
            name: {
                type: String,
                required: true,
            },
            brand: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Brand',
            }

        },
        category: {
            name: {
                type: String,
                required: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Category',
            }
        },

        description: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        sold: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product
