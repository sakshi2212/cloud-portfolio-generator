import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase-config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import Modal from 'react-modal';
import './Portfolio.css';  // Assuming your styles will be in Portfolio.css
import { BiCheckCircle } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const downloadPdf = async () => {
  const element = document.body; // or any specific element you want to capture
  const canvas = await html2canvas(element, { scale: 2 }); // Adjusts the resolution of the capture
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'p', // portrait
    unit: 'px',
    format: [canvas.width, canvas.height] // sets PDF size to the same as the canvas
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('portfolio.pdf'); // Saves the PDF with the given name
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function Portfolio() {
    const { username } = useParams(); // This retrieves the username from the URL
    const [repoData, setRepoData] = useState([]);
    const [repos, setRepos] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [predictedSkills, setPredictedSkills] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ name, email, subject, message });
        alert('Message sent!');
    };

    useEffect(() => {
        console.log('useEffect triggered', { username });

        const fetchGitHubData = async () => {
            try {
                const repoQuery = query(
                    collection(db, "githubRepos"),
                    where("username", "==", username),
                    orderBy("timestamp", "desc"),
                    limit(1)
                );

                // const userQuery = query(collection(db, "userProfiles"), where("username", "==", username));

                const userQuery = query(
                    collection(db, "userProfiles"),
                    where("username", "==", username),
                    orderBy("timestamp", "desc"),
                    limit(1)
                );

                // Fetch repository data
                const repoDocs = await getDocs(repoQuery);
                if (!repoDocs.empty) {
                    const repoData = repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setRepoData(repoData);

                    const repos = repoData.flatMap(repo => 
                        repo.repos.map(subRepo => ({
                            id: subRepo.id,
                            icon: BiCheckCircle, // Assuming BiCheckCircle is a valid React component or icon
                            name: subRepo.name,
                            description: subRepo.description || "No description provided.",
                            url: subRepo.html_url
                        }))
                    );
                    
                    console.log(repos); // This will log the flattened array of repo details
                    setRepos(repos);  // Use transformed data directly
                } else {
                    throw new Error('No repository data found.');
                }

                // Fetch user profile data
                const userDocs = await getDocs(userQuery);
                if (!userDocs.empty) {
                    const userData = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
                    setUserData(userData);
                    console.log(JSON.stringify(userData));

                    // Fetch predicted skills based on job title
                    if (userData.profileData.job) {
                        setJobTitle(userData.profileData.job);
                        fetchPredictedSkills(userData.profileData.job);
                    }
                } else {
                    throw new Error('No user data found.');
                }
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err.message);
            }
        };

        if (username) {
            fetchGitHubData();
        } else {
            setError("GitHub username not provided in the URL.");
        }
    }, [username]);  // Dependency array


    const fetchPredictedSkills = async (jobTitle) => {
        console.log("Job title submit triggered"); // Check if this is logged
    
        const requestBody = {
            "Inputs": {
                "data": [
                    {
                        "Job Title": jobTitle
                    }
                ]
            },
            "GlobalParameters": {
                "method": "predict"
            }
        };
    
        const requestHeaders = new Headers({"Content-Type": "application/json"});
    
        // Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
        const apiKey = "yE08yeujiwVzAmzV1HdCminiKLkmQC8F";
        if (!apiKey) {
            throw new Error("A key should be provided to invoke the endpoint");
        }
        requestHeaders.append("Authorization", "Bearer " + apiKey);
    
        // This header will force the request to go to a specific deployment.
        // Remove this line to have the request observe the endpoint traffic rules
        requestHeaders.append("azureml-model-deployment", "sharpbreads4fpj0-1");
    
        // const url = "https://ccproject2-ecsob.eastus2.inference.ml.azure.com/score";
        // const url = "https://cors-anywhere.herokuapp.com/https://ccproject2-ecsob.eastus2.inference.ml.azure.com/score";

        const url = '/score';
    
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: requestHeaders
            });
    
            if (!response.ok) {
                // Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
                console.debug(...response.headers);
                console.debug(response.body);
                throw new Error("Request failed with status code " + response.status);
            }
    
            const result = await response.json();
            setPredictedSkills(result);
            console.log(result);
            setIsOpen(true); // Open the modal to show the result
        } catch (error) {
            console.error("Error fetching predicted skills:", error);
            setError(error.message);
        }
    };

    // fetchPredictedSkills("Software Engineer");
    

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="logo"><a href="index.html">DevFolio</a></h1>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <button onClick={downloadPdf} style={{ position: 'fixed', top: 20, right: 20 }}>
                                Download PDF
                            </button>
                            {/* More links */}
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>

            <div id="hero" className="hero route bg-image">
                <div className="overlay-itro"></div>
                <div className="hero-content display-table">
                    <div className="table-cell">
                        <div className="container">
                            {userData && (
                                <>
                                    <h1 className="hero-title mb-4">I am {userData.profileData.name}</h1>
                                    <p className="hero-subtitle"><span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main id="main">
                <section id="about" className="about-mf sect-pt4 route">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="box-shadow-full">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-5">
                                                    <div className="about-img">
                                                        <img src="./assets/img/testimonial-2.jpg" className="img-fluid rounded b-shadow-a" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-7">
                                                    <div className="about-info">
                                                        {userData && (
                                                            <>
                                                                <p><span className="title-s">Name: </span> <span>{userData.profileData.name}</span></p>
                                                                <p><span className="title-s">Email: </span> <span>{userData.profileData.email}</span></p>
                                                                <p><span className="title-s">Phone: </span> <span>{userData.profileData.phone}</span></p>
                                                                <p><span className="title-s">Job Title: </span> <span>{userData.profileData.job}</span></p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="skill-mf">
                                                <p className="title-s">Skill</p>
                                                <span>HTML</span> <span className="pull-right">85%</span>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>CSS3</span> <span className="pull-right">75%</span>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>PHP</span> <span className="pull-right">50%</span>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>JAVASCRIPT</span> <span className="pull-right">90%</span>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="about-me pt-4 pt-md-0">
                                                <div className="title-box-2">
                                                    <h5 className="title-left">About me</h5>
                                                </div>
                                                <p className="lead">
                                                    Passionate software developer with expertise in building innovative and efficient solutions.
                                                </p>
                                                <p className="lead">
                                                    Skilled in various programming languages and frameworks, I thrive on solving complex problems and continuously learning new technologies.
                                                </p>
                                                <p className="lead">
                                                    Dedicated to delivering high-quality code and creating impactful software.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="services" className="services-mf pt-5 route">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="title-box text-center">
                                    <h3 className="title-a">Projects</h3>
                                    <p className="subtitle-a">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                    <div className="line-mf"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {repos.map(repo => (
                                <div className="col-md-4" key={repo.id}>
                                    <div className="service-box">
                                        <div className="service-ico">
                                            <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                                <span className="ico-circle"><repo.icon /></span>
                                            </a>
                                        </div>
                                        <div className="service-content">
                                            <h2 className="s-title">{repo.name}</h2>
                                            <p className="s-description text-center">{repo.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" className="paralax-mf footer-paralax bg-image sect-mt4 route">
                    <div className="overlay-mf"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="contact-mf">
                                    <div className="box-shadow-full">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="title-box-2">
                                                    <h5 className="title-left">Send Message Us</h5>
                                                </div>
                                                <form onSubmit={handleSubmit} className="php-email-form">
                                                    <div className="row">
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" id="name" placeholder="Your Name" required
                                                                    value={name} onChange={e => setName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" id="email" placeholder="Your Email" required
                                                                    value={email} onChange={e => setEmail(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" id="subject" placeholder="Subject" required
                                                                    value={subject} onChange={e => setSubject(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <textarea className="form-control" rows="5" placeholder="Message" required
                                                                    value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center my-3">
                                                            <button type="submit" className="button button-a button-big button-rouded">Send Message</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="title-box-2 pt-4 pt-md-0">
                                                    <h5 className="title-left">Get in Touch</h5>
                                                </div>
                                                <div className="more-info">
                                                    <p className="lead">
                                                    I’m always excited to connect with like-minded professionals and explore new opportunities. 
                                                    If you have any questions about my work, are interested in collaborating, or just want to say hello, please don’t hesitate to reach out. 
                                                    You can contact me via email or through my social media profiles. I look forward to hearing from you and discussing how we can work together to achieve great things!
                                                    </p>
                                                    <ul className="list-ico">
                                                        {/* <li><span className="bi bi-geo-alt"></span> New York University </li> */}
                                                        {/* <li><span className="bi bi-phone"></span> {userData.profileData.phone}</li>
                                                        <li><span className="bi bi-envelope"></span> {userData.profileData.email}</li> */}
                                                    </ul>
                                                </div>
                                                <div className="socials">
                                                    <ul>
                                                        <li><a href="#"><span className="ico-circle"><i className="bi bi-facebook"></i></span></a></li>
                                                        <li><a href="#"><span className="ico-circle"><i className="bi bi-instagram"></i></span></a></li>
                                                        <li><a href="#"><span className="ico-circle"><i className="bi bi-twitter"></i></span></a></li>
                                                        <li><a href="#"><span className="ico-circle"><i className="bi bi-linkedin"></i></span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Predicted Skills"
            >
                <h2>Predicted Skills</h2>
                {predictedSkills && predictedSkills.Results ? (
                    <p>{predictedSkills.Results[0]}</p>
                ) : (
                    <p>Loading...</p>
                )}
                <button onClick={closeModal}>Close</button>
            </Modal>

        </div>
    );
}

export default Portfolio;

