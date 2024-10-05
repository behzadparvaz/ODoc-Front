import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        console.log("New socket connection: ", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            socket.broadcast.to(roomId).emit("user-joined", socket.id);

            socket.on("offer", (offer) => {
                socket.broadcast.to(roomId).emit("receive-offer", offer);
            });

            socket.on("answer", (answer) => {
                socket.broadcast.to(roomId).emit("receive-answer", answer);
            });

            socket.on("ice-candidate", (candidate) => {
                socket.broadcast.to(roomId).emit("receive-ice-candidate", candidate);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected: ", { roomId, socketId: socket.id });
                socket.broadcast.to(roomId).emit("disconnected", roomId)
            });
            socket.on("req-disconnect", () => {
                console.log("User req disconnected: ", { roomId, socketId: socket.id });
                socket.broadcast.to(roomId).emit("disconnected", roomId)
            });
        });
    });

    res.end();
};

export default SocketHandler;
