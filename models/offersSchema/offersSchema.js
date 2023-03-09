const mongoose = require("mongoose")
const Player = require("../loginSchema/loginSchema")


const offerSchema = new mongoose.Schema(
    {
        offer_id: {
            type: String
        },
        offer_title: {
            type: String,
            required: true,
        },
        offer_description: {
            type: String,
            required: true,
        },
        offer_image: {
            type: String,
            required: true,
        },
        offer_sort_order: {
            type: Number,
            // required: true,
            default: 0
        },
        content: {
            type: Array,
            required: true,
            default: [
                {
                    "item_id": "ITEM-1",
                    "quantity": 10
                },
                {
                    "item_id": "ITEM-2",
                    "quantity": 1
                }]
        },
        schedule: {
            type: Object,
            required: true,
            default: {
                "days_of_week": [1, 2, 3],
                "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                "months_of_year": [11]
            },
        },
        target: {
            type: String,
            required: true,
        },
        pricing: {
            type: Array,
            required: true,
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
            required: true
        }

    },
    {
        timestamps: true,
    }
)

const Offer = mongoose.model("offer", offerSchema)

module.exports = Offer