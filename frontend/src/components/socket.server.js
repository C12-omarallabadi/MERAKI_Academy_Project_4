
import io from "socket.io-client";
const socketInit = ({ user_id, token }) => {
  const socket =io("http://localhost:8080/", {
    extraHeaders: {
      user_id,
      token,
    },
  });
  return socket
};
export default socketInit;
