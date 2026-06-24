import dotenv from "dotenv";
import path from "path";

dotenv.config({ 
    path: path.join(process.cwd(), '.env'),
});

const config = {
    port: process.env.PORT || 3000,
    connectionString: process.env.CONNECTION_STRING || "",
    salt : process.env.SALT,
    secret : process.env.JWT_SECRET
};

export default config;