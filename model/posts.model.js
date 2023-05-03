const mongooose = require("mongoose")

const postSchema = mongooose.Schema({
    user: { type:mongooose.Schema.Types.ObjectId , ref: 'user' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: mongooose.Schema.Types.ObjectId, ref: 'user' }],
    comments: [{
      user: { type: mongooose.Schema.Types.ObjectId, ref: 'user' },
      text: String,
      createdAt: Date
    }]
},{
    versionKey:false
})

const PostModel = mongooose.model("Post",postSchema)

module.exports = {PostModel};