import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HolidaySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Holiday = mongoose.model('Holiday', HolidaySchema);

export default Holiday;
