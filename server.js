const express = require('express')
const mongoose = require('mongoose')
const Weed = require('./models/weed')
const weedSeed = require('./models/weedSeed')
const methodOverride = require('method-override')

const app = express()

// Configure Server Settings
require('dotenv').config()

// Establish connection to MongoDB
const DATABASE_URL = process.env.DATABASE_URL;
// Database Connection
mongoose.connect(process.env.DATABASE_URL)

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

app.set('view engine', 'ejs')

// Mount Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

// Mount Routes 
app.get('/weeds/seed', (req, res) => {
  Weed.deleteMany({}, (error, allWeeds) => {});
  Weed.create(weedSeed, (err, data) => {
      res.redirect('/weeds')
  });
});

// Routes-Index

app.get("/weeds", (req, res) => {
    Weed.find({}, (error, allWeeds) => {
      res.render("index.ejs", {
        weeds: allWeeds,
      })
    })
  })

// Routes- New
app.get("/weeds/new", (req, res) => {
    res.render("new.ejs")
  })

// Delete
  app.delete('/weeds/:id', (req, res) => {
    Weed.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/weeds');
    });
});

// Update
app.put("/weeds/:id", (req, res) => {
    Weed.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedWeed) => {
        res.redirect(`/weeds/${req.params.id}`)
      }
    )
  })


// Routes - Create

app.post('/weeds', (req, res) => {
    Weed.create(req.body, (error, createdWeed) => {
      res.redirect("/weeds") // <-- new stuff right here
    })
});

// Edit
app.get("/weeds/:id/edit", (req, res) => {
    Weed.findById(req.params.id, (error, foundWeed) => {
      res.render("edit.ejs", {
        weed: foundWeed,
      })
    })
  })
  
// Show
app.get("/weeds/:id", (req, res) => {
    Weed.findById(req.params.id, (err, foundWeed) => {
      res.render("show.ejs", {
        weed: foundWeed,
      })
    })
  })

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
