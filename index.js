import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Person from "./models/models.User.js";
dotenv.config();

//Setting up the Db
connectDB();

//Setting up the port Number
const port = process.env.PORT;

//Setting up express server
const app = express();

//Creating and Saving a Person data to database
const newPerson = new Person({
  name: "John Doe",
  age: 30,
  favoriteFood: ["Rice", "Beans", "Burritos"],
  gender: "male",
});

//Saving data
newPerson
  .save()
  .then((data) => {
    console.log("Person saved", data);
  })
  .catch((error) => console.log(error));

//Using Create to save multiple users
const arrayOfPerson = [
  {
    name: "Alice",
    age: 25,
    favoriteFood: ["Burgers", "Fries", "Burritos"],
    gender: "female",
  },
  {
    name: "Bob",
    age: 22,
    favoriteFood: ["Sushi", "Ramen", "Burritos"],
    gender: "male",
  },
  {
    name: "Charlie",
    age: 35,
    favoriteFood: ["Steak", "Wine", "Burritos"],
    gender: "male",
  },
];

Person.create(arrayOfPerson)
  .then((data) => console.log("People created: ", data))
  .catch((error) => console.log(error));

//Finding a given name from the DB using Model.find()
Person.find({ name: "Alice" })
  .then((data) => console.log(`People with the name Alice: ${data}`))
  .catch((error) => console.log(`Error: ${error}`));

//Using model.findOne() to Return a Single Matching Document from the Database, the query string used was favoriteFood as the search key
Person.findOne({ favoriteFood: "Steak" })
  .then((data) => console.log(`Person(s) that like steak: ${data}`))
  .catch((error) => console.log(`Error: ${error}`));

//Using model.findById() to Search the Database By _id
const _id = "66cc8724aa4708af4894f0e4";
Person.findById({ _id })
  .then((data) => console.log(`Person(s) with id number ${_id}: ${data}`))
  .catch((error) => console.log(`Error: ${error}`));

//Performing Updates by Running FindbyId, Array.push(), then Saving using .save()
// const _id = "66cc8724aa4708af4894f0e4";
//Adding Hamburger to their list of favorites food
Person.findById({ _id })
  .then((data) => {
    data.favoriteFood.push("hamburger");
    data
      .save()
      .then((updatedPerson) =>
        console.log(`updatedPerson data : ${updatedPerson}`)
      )
      .catch((error) => console.log(`Error : ${error}`));
  })
  .catch((error) => `Person with id : ${_id} does not exists`);

//Performing New Updates on a Document Using model.findOneAndUpdate(), using Name as a query parameter and updating the age.
Person.findOneAndUpdate({ name: "Bob" }, { age: 20 }, { new: true })
  .then((data) => console.log(`Updated profile of Bob ${data}`))
  .catch((error) => console.log(error));

// Delete One Document Using model.findByIdAndRemove, Deleting Bob profile
Person.findByIdAndDelete({ _id })
  .then((data) => console.log(`Removed Person: ${data}`))
  .catch((error) => console.log(error));

//Deleting Many Documents with model.remove(), with the target name as Alice
Person.deleteMany({ name: "Alice" })
  .then((data) => console.log(`Deleted outcome count: ${data.deletedCount}`))
  .catch((error) => console.log(error));

//Chaining Search Query Helpers to Narrow Search Results using find, sort, limit, select
Person.find({ favoriteFood: "Burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .then((data) => console.log(`People that liked Burritos: ${data}`));
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
