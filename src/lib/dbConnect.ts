import mongoose from "mongoose";

// Type definition for the connection object to track connection status
type ConnectionObject = {
    isConnected?: number
}

// Singleton connection object to avoid multiple connections
const connection: ConnectionObject = {}

// Asynchronous function to connect to MongoDB using Mongoose
async function dbConnect(): Promise<void>{

    // If already connected, skip reconnection , this is done bcoz in next js everythings runs on edge
    // so when something is required so at that time that thing will be provided , so to avoid creating connection multiple times 
    // we check that connection is there or not ...
    if(connection.isConnected){
        console.log("DB already connected")
        return
    }

    try {
       // Attempt to connect to MongoDB using the URI from environment variables
       const db =  await mongoose.connect(process.env.MONGODB_URI || '')
       // Update connection status
       connection.isConnected = db.connections[0].readyState
        
       // Log connection details for debugging
       console.log("*************DB CONNECTIONS : " , db.connections)

       console.log("DB Connected Successfully");
    } catch (error) {
        // Log error and exit process if connection fails
        console.log("Database connection failed" , error);

        process.exit(1);
    }
}

// Export the dbConnect function for use in other modules
export default dbConnect;