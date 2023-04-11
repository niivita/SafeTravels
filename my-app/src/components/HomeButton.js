import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React from "react";

const FillFormButton = () => {
    console.log("form fill")
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Link to="/">
                <button>
                    Back to Profile
                </button>
            </Link>
        )
    );
};

export default FillFormButton;