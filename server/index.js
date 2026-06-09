import { connectDB } from "./src/config/database.js";
import { PORT } from "./src/config/env.js";
import app from './src/app.js'

const startServer = async () => {
    try{
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

startServer();