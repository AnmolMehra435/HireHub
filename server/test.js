import { connectDB } from "./src/config/database.js"
import { User } from "./src/models/users.js";

await connectDB();

const newUser = await User.create({
    name: "Mannat Sharma",
    email: "Mannat2604@gmail.com",
    password: "mannat@0434",
    role: "candidate"
})

console.log(newUser);

newUser.name = "Mannat"

await newUser.save();

const updatedUser = await User.findOne({
    email: "mannat2604@gmail.com"
}).select("+password")

if(newUser.password === updatedUser.password){
    console.log("Hashed password is same");
}else{
    console.log("Password is different")
}

console.log(updatedUser);
