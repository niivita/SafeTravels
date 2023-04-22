import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import "./Button.css";

const ChatroomButton = () => {
    console.log("form fill")
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Link to="/chat">
                <button className="btn">
                    Chatroom
                </button>
            </Link>
        )
    );
};

export default ChatroomButton;