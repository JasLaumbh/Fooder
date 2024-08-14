const mongoose = require('mongoose');

const mongouri = 'mongodb+srv://GoFood:Jasgofood23$@cluster0.ipve0ov.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongouri);  // No need for options like useNewUrlParser
        console.log("Connected to MongoDB");

        // Fetch food items
        const foodItems = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = foodItems;

        // Fetch food categories
        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.foodCategory = foodCategory;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
