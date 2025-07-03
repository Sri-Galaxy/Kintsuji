import { connect } from 'mongoose';
import { data } from './initData.js';
import Listing from '../models/schema.js';

//Connecting to DataBase...................
async function main() {
  await connect("mongodb://127.0.0.1:27017/Kintsuji");
}


main()
  .then(() => {
    console.log(
      "----_Superb! Connected to MongoDB_----\n"
    );
  })
  .catch((err) => {
    console.log(err.message);
  });


//Initialising Data...............................
const initDB = async () => {
  await Listing.deleteMany({});
  console.log('data is deleted...');

  await Listing.insertMany(data);
  console.log('Data is inserted...');
}

initDB();
