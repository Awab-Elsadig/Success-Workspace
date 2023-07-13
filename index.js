const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Define a route for the booking page
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "booking.html"));
});

// Define a route for the membership page
app.get("/membership", (req, res) => {
  res.sendFile(path.join(__dirname, "membership.html"));
});

// Define a route for the contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
