import mongoose from "mongoose";

const instance = mongoose.Schema({
    caption: String,
    user: String,
    image: String,
    comments: [],
});

export default mongoose.model('posts', instance);


// potential storage image in database, would need\
// to convert image to smallest size that keeps good look
// some converting software somewhere im sure
/*** 
 * const instance = mongoose.Schema({
    caption: String,
    user: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    comments: [],
});
 */
