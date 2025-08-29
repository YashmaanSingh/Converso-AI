"use client";
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

// Actual asset imports from assets folder
const assets = {
  logo: '/assets/logo.png', // Main logo (Sidebar header)
  menu_icon: '/assets/menu_icon.png', // Sidebar menu icon
  search_icon: '/assets/search_icon.png', // Sidebar search box
  profile_img: '/assets/avatar_icon.png', // Default user avatar (Sidebar/User list)
  arrow_icon: '/assets/arrow_icon.png', // Back arrow (Chat header)
  green_dot: '/assets/react.svg', // Online status indicator (User list/Chat header)
  help_icon: '/assets/help_icon.png', // Help icon (Chat header)
  gallery_icon: '/assets/gallery_icon.svg', // Gallery icon (Chat input)
  send_button: '/assets/send_button.svg', // Send button (Chat input)
  logo_icon: '/assets/logo_icon.svg' // Welcome logo (Chat welcome)
};

// Dummy Data
const dummyUsers = [
  {
    _id: '1',
    fullName: 'John Doe',
    avatar: null,
    bio: 'Software Developer passionate about creating amazing apps.'
  },
  {
    _id: '2',
    fullName: 'Jane Smith',
    avatar: null,
    bio: 'Designer who loves clean and beautiful interfaces.'
  },
  {
    _id: '3',
    fullName: 'Mike Johnson',
    avatar: null,
    bio: 'Product Manager focused on user experience.'
  },
  {
    _id: '4',
    fullName: 'Sarah Wilson',
    avatar: null,
    bio: 'Marketing specialist with a creative mind.'
  },
  {
    _id: '5',
    fullName: 'David Brown',
    avatar: null,
    bio: 'Full-stack developer building the future.'
  }
];

const dummyMessages = [
  {
    _id: '1',
    senderId: '1',
    text: 'Hey there! How are you doing?',
    createdAt: new Date(Date.now() - 3600000),
    image: null
  },
  {
    _id: '2',
    senderId: '2',
    text: 'I\'m doing great! Just working on some new projects.',
    createdAt: new Date(Date.now() - 3000000),
    image: null
  },
  {
    _id: '3',
    senderId: '1',
    text: 'That sounds awesome! What kind of projects?',
    createdAt: new Date(Date.now() - 2400000),
    image: null
  },
  {
    _id: '4',
    senderId: '2',
    text: 'Check out this design I\'ve been working on!',
    createdAt: new Date(Date.now() - 1800000),
    image: 'https://via.placeholder.com/300x200'
  }
];

// Utility function to format message time
const formatMessageTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
};

