import './App.css';
import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import UpdateProfileModal from './components/UpdateProfileModal/UpdateProfileModal';
import AddFriendModal from './components/AddFriendModal/AddFriendModal';
import CreateGroupModal from './components/CreateGroupModal/CreateGroupModal';
import pfp from './assets/pip.jpg';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddFriendModal, setAddFriendModal] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [usersSocket, setUsersSocket] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
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
              userId: friend.userId,
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
    if (!loading){
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

      setLoading(false);
    }
      return () => {
        socket.off('connect_error');
        setLoading(true);
      };
  }, [user.username, user.id, loading]);


  // remove?
  useEffect(() => {
    socket.on('user connected', (user) => {
      setUsersSocket([...usersSocket, user]);
    });
  }, [usersSocket]);

  useEffect(() => {

    const handlePrivateMessage = ({chatId, senderName, message, createdAt}) => {
      let msg = {
        chatId: chatId,
        senderName: senderName,
        message: message,
        createdAt: createdAt,
      };
      let temp = activeChats;
      // let chatIndex = getChatTab(chatId);
      let chatIndex = activeChats.findIndex((chat) => chat.chatId === chatId)
      if (chatIndex !== -1){
        temp[chatIndex].messages.push(msg);
        if (chatIndex === currentTab){
          // setMessages(activeChats[chatIndex].messages);
          setMessages([...messages, msg]);
        }
        setActiveChats(temp);
      }
      else {
        // TODO: handle if there is no active chat
      }
    }

    socket.on('private message', handlePrivateMessage);

    return () => {
      socket.off('private message', handlePrivateMessage);
    }
  }, [activeChats, currentTab, messages]);

  useEffect(() => {
    setCurrentTab(activeChats.length - 1);
    setMessages(
      activeChats[activeChats.length - 1]
        ? activeChats[activeChats.length - 1].messages
        : []
    );
  }, [activeChats]);

  const sendMessage = (message) => {
    if (selectedChat) {
      const timestamp = Date.now()

      let msg = {
        chatId: selectedChat,
        senderName: user.username,
        message: message,
        createdAt: timestamp,
      }

      socket.emit('private message', {...msg, to: selectedChat});
      setMessages([...messages, msg]);
      let temp = activeChats;
      temp[currentTab].messages.push(msg);
      setActiveChats(temp);
      // TODO: save to DB
      saveMessage(msg);
    }
  };

  const saveMessage = (msg) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
        credentials: 'include'
    };
    fetch(`/messages/sendMessage/${selectedChat}`, requestOptions)
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) {
        } 
        else {
          console.log(status);
        }
      });
  }

  const toggleShowProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const toggleAddFriendModal = () => {
    setAddFriendModal(!showAddFriendModal);
  };

  const toggleCreateGroupModal = () => {
    setCreateGroupModal(!createGroupModal);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const closeAddFriendModal = () => {
    setAddFriendModal(false);
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModal(false);
  };

  const getCurrentChat = async (chatId, chatName, userId) => {
    const chatIndex = activeChats.findIndex((chat) => chat.chatId === chatId);
    if (chatIndex !== -1) {
      setCurrentTab(chatIndex);
      setMessages(activeChats[chatIndex].messages);
      setSelectedChat(activeChats[chatIndex].chatId);
    } else {
      fetch(`/messages/getMessages/${chatId}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setActiveChats([
              ...activeChats,
              { chatId: chatId, messages: data, chatName: chatName, userId: userId },
            ]);
            setSelectedChat(chatId);
          }
        });
    }
  };

  const updateMessages = (index) => {
    setMessages(activeChats[index].messages);
  };

  const closeTab = (index) => {
    let newActiveChats = [...activeChats];
    newActiveChats.splice(index,1);
    setActiveChats(newActiveChats);
  };

  return (
    <div className="layout">
      {loading ? (
        <h1>Loading...</h1> //TODO: Add a real loading screen
      ) : (
        <>
          <Sidebar
            updateShowProfileModal={toggleShowProfileModal}
            updateAddFriendModal={toggleAddFriendModal}
            updateCreateGroupModal={toggleCreateGroupModal}
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
            sendMessage={sendMessage}
            closeTab={closeTab}
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
          ) : createGroupModal ? (
            <>
              <CreateGroupModal closeCreateGroupModal={closeCreateGroupModal} />
              <div className="overlay"></div>
            </>
          ) : <></>}
        </>
      )}
    </div>
  );
}

export default App;
