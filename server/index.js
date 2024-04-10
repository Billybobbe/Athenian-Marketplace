const express = require("express");
const PORT = process.env.port || 3001;
const app = express();
app.get("/api", (req, res)=>{
    res.json({message: "hello from server"});
});
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});