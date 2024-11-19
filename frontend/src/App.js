import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001/");

function App() {
  const [roomSelected, setRoomSelected] = useState(false);
  const [RoomID, setRoomID] = useState("");

  const [input, setINPUT] = useState("");

  const [grpMsgs, setGrpMsgs] = useState([]);

  const handleBtn = () => {
    socket.emit("ack-join-ws-&-join-room-event", RoomID);
    setRoomSelected(true);
  };

  const handleINPUTBtn = () => {
    socket.emit("msg-from-client-to-server-to-client", {
      room: RoomID,
      msg: input,
    });
  };

  socket.on("msg-from-client-to-server-to-client", (msg) => {
    let newMsgsArr = [...grpMsgs, msg];
    setGrpMsgs(newMsgsArr);
  });

  return !roomSelected ? (
    <div>
      <input
        value={RoomID}
        placeholder="ENTER ROOM TO ENTER..."
        onChange={(e) => {
          setRoomID(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          handleBtn();
        }}
      >
        ENTER
      </button>
    </div>
  ) : (
    <div>
      <input
        value={input}
        placeholder="ENTER MSG"
        onChange={(e) => {
          setINPUT(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          handleINPUTBtn();
        }}
      >
        ENTER
      </button>
      {grpMsgs.map((msg, index) => {
        return (
          <h1 key={index}>
            {index}----{msg}
          </h1>
        );
      })}
    </div>
  );
}

export default App;
