import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import Portfolio from './Portfolio';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { useUserStore } from './lib/userStore';
import { useChatStore } from './lib/chatStore';
import ChatPage from './components/ChatPage';

function App() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const { chatId } = useChatStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);

    const handleUserDetailsFetched = (details, errorMsg = '') => {
        setUserDetails(details);
        setError(errorMsg);
    };

    function PortfolioWrapper() {
        const { username } = useParams();
        return <Portfolio username={username} />;
    }

    if (isLoading) return <div className="loading">Loading...</div>;

    // return (
    //     <Router>
    //         <div className="App">
    //             <header className="App-header">
    //                 <Routes>
    //                     <Route path="/" element={<UserForm onUserDetailsFetched={handleUserDetailsFetched} />} />
    //                     <Route path="/portfolio/:username" element={<PortfolioWrapper />} />

    //                     <Route path="/chat" element={currentUser ? (
    //                         <>
    //                             <List />
    //                             {chatId && <Chat />}
    //                             {chatId && <Detail />}
    //                         </>
    //                     ) : (
    //                         <Login />
    //                     )} />
    //                 </Routes>
    //             </header>
    //             {userDetails && <UserDetails userDetails={userDetails} />}
    //             {error && <p className="error">{error}</p>}
    //             <Notification />
    //         </div>
    //     </Router>
    // );

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<UserForm onUserDetailsFetched={handleUserDetailsFetched} />} />
                        <Route path="/portfolio/:username" element={<PortfolioWrapper />} />
                        <Route path="/chat" element={<ChatPage />} /> {/* Use ChatPage component */}
                    </Routes>
                </header>
                {userDetails && <UserDetails userDetails={userDetails} />}
                {error && <p className="error">{error}</p>}
                <Notification />
            </div>
        </Router>
    );
}

export default App;
