const express = require("express");
const app = express();
const port = 3000;


const init = require("./src/routers");

init(app);



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});