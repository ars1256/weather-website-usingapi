import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    content: "API Response.", cloud_pct: "",
    City:"",
    temp: "",
    feels_like: "",
    humidity: "",
    min_temp: "",
    max_temp: "",
    wind_speed: "",
    wind_degrees: "",
    sunrise: "",
    sunset: ""
  });
});
// Define a route for the root URL
app.post("/city", async (req, res) => {
  const enter = req.body.city;
  const options = {
    method: 'GET',
    url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
    params: { city: enter },
    headers: {
      'X-RapidAPI-Key': 'ad58ea6ffdmsh6a11da752713020p12657cjsn64865a3d4cb7',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };


  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.render("index.ejs", {
      City:enter,
      content: JSON.stringify(response.data),
      cloud_pct: JSON.stringify(response.data.cloud_pct),
      temp: JSON.stringify(response.data.temp),
      feels_like: JSON.stringify(response.data.feels_like),
      humidity: JSON.stringify(response.data.humidity),
      min_temp: JSON.stringify(response.data.min_temp),
      max_temp: JSON.stringify(response.data.max_temp),
      wind_speed: JSON.stringify(response.data.wind_speed),
      wind_degrees: JSON.stringify(response.data.wind_degrees),
      sunrise: JSON.stringify(response.data.sunrise),
      sunset: JSON.stringify(response.data.sunset)
    })


  } catch (error) {
    console.error(error);
  }

});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})



