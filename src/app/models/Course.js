const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const Course = new Schema(
    {
        _id: { type: Number },
        title: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
        videoId: { type: String, maxLength: 255 },
        image: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);

mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Course', Course);
