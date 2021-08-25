const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const Course = new Schema(
    {
        title: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
        videoId: { type: String, maxLength: 255 },
        image: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', Course);
