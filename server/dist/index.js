"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./lib/socket");
//import all router
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const db_1 = __importDefault(require("./lib/db"));
// connect to database
(0, db_1.default)();
// configuration
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// middleware
socket_1.app.use((0, cors_1.default)());
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
// routes middleware
socket_1.app.use("/api/v1/auth", auth_route_1.default);
socket_1.app.get("/", (req, res) => {
    res.send("Hello World");
});
socket_1.io.on("connection", socket => {
    console.log(`user connected: ${socket.id}`);
    socket.emit("message", "Hello from server");
    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});
socket_1.server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
