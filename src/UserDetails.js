import React from 'react';

function UserDetails({ userDetails, error }) {
    if (error) {
        return <p>{error}</p>;
    }

    if (!userDetails) {
        return null; // or a placeholder message like 'No details to display'
    }

    return (
        <div>
            <h3>GitHub User Details:</h3>
            <p>Name: {userDetails.name}</p>
            <p>Username: {userDetails.login}</p>
            <p>Bio: {userDetails.bio}</p>
            {/* Add other details you want to display */}
        </div>
    );
}

export default UserDetails;