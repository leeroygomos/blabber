import './App.css';
import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/Chat.js';
import Friends from './components/Friends.js';
import Groups from './components/Groups.js';
import Input from './components/Input.js';
import Layout from './components/Layout.js';
import Message from './components/Message.js';
import Messages from './components/Messages.js';
import Profile from './components/Profile.js';
import Sidebar from './components/Sidebar.js';
import Tabs from './components/Tabs.js';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

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

    <Layout>
        <Sidebar>
          <Profile></Profile>
          <Friends></Friends>
          <Groups></Groups>
        </Sidebar>
        <Tabs></Tabs>
        <Chat>
          <Messages>
            <Message></Message>
          </Messages>
          <Input></Input>
        </Chat>
    </Layout>
  );
}

export default App;
