const mongoose = require('mongoose');

main()
    .catch(err => console.log(err))
    .then(() => {
        console.log("connection successful")
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');

}

const orderSchema = new mongoose.Schema({
    item: String,
    price: Number
});

const custmerSchema = new mongoose.Schema({
    name: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});


// custmerSchema.pre("findOneAndDelete",async ()=>{
//     console.log("PRE MIDDLEWARE");
// });

custmerSchema.post("findOneAndDelete", async (data)=>{
    if(data.orders.length){
       let result = await Order.deleteMany({_id:{$in:data.orders}});
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", custmerSchema);



// const findCust = async ()=>{
//     let res = await Customer.find({}).populate("orders");
//     console.log(res[0]);
// };

// findCust();



const addCustomer = async () => {
    let cust2 = new Customer({
        name: "Rohan Maurya",
    });

    let order1 = await Order.findOne({ item: "samosa" });
    let order2 = await Order.findOne({ item: "chocolate" });
    cust2.orders.push(order1);
    cust2.orders.push(order2);
    let res= await cust2.save();;
    console.log(res);
}

const delCust = async ()=>{
    let res = await Customer.findByIdAndDelete("657af1bae79edeb4ce8ad7c8");
    console.log(res);
}
addCustomer();
// delCust();

// const aadOrders = async ()=>{
//     let res = await Order.insertMany(
//         [{
//             item:"samosa",
//             price:12
//         },
//         {
//             item:"chocolate",
//             price:10
//         }]
//     )
//     console.log(res);
// }

// aadOrders();