const pool = require("./connection");

const testConnection = async () => {
     const result = await pool.query("SELECT NOW();");
     console.log(result);
};

testConnection();