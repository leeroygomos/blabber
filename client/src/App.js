import './App.css';
import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const [activeChats, setActiveChats] = useState(['leeroycool','stickypasta','pip','froggers','billy'])

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onShowMessage(msg) {
  //     setMessages([...messages, msg]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('show message', (msg) => onShowMessage(msg));

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, [messages]);

  // const sendMessage = () => {
  //   console.log(message);
  //   socket.emit('message', message);
  // };

  // const handleInput = (event) => {
  //   setMessage(event.target.value);
  // };

  return (
    // <div>
    //   {isConnected ? <p>Server is connected</p> : <p>Server bad</p>}
    //   <div>
    //     <ul>
    //       {messages.map((msg, index) => {
    //         return <li key={index}>{msg}</li>;
    //       })}
    //     </ul>
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         handleInput(event);
    //       }}
    //     />
    //     <button onClick={() => sendMessage()}>Send</button>
    //   </div>
    // </div>

    <div className="layout">
      <Sidebar/>
      <Chat activeChats={activeChats}/>
    </div>
  );
}

export default App;
