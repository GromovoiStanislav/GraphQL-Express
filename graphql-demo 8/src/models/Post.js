const {Schema, model} = require("mongoose");

const postSchema = new Schema(
    {
        authorId: {
            //type: String,
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postSchema);