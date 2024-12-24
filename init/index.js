const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
    console.log("Connected to DB");
    })
    .catch((err)=>{
        throw(err);
    });

async function main(){
    mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'675ff9b16efe520916be2776'}));
    await Listing.insertMany(initData.data);
    console.log("Data is initaialized");
};

initDB();