const {Schema, model} = require("mongoose");

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        userId: {
            // type: String,
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            // type: String,
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Comment", commentSchema);