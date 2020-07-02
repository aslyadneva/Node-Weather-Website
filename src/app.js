const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// process.env lets us access enviroment variables
const port = process.env.PORT || 3000;

// evaulates to absoulte path to the views directory in 'templates'
const viewsPath = path.join(__dirname, "../templates/views");
// evaulates to absoulte path to the partials directory in 'templates'
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // setting the view engine to be handlebars
app.set("views", viewsPath); // setting the views directory path -- default is 'views'
hbs.registerPartials(partialsPath);

// telling express from which directory to serve static files
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page Dynamic",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page Dynamic",
    message: "Ask us anything",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log(error);
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          console.log(error);
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    errorMessage: "Help article not found",
  });
});

// 404 Pages
// * matches any route not defined above (wildcard)
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => console.log(`Server listening on port ${3000}`));