// Main Chat Application Component
const ChatApp = () => {
  // State management
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(dummyMessages);
  const [users, setUsers] = useState(dummyUsers);
  const [onlineUsers, setOnlineUsers] = useState(['1', '2', '3']); // Dummy online users
  const [unseenMessages, setUnseenMessages] = useState({ '2': 3, '4': 1, '5': 2 });
  const [searchInput, setSearchInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [msgImages, setMsgImages] = useState([]);
  const [currentUser] = useState({ _id: '1', fullName: 'Current User', avatar: null });
  
  const scrollEnd = useRef();
  // Removed useNavigate and related navigation logic for Next.js compatibility

  // Filter users based on search
  const filteredUsers = searchInput 
    ? users.filter((user) => user.fullName.toLowerCase().includes(searchInput.toLowerCase())) 
    : users;

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Clear unseen messages for selected user
    if (unseenMessages[user._id]) {
      setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }));
    }
    // Load dummy messages for selected user
    loadMessagesForUser(user._id);
  };

  // Load messages for selected user (dummy function)
  const loadMessagesForUser = (userId) => {
    // Simulate loading messages
    const userMessages = dummyMessages.filter(msg => 
      msg.senderId === userId || msg.senderId === currentUser._id
    );
    setMessages(userMessages);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() === "" || !selectedUser) return;

    const newMessage = {
      _id: Date.now().toString(),
      senderId: currentUser._id,
      text: chatInput.trim(),
      createdAt: new Date(),
      image: null
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput("");
    toast.success("Message sent!");
  };

  // Handle sending an image
  const handleSendImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newMessage = {
        _id: Date.now().toString(),
        senderId: currentUser._id,
        text: null,
        createdAt: new Date(),
        image: reader.result
      };

      setMessages(prev => [...prev, newMessage]);
      e.target.value = "";
      toast.success("Image sent!");
    };
    reader.readAsDataURL(file);
  };

  // Handle profile navigation (dummy for Next.js, no navigation)
  const handleProfileNavigation = () => {
    toast.success("Profile navigation not implemented in Next.js demo.");
  };

  // Handle logout
  const handleLogout = () => {
    setSelectedUser(null);
    setMessages([]);
    toast.success("Logged out successfully!");
  };

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Update message images when messages change
  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    );
  }, [messages]);

  // Sidebar Component
  const renderSidebar = () => (
    <div className={`${selectedUser ? 'max-md:hidden' : ''} bg-black text-white h-screen w-1/4 min-w-64`}>
      <div className="pt-5 px-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-36" />
          <div className="menu relative group">
            <img src={assets.menu_icon} alt="menu" className="max-w-5 cursor-pointer opacity-60" />
            <div className="sub-menu absolute top-full right-0 w-32 p-5 rounded-lg bg-white text-black text-sm z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p onClick={handleProfileNavigation} className="cursor-pointer text-sm hover:text-blue-600">
                Edit Profile
              </p>
              <hr className="border-none h-px bg-gray-500 my-2" />
              <p onClick={handleLogout} className="cursor-pointer text-sm hover:text-red-600">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-gray-600 flex items-center gap-3 py-2 px-3 my-5 rounded-lg">
          <img src={assets.search_icon} alt="search" className="w-4" />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="bg-transparent border-none outline-none text-white text-xs flex-1 placeholder-gray-400"
            type="text"
            placeholder="Search here.."
          />
        </div>

        {/* Users List */}
        <div className="flex flex-col gap-3 mt-5 max-h-72 overflow-y-scroll scrollbar-hide">
          {filteredUsers.map((user, index) => (
            <div
              onClick={() => handleUserSelect(user)}
              key={user._id}
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                selectedUser?._id === user._id ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              <img 
                src={user.avatar || assets.profile_img} 
                alt="profile" 
                className="w-9 h-9 rounded-full object-cover" 
              />
              <div className="flex flex-col flex-1">
                <p className="text-sm font-medium text-white">{user.fullName}</p>
                <span className={`text-xs ${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-gray-400'}`}>
                  {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                </span>
              </div>
              {unseenMessages[user._id] > 0 && (
                <div className="bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unseenMessages[user._id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Chat Container Component
  const renderChatContainer = () => (
    <div className="flex-1">
      {selectedUser ? (
        <div className="chat-container bg-gray-800 text-white flex flex-col h-screen">
          {/* Header */}
          <div className="chat-user flex items-center gap-3 py-3 px-6 border-b border-gray-600">
            <img
              onClick={() => setSelectedUser(null)}
              src={assets.arrow_icon}
              alt="back"
              className="md:hidden max-w-7 cursor-pointer hover:opacity-70"
            />
            <img 
              src={selectedUser.avatar || assets.profile_img} 
              alt="profile" 
              className="w-9 h-9 rounded-full object-cover" 
            />
            <div className="flex flex-col flex-1">
              <p className="text-lg font-medium text-white flex items-center gap-2">
                {selectedUser.fullName}
                {onlineUsers.includes(selectedUser._id) && (
                  <img src={assets.green_dot} alt="online" className="w-3" />
                )}
              </p>
              <p className="text-xs text-gray-400">
                {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
              </p>
            </div>
            <img src={assets.help_icon} alt="help" className="w-5 cursor-pointer hover:opacity-70" />
          </div>

          {/* Messages */}
          <div className="chat-msg flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={msg._id} className={`flex mb-4 ${msg.senderId === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${msg.senderId === currentUser._id ? 'order-2' : 'order-1'}`}>
                  {msg.image ? (
                    <img 
                      src={msg.image} 
                      alt="shared" 
                      className="rounded-lg max-w-full cursor-pointer hover:opacity-90" 
                      onClick={() => window.open(msg.image)}
                    />
                  ) : (
                    <div className={`p-3 rounded-lg ${
                      msg.senderId === currentUser._id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  )}
                  <div className={`flex items-center gap-2 mt-1 ${msg.senderId === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                    <img
                      src={msg.senderId === currentUser._id ? (currentUser.avatar || assets.profile_img) : (selectedUser.avatar || assets.profile_img)}
                      alt="avatar"
                      className="w-4 h-4 rounded-full"
                    />
                    <span className="text-xs text-gray-400">{formatMessageTime(msg.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollEnd}></div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="chat-input flex items-center gap-3 px-6 py-3 bg-gray-700">
            <input
              onChange={(e) => setChatInput(e.target.value)}
              value={chatInput}
              className="flex-1 border-none outline-none bg-transparent text-white placeholder-gray-400"
              type="text"
              placeholder="Send a message"
            />
            <input onChange={handleSendImage} type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image" className="cursor-pointer hover:opacity-70">
              <img src={assets.gallery_icon} alt="gallery" className="w-5" />
            </label>
            <button type="submit" className="cursor-pointer hover:opacity-70">
              <img src={assets.send_button} alt="send" className="w-5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-welcome bg-gray-800 text-white flex flex-col items-center justify-center h-screen">
          <img src={assets.logo_icon} alt="logo" className="w-16 mb-4" />
          <p className="text-2xl font-medium text-gray-300">Chat anytime, anywhere</p>
          <p className="text-gray-500 mt-2">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );

  // Right Sidebar Component
  const renderRightSidebar = () => (
    selectedUser && (
      <div className="right-sidebar bg-gray-900 text-white h-screen overflow-y-auto w-1/4 min-w-64">
        <div className="pt-16 text-center px-5">
          <img 
            src={selectedUser.avatar || assets.profile_img} 
            alt="profile" 
            className="w-28 h-28 rounded-full mx-auto object-cover" 
          />
          <h3 className="text-lg font-medium flex items-center gap-2 justify-center my-2">
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) && (
              <img src={assets.green_dot} alt="online" className="w-3" />
            )}
          </h3>
          <p className="text-sm text-gray-400 max-w-56 mx-auto">
            {selectedUser.bio || 'No bio available'}
          </p>
        </div>
        
        <hr className="border-gray-600 my-5" />
        
        <div className="px-5">
          <p className="text-white font-medium mb-3">Media</p>
          {msgImages.length > 0 ? (
            <div className="max-h-60 overflow-y-scroll grid grid-cols-3 gap-2">
              {msgImages.map((url, index) => (
                <img
                  onClick={() => window.open(url)}
                  key={index}
                  src={url}
                  alt="media"
                  className="w-16 h-16 rounded cursor-pointer hover:opacity-80 object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No media shared yet</p>
          )}
        </div>
        
        <div className="px-5 mt-10">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded-lg w-full transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );

  // Main Layout
  return (
    <div className="chat-app flex h-screen bg-gray-900">
      {renderSidebar()}
      {renderChatContainer()}
      {renderRightSidebar()}
    </div>
  );
};

export default ChatApp;
