// src/components/ChatPage.jsx
import React from 'react';
import { useUserStore } from '../lib/userStore';
import { useChatStore } from '../lib/chatStore';
import List from './list/List';
import Chat from './chat/Chat';
import Detail from './detail/Detail';
import Login from './login/Login';
import Notification from './notification/Notification';
import './ChatPage.css';

const ChatPage = () => {
    const { currentUser } = useUserStore();
    const { chatId } = useChatStore();

    if (!currentUser) {
        return <Login />;
    }

    // return (
    //     <div className="chat-page">
    //         <List />
    //         {chatId && <Chat />}
    //         {chatId && <Detail />}
    //     </div>
    // );

    return (
        <div className="container1">
          {currentUser ? (
            <>
              <List />
              {chatId && <Chat />}
              {/* console.log(chat done next detail) */}
              {chatId && <Detail />}
            </>
          ) : (
            
            <Login />
            
          )}
          <Notification />
          {/* console.log(login done now notification) */}
    
        </div>
      );
};

export default ChatPage;
