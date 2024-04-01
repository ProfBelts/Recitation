const express = require("express");
const app = express();
const path = require("path");

// Set up static files and view engine
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Render views/index.ejs when the client requests "/"
app.get("/", function (req, res) {
    res.render("index");
});

// Listen for socket connections
const server = app.listen(8000);
const io = require("socket.io")(server);
let connectedUsers = new Set();

// Listen for "got_a_new_user" event from the client
// Listen for socket connections
io.on("connection", function (socket) {
    console.log("New user connected:", socket.id);

    socket.on("raise-hand", () => {
        io.emit("hand-raised", socket.id);
    });

    socket.on("disconnect", () => {
        // Corrected event name
        io.emit("user-disconnect", socket.id);
    });
});
