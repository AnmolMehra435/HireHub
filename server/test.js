import { connectDB } from "./src/config/database.js"
import { User } from "./src/models/users.js";

await connectDB();

const user = await User.findOne({
    email: "mannat2604@gmail.com"
}).select("+password")
console.log(user);


console.log(await user.comparePassword("mannat@0434"))

