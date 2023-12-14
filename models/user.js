const mongoose = require('mongoose');

main()
  .catch(err => console.log(err))
  .then(() => {
    console.log("connection successful")
  })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');

}

const userSchema = new mongoose.Schema({
  username: String,
  address: [{
    _id:false,
    location: String,
    city: String
  }]
})

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  let user1 = new User({
    username: "Youbraj Singh",
    address: [
      {
        _id:false,
        location: "Navi Mumbai",
        city: "Mumabi"
      },
      {
        _id:false,
        location: "Uran",
        city: "Navi Mumbai"
      }
    ]
  });

  // user1.address.push({ location: "andheri", city: "Mumbai" });
   let result = await user1.save();
  console.log(result);
}

addUser();

// console.log(User.findOne({username:"Youbraj Singh"}));