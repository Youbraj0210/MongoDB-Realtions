const mongoose = require('mongoose');

main()
    .catch(err => console.log(err))
    .then(() => {
        console.log("connection successful");
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const userSchema = new mongoose.Schema({
    username:String,
    email:String
})


const postSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

// const addData = async()=>{
//     let user1 = await User.findOne({username:"youbraj"});
//     console.log(user1);
//     // let user1 = new User({
//     //     username:"youbraj",
//     //     email:"youbrajsingh0210@gmial.com"
//     // });

//     let post3 = new Post({
//         content:"this is my third post",
//         like:5
//     });

//     post3.user = user1;
//     // await user1.save();
//     await post3.save();
// }

const findPost = async ()=>{
    let res = await Post.find({}).populate("user","username");
    console.log(res);
}

findPost();

// addData();