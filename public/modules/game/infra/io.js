"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server();
exports.io = io;
io.listen(3000, {
    cors: {
        origin: "*"
    }
});
//# sourceMappingURL=io.js.map