import './App.css';
import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users/getLoggedInUser', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.username) {
          setUser(data);
          setLoading(false);
        } else {
          navigate('/login');
        }
      });
  }, []);

  const [activeChats, setActiveChats] = useState([
    {
      user: 'leeroycool',
      messages: [
        {
          username: 'leeroycool',
          message: 'hi pip',
          timestamp: '2023-05-09 4:20 PM',
        },
        { username: 'pip', message: 'wassap', timestamp: '2023-05-09 4:20 PM' },
      ],
    },
    {
      user: 'stickypasta',
      messages: [
        { username: 'pip', message: 'ayo', timestamp: '2023-05-09 4:20 PM' },
        {
          username: 'stickypasta',
          message: 'u r so cute pip!',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'ya i know :))',
          timestamp: '2023-05-09 4:20 PM',
        },
      ],
    },
    {
      user: 'pip',
      messages: [
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'pip',
          message: 'hello to myself',
          timestamp: '2023-05-09 4:20 PM',
        },
      ],
    },
    {
      user: 'froggers',
      messages: [
        {
          username: 'pip',
          message: 'sup dawg',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'froggers',
          message: 'im soo THICC',
          timestamp: '2023-05-09 4:20 PM',
        },
      ],
    },
    {
      user: 'mario',
      messages: [
        {
          username: 'pip',
          message: 'who tf is this?',
          timestamp: '2023-05-09 4:20 PM',
        },
        {
          username: 'mario',
          message: 'its a me MARIO!',
          timestamp: '2023-05-09 4:20 PM',
        },
      ],
    },
  ]);

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
      {loading ? (
        <h1>Loading...</h1> //TODO: Add a real loading screen
      ) : (
        <>
          <Sidebar user={user} />
          <Chat activeChats={activeChats} />
        </>
      )}
    </div>
  );
}

export default App;
