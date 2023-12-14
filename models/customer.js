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
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", custmerSchema);

const findCust = async ()=>{
    let res = await Customer.find({}).populate("orders");
    console.log(res[0]);
};

findCust();



// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Sujal Gholap",

//     });

//     let order1 = await Order.findOne({ item: "samosa" });
//     let order2 = await Order.findOne({ item: "chocolate" });
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//     let res= await cust1.save();;
//     console.log(res);
// }

// addCustomer();

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