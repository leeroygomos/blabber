import './App.css';
import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import UpdateProfileModal from './components/UpdateProfileModal/UpdateProfileModal';
import AddFriendModal from './components/AddFriendModal/AddFriendModal';
import pfp from './assets/pip.jpg';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddFriendModal, setAddFriendModal] = useState(false);
  const [usersSocket, setUsersSocket] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [currentTab, setCurrentTab] = useState(null);
  const [activeChats, setActiveChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  const refreshUserData = async () => {
    setLoading(true);
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
  };

  const getFriends = async () => {
    setLoading(true);
    fetch('/chats/getFriends', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setFriends(
          data.map((friend) => {
            return {
              chatId: friend._id,
              name: friend.username,
              img: friend.avatar,
              bio: friend.bio,
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGroups = async () => {
    setLoading(true);
    fetch('/chats/getGroups', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setGroups(
          data.map((group) => {
            group.img = pfp;
            return { chatId: group._id, name: group.chatName, img: group.img };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshUserData();
    getFriends();
    getGroups();
  }, []);

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { sessionID };
    } else {
      socket.auth = { username: user.username, userID: user.id };
    }
    socket.connect();

    socket.on('session', ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        setIsConnected(false);
      }
    });

    socket.on('users', (users) => {
      let tempUsers = [];
      users.forEach((connectedUser) => {
        connectedUser.self = connectedUser.userID === socket.userID;
        tempUsers.push(connectedUser);
      });
      // put the current user first, and then sort by username
      tempUsers = tempUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUsersSocket(tempUsers);
    });

    setIsConnected(true);

    return () => {
      socket.off('connect_error');
      setIsConnected(false);
    };
  }, [usersSocket, user.username, user.id]);

  useEffect(() => {
    socket.on('user connected', (user) => {
      console.log('user connected yo');
      setUsersSocket([...usersSocket, user]);
    });
  }, [usersSocket]);

  useEffect(() => {
    socket.on('private message', ({ msg, from, fromUsername }) => {
      console.log('msg: ' + msg);
      console.log('from: ' + fromUsername);
      console.log('from: ' + from);
      for (let i = 0; i < usersSocket.length; i++) {
        const currUser = usersSocket[i];
        if (currUser.userID === from) {
          messages.push({
            msg: msg,
            from: from,
            fromSelf: false,
          });
          // if (user !== this.selectedUser) {
          //   user.hasNewMessages = true;
          // }
          break;
        }
      }
    });
  }, [messages]);

  useEffect(() => {
    setCurrentTab(activeChats.length - 1);
    setMessages(
      activeChats[activeChats.length - 1]
        ? activeChats[activeChats.length - 1].messages
        : []
    );
  }, [activeChats]);

  const sendMessage = () => {
    console.log('front end:' + message);
    if (selectedUser) {
      socket.emit('private message', {
        msg: message,
        to: selectedUser,
      });
      messages.push({
        msg: message,
        fromSelf: true,
      });
    }
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const toggleShowProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const toggleAddFriendModal = () => {
    setAddFriendModal(!showAddFriendModal);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const closeAddFriendModal = () => {
    setAddFriendModal(false);
  };

  const getCurrentChat = async (chatId, chatName) => {
    const chatIndex = activeChats.findIndex((chat) => chat.chatId === chatId);
    if (chatIndex !== -1) {
      setCurrentTab(chatIndex);
      setMessages(activeChats[chatIndex].messages);
    } else {
      fetch(`/messages/getMessages/${chatId}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            setActiveChats([
              ...activeChats,
              { chatId: chatId, messages: data, chatName: chatName },
            ]);
          } else {
          }
        });
    }
  };

  const updateMessages = (index) => {
    setMessages(activeChats[index].messages);
  };

  // {
  //     user: 'leeroycool',
  //     messages: [
  //       {
  //         username: 'leeroycool',
  //         message: 'hi pip',
  //         timestamp: '2023-05-09 4:20 PM',
  //       },
  //       { username: 'pip', message: 'wassap', timestamp: '2023-05-09 4:20 PM' },
  //     ],
  //   },
  //   {
  //     user: 'stickypasta',
  //     messages: [
  //       { username: 'pip', message: 'ayo', timestamp: '2023-05-09 4:20 PM' },
  //       {
  //         username: 'stickypasta',
  //         message: 'u r so cute pip!',
  //         timestamp: '2023-05-09 4:20 PM',
  //       },
  //       {
  //         username: 'pip',
  //         message: 'ya i know :))',
  //         timestamp: '2023-05-09 4:20 PM',
  //       },
  //     ],
  //   },

  return (
    // <div>
    //   {!isConnected ? <p>Server bad</p> : <>
    //   <ul>{usersSocket.map((user) => {
    //     return <>
    //         <li key={user.userID}>{user.username}</li>
    //         <input type="button" value="select user" onClick={()=>{setSelectedUser(user.userID)}}/>
    //         </>
    //   }
    //   )}
    //   </ul>
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
    //   </div></>
    // }
    // </div>
    <div className="layout">
      {loading ? (
        <h1>Loading...</h1> //TODO: Add a real loading screen
      ) : (
        <>
          <Sidebar
            updateShowProfileModal={toggleShowProfileModal}
            updateAddFriendModal={toggleAddFriendModal}
            getCurrentChat={getCurrentChat}
            user={user}
            friends={friends}
            groups={groups}
          />
          <Chat
            activeChats={activeChats}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            messages={messages}
            updateMessages={updateMessages}
          />
          {showProfileModal ? (
            <>
              <UpdateProfileModal
                closeProfileModal={closeProfileModal}
                username={user.username || ''}
                bio={user.bio || ''}
                email={user.email || ''}
                refreshUserData={refreshUserData}
              />
              <div className="overlay"></div>
            </>
          ) : (
            <></>
          )}
          {showAddFriendModal ? (
            <>
              <AddFriendModal closeAddFriendModal={closeAddFriendModal} />
              <div className="overlay"></div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
