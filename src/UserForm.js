

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';
import { db } from './firebase-config'; // Path might need adjustment based on your project structure
import { collection, addDoc } from 'firebase/firestore';

function UserForm() {
    const gitHubUsername = ''
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        linkedin: '',
        github: '',
        behance: '',
        dribbble: ''
    });
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchGitHubData = async (username) => {
        try {
            const gitHubUsername = username.match(/\/([^\/]+)$/)[1];
            const response = await axios.get(`https://myfunctionappapi2212.azurewebsites.net/api/githubuserreposfunction`, {
                params: { username: gitHubUsername }
            });
            setUserDetails(response.data); // Set the fetched details
            setError(''); // Clear any previous errors
    
            // Store the data in Firestore
            await addDoc(collection(db, "githubRepos"), {
                username: gitHubUsername,
                repos: response.data,
                timestamp: new Date() // Optional: store the timestamp of when the data was saved
            });
        } catch (error) {
            console.error('Error:', error);
            setUserDetails(null);
            setError('Failed to fetch GitHub details. Make sure the GitHub URL is correct.');
        }
    };
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('User Details:', formData);
    
        if (formData.github) {
            // Extract the username from the GitHub URL
            const urlParts = formData.github.split('/');
            const username = urlParts[urlParts.length - 1];  // Assuming URL ends with the username
    
            // Fetch data using the GitHub username
            fetchGitHubData(formData.github);
    
            // Store formData in Firestore against the GitHub username
            try {
                await addDoc(collection(db, "userProfiles"), {
                    username: username,  // Store username as a key
                    profileData: formData,  // Store all formData
                    timestamp: new Date()  // Optional: Store the current timestamp
                });
                console.log('Data saved successfully!');
            } catch (error) {
                console.error("Error adding document: ", error);
                setError('Failed to save user data.');
            }
    
            // Navigate to the portfolio page with the username as a URL parameter
            navigate(`/portfolio/${username}`);
        } else {
            setError('Please enter a GitHub URL.');
        }
    };
    

    return (
        <div>

    <div className="page-container">
    <header className="site-header">
        <h1 className="site-title">Automated Portfolio Builder</h1>
        <nav className="navbar">
            <ul>
                <li><a id="aid" href="/chat">login In/Sign Up</a></li>
            </ul>
        </nav>
    </header>
    <div className="form-container">
        <div className="form-header">
            <h1>Let's Build Your Portfolio</h1>
            {/* <p>Ready to learn more about our services and how we can help you? Schedule a no-obligation consultation with us.</p> */}
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            </div>

            <div className="input-group">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required/>
            </div>

            <div className="input-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>

            <div className="input-group">
                <label>Targeted Job Title:</label>
                <input type="text" name="job" value={formData.job} onChange={handleChange} required/>
            </div>

            <div className="input-group">
                <label>GitHub Link:</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} required/>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</div>
            {userDetails && (
                <div>
                    {/* Render GitHub user details here */}
                    <h3>GitHub User Details:</h3>
                    {console.log(typeof userDetails)}
                    {console.log("User details:", userDetails)}
                    <p>Name: {userDetails[0].name}</p>
                    {/* <p>Bio: {userDetails.bio}</p> */}
                    {/* Display other details as needed */}
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>

    );

}

export default UserForm;

