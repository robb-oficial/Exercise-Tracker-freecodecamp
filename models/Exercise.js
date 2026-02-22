const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please provide a description']

    },
    duration: {
        type: Number,
        required: [true, 'Please provide a duration']
    },
    date: {
        type: Date
    },
    userId: {
        type: mongoose.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);