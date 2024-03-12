const express = require('express');
const app = express();

const axios = require('axios');

const port = 8080;
app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});

const path = require("path");
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.get("/",async(req,res) =>{
    
    const city = req.query.city;
    const apiKey = "a2726ab10b70ce33fcff73c1e1592366";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    let weather;
    let error = null;
try {
    const response = await axios.get(apiUrl);
    weather = response.data;
    console.log(weather)
    
} catch (error) {
    weather = null;
    error = `Error! please try again`
}

res.render("home.ejs", {weather , error});
});



