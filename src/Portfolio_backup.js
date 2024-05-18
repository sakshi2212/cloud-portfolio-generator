


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from './firebase-config';
// import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import './Portfolio.css';  // Assuming your styles will be in Portfolio.css
// import work1 from './assets/img/work-1.jpg';
// import work2 from './assets/img/work-2.jpg';
// import work3 from './assets/img/work-3.jpg';
// import work4 from './assets/img/work-4.jpg';
// import work5 from './assets/img/work-5.jpg';
// import work6 from './assets/img/work-6.jpg';
// import { BiBriefcase, BiCheckCircle, BiBarChart, BiCamera, BiSun, BiCalendar, BiCodeBranch } from 'react-icons/bi';
// import heroBackground from './assets/img/hero-bg.jpg';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const downloadPdf = async () => {
//   const element = document.body; // or any specific element you want to capture
//   const canvas = await html2canvas(element, {
//     scale: 2 // Adjusts the resolution of the capture
//   });
//   const imgData = canvas.toDataURL('image/png');

//   const pdf = new jsPDF({
//     orientation: 'p', // portrait
//     unit: 'px',
//     format: [canvas.width, canvas.height] // sets PDF size to the same as the canvas
//   });

//   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//   pdf.save('portfolio.pdf'); // Saves the PDF with the given name
// };


// const services = [
//   { id: 1, icon: BiBriefcase, title: "Web Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." },
//   { id: 2, icon: BiCheckCircle, title: "Web Development", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." },
//   { id: 3, icon: BiBarChart, title: "Photography", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." },
//   { id: 4, icon: BiCamera, title: "Responsive Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." },
//   { id: 5, icon: BiSun, title: "Graphic Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." },
//   { id: 6, icon: BiCalendar, title: "Marketing Services", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia, provident vitae! Magni tempora perferendis eum non provident." }
// ];

// const works = [
//   { id: 1, image: work1, title: 'Lorem impsum dolor', category: 'Web Design', date: '18 Sep. 2018' },
//   { id: 2, image: work2, title: 'Loreda Cuno Nere', category: 'Web Design', date: '18 Sep. 2018' },
//   { id: 3, image: work3, title: 'Mavrito Lana Dere', category: 'Web Design', date: '18 Sep. 2018' },
//   { id: 4, image: work4, title: 'Bindo Laro Cado', category: 'Web Design', date: '18 Sep. 2018' },
//   { id: 5, image: work5, title: 'Studio Lena Mado', category: 'Web Design', date: '18 Sep. 2018' },
//   { id: 6, image: work6, title: 'Studio Big Bang', category: 'Web Design', date: '18 Sep. 2017' }
// ];

// // function Navbar() {
// //     return (
// //         <nav className="black navbar navbar-expand-lg fixed-top">
// //             <a className="navbar-brand" href="index.html">Mubeen</a>
// //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
// //                 <span className="navbar-toggler-icon"></span>
// //             </button>
// //             <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
// //                 <ul className="navbar-nav">
// //                     <li className="nav-item">
// //                         <a className="nav-link" href="index.html">Home</a>
// //                     </li>
// //                     <li className="nav-item">
// //                         <a className="nav-link" href="#about-me">About</a>
// //                     </li>
// //                     <li className="nav-item">
// //                         <a className="nav-link" href="#my-portfolio">Portfolio</a>
// //                     </li>
// //                     <li className="nav-item">
// //                         <a className="nav-link" href="#section-contact">Contact</a>
// //                     </li>
// //                 </ul>
// //             </div>
// //         </nav>
// //     );
// // }

// function Portfolio() {
//     const { username } = useParams(); // This retrieves the username from the URL
//     console.log('useEffect triggered not', { username });
//     // const [repoData, setRepoData] = useState(null);
//     // const [userData, setUserData] = useState(null);
//     // const [error, setError] = useState('');
//     // const [repos, setRepos] = useState([]);

//     // useEffect(() => {
//     //     const fetchGitHubData = async () => {
//     //         try {
//     //             // const repoQuery = query(collection(db, "githubRepos"), where("username", "==", username));
//     //             const repoQuery = query(
//     //                 collection(db, "githubRepos"),
//     //                 where("username", "==", username),
//     //                 orderBy("timestamp", "desc"), // Order by timestamp descending to get the latest
//     //                 limit(1) // Get only the latest document
//     //             );

//     //             const userQuery = query(collection(db, "userProfiles"), where("username", "==", username));

//     //             // Fetch repository data
//     //             const repoDocs = await getDocs(repoQuery);
//     //             console.log(JSON.stringify(repoDocs));

//     //             if (!repoDocs.empty) {
//     //                 // setRepoData(repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     //                 // console.log(JSON.stringify(repoData));
                    
//     //                 // setRepos(repoData.map((repos, index) => ({
//     //                 //     id: repos.id, // Ensure each repo has an ID
//     //                 //     icon: BiCheckCircle, // Default icon, could vary based on repo content
//     //                 //     title: repos.name,
//     //                 //     description: repos.description || "No description provided.",
//     //                 //     url: repos.html_url
//     //                 // })));
//     //                 // console.log(JSON.stringify(repos));

//     //                 const repoData = repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     //                   // Set state for future use or re-renders
//     //                 console.log(JSON.stringify(repoData));  // Should log correct data now
                    
//     //                 const repos = repoData.map((repo, index) => ({
//     //                     id: repo.id, // Ensure each repo has an ID
//     //                     icon: BiCheckCircle, // Default icon, could vary based on repo content
//     //                     title: repo.name,
//     //                     description: repo.description || "No description provided.",
//     //                     url: repo.html_url
//     //                 }));
//     //                 console.log(JSON.stringify(repos));

//     //                 setRepos(repos);  // Set transformed repo data for use in the component
//     //                 setRepoData(repoData);

//     //             } else {
//     //                 throw new Error('No repository data found.');
//     //             }
                

//     //             // Fetch user profile data
//     //             const userDocs = await getDocs(userQuery);
//     //             if (!userDocs.empty) {
//     //                 setUserData(userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]);
//     //             } else {
//     //                 throw new Error('No user data found.');
//     //             }
//     //         } catch (err) {
//     //             console.error("Error fetching data: ", err);
//     //             setError(err.message);
//     //         }
//     //     };

//     //     if (username) {
//     //         fetchGitHubData();
//     //     } else {
//     //         setError("GitHub username not provided in the URL.");
//     //     }
//     // }, [username]);

//     //usefull code
//     useEffect(() => {
//         console.log('useEffect triggered', { username });
//         const fetchGitHubData = async () => {
//             try {
//                 const repoQuery = query(
//                     collection(db, "githubRepos"),
//                     where("username", "==", username),
//                     orderBy("timestamp", "desc"),
//                     limit(1)
//                 );
    
//                 const userQuery = query(collection(db, "userProfiles"), where("username", "==", username));
    
//                 // Fetch repository data
//                 const repoDocs = await getDocs(repoQuery);
//                 if (!repoDocs.empty) {
//                     const repoData = repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                     setRepoData(repoData);
//                     // setRepoData(repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//                     // console.log(JSON.stringify(repoData));
    
//                     // const repos = repoData.map((repo,index) => ({
//                     //     id: repo.repos[index].id,
//                     //     icon: BiCheckCircle, // This assumes BiCheckCircle is a valid React component or icon
//                     //     title: repo.repos[index].name,
//                     //     description: repo.repos[index].description || "No description provided.",
//                     //     url: repo.repos[index].html_url
//                     // }));
//                     // const repos = repoData.map((repo,index) => {
//                     //     console.log("Current repo:", index);  // This will output each repo object to the console
//                     //     return {
//                     //         id: repo.repos[index].id,
//                     //         icon: BiCheckCircle, // This assumes BiCheckCircle is a valid React component or icon
//                     //         title: repo.repos[index].name,
//                     //         description: repo.repos[index].description || "No description provided.",
//                     //         url: repo.repos[index].html_url
//                     //     };
//                     // });

//                     const repos = repoData.flatMap(repo => 
//                         repo.repos.map(subRepo => ({
//                             id: subRepo.id,
//                             icon: BiCheckCircle, // Assuming BiCheckCircle is a valid React component or icon
//                             name: subRepo.name,
//                             description: subRepo.description || "No description provided.",
//                             url: subRepo.html_url
//                         }))
//                     );
                    
//                     console.log(repos); // This will log the flattened array of repo details

//                     // setRepos(repoData.map((repos, index) => ({
//                     //     id: repos.repos[index].id,
//                     //     icon: BiCheckCircle, // This assumes BiCheckCircle is a valid React component or icon
//                     //     title: repos.repos[index].name,
//                     //     description: repos.repos[index].description || "No description provided.",
//                     //     url: repos.repos[index].html_url
//                     // })));
//                     // console.log(JSON.stringify(repos));
//                     // console.log(JSON.stringify(repos));

//                     setRepos(repos);  // Use transformed data directly
//                     setRepoData(repoData);  // Optionally set repo data for future use
//                 } else {
//                     throw new Error('No repository data found.');
//                 }
    
//                 // Fetch user profile data
//                 const userDocs = await getDocs(userQuery);
//                 if (!userDocs.empty) {
//                     const userData= (userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]);
//                     setUserData(userData)
//                     console.log(JSON.stringify(userData));

//                 } else {
//                     throw new Error('No user data found.');
//                 }
//             } catch (err) {
//                 console.error("Error fetching data: ", err);
//                 setError(err.message);
//             }
//         };
    
//         if (username) {
//             fetchGitHubData();
//         } else {
//             setError("GitHub username not provided in the URL.");
//         }
//     }, [username]);  // Dependency array
//     //usefull code ends
    

//     // return (
//     //     <div className="portfolio-container">
//     //         <Navbar />
//     //         <main className="container-fluid main p-0">
//     //             <section id="about-me" className="container-fluid section-2">
//     //                 <div className="row">
//     //                     <div className="col text-center">
//     //                         <div className="primary-heading">
//     //                             Creative <span className="fw-bold">Work</span>
//     //                         </div>
//     //                         <div className="paragraph mx-auto mt-2">
//     //                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias vitae debitis velit maxime facilis quae maiores optio ut eveniet, aspernatur, cupiditate saepe consequuntur cumque distinctio, error itaque ipsum sunt assumenda!
//     //                         </div>
//     //                         <button className="btn btn-primary">Read More</button>
//     //                     </div>
//     //                 </div>
//     //             </section>
//     //         </main>

//     //         <div>
//     //             <h1>GitHub Repository Details</h1>
//     //             {repo ? (
//     //                 <div>
//     //                     <p><strong>Username:</strong> {repo.username}</p>
//     //                     <p><strong>Repository Data:</strong> {JSON.stringify(repo.repos)}</p>
//     //                 </div>
//     //             ) : (
//     //                 <p>{error || "No repository data found."}</p>
//     //             )}
//     //         </div>
//     //     </div>
//     // );

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle the form submission logic here, e.g., sending data to a server
//         console.log({ name, email, subject, message });
//         alert('Message sent!');
//     };

//     return (
        
//         <div>
//             <header id="header" className="fixed-top">
//                 <div className="container d-flex align-items-center justify-content-between">
//                     <h1 className="logo"><a href="index.html">DevFolio</a></h1>
//                     {/* Navigation */}
//                     <nav id="navbar" className="navbar">
//                         <ul>
//                             <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
//                             <li><a className="nav-link scrollto" href="#about">About</a></li>
//                             <button onClick={downloadPdf} style={{ position: 'fixed', top: 20, right: 20 }}>
//                             Download PDF
//                             </button>
//                             {/* More links */}
//                         </ul>
                        
//                         <i className="bi bi-list mobile-nav-toggle"></i>
//                     </nav>
//                 </div>
//             </header>

//             {/* Hero Section */}
//             {/* <div id="hero" className="hero route bg-image" style={{ backgroundImage: `url(${heroBackground})` }}> */}
//             <div id="hero" className="hero route bg-image">
//                 <div className="overlay-itro"></div>
//                 <div className="hero-content display-table">
//                     <div className="table-cell">
//                         <div className="container">
//                             <h1 className="hero-title mb-4">I am {userData.profileData.name}</h1>
//                             <p className="hero-subtitle"><span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <main id="main">
//       {/* About Section */}
//       <section id="about" className="about-mf sect-pt4 route">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="box-shadow-full">
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="row">
//                                         <div className="col-sm-6 col-md-5">
//                                             <div className="about-img">
//                                                 <img src="./assets/img/testimonial-2.jpg" className="img-fluid rounded b-shadow-a" alt="" />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6 col-md-7">
//                                             <div className="about-info">
//                                                 {/* <p><span className="title-s">Name: </span> <span>{userData}</span></p> */}
//                                                 <p><span className="title-s">Name: </span> <span>{userData.profileData.name}</span></p>
//                                                 {/* <p><span className="title-s">Profile: </span> <span>full stack developer</span></p> */}
//                                                 <p><span className="title-s">Email: </span> <span>{userData.profileData.email}</span></p>
//                                                 <p><span className="title-s">Phone: </span> <span>{userData.profileData.phone}</span></p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="skill-mf">
//                                         <p className="title-s">Skill</p>
//                                         <span>HTML</span> <span className="pull-right">85%</span>
//                                         <div className="progress">
//                                             <div className="progress-bar" role="progressbar" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
//                                         </div>
//                                         <span>CSS3</span> <span className="pull-right">75%</span>
//                                         <div className="progress">
//                                             <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
//                                         </div>
//                                         <span>PHP</span> <span className="pull-right">50%</span>
//                                         <div className="progress">
//                                             <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
//                                         </div>
//                                         <span>JAVASCRIPT</span> <span className="pull-right">90%</span>
//                                         <div className="progress">
//                                             <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="about-me pt-4 pt-md-0">
//                                         <div className="title-box-2">
//                                             <h5 className="title-left">About me</h5>
//                                         </div>
//                                         <p className="lead">
//                                             Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id
//                                             imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla
//                                             porttitor accumsan tincidunt.
//                                         </p>
//                                         <p className="lead">
//                                             Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis
//                                             porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. porttitor at sem.
//                                         </p>
//                                         <p className="lead">
//                                             Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
//                                             Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>


//     <section id="services" className="services-mf pt-5 route">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             <div className="title-box text-center">
//               <h3 className="title-a">Projects</h3>
//               <p className="subtitle-a">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
//               <div className="line-mf"></div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
        
           
//         {repos.map(repo => (
//             <div className="col-md-4" key={repo.id}>
//               <div className="service-box">
//                 <div className="service-ico">
//                   {/* <span className="ico-circle"></span> */}
//                   <a href={repo.url} target="_blank" rel="noopener noreferrer">
//                     <span className="ico-circle"><repo.icon /></span>
//                 </a>
//                 </div>
//                 <div className="service-content">
//                   <h2 className="s-title">{repo.name}</h2>
//                   <p className="s-description text-center">{repo.description}</p>
//                 </div>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>
//     </section>

//     {/* <section id="work" className="portfolio-mf sect-pt4 route">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="title-box text-center">
//                             <h3 className="title-a">Portfolio</h3>
//                             <p className="subtitle-a">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
//                             <div className="line-mf"></div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     {works.map(work => (
//                         <div className="col-md-4" key={work.id}>
//                             <div className="work-box">
//                                 <a href={work.image} data-gallery="portfolioGallery" className="portfolio-lightbox">
//                                     <div className="work-img">
//                                         <img src={work.image} alt="" className="img-fluid" />
//                                     </div>
//                                 </a>
//                                 <div className="work-content">
//                                     <div className="row">
//                                         <div className="col-sm-8">
//                                             <h2 className="w-title">{work.title}</h2>
//                                             <div className="w-more">
//                                                 <span className="w-ctegory">{work.category}</span> / <span className="w-date">{work.date}</span>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-4">
//                                             <div className="w-like">
//                                                 <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section> */}

//         <section id="contact" className="paralax-mf footer-paralax bg-image sect-mt4 route" >
//             <div className="overlay-mf"></div>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="contact-mf">
//                             <div className="box-shadow-full">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="title-box-2">
//                                             <h5 className="title-left">Send Message Us</h5>
//                                         </div>
//                                         <form onSubmit={handleSubmit} className="php-email-form">
//                                             <div className="row">
//                                                 <div className="col-md-12 mb-3">
//                                                     <div className="form-group">
//                                                         <input type="text" className="form-control" id="name" placeholder="Your Name" required
//                                                             value={name} onChange={e => setName(e.target.value)} />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12 mb-3">
//                                                     <div className="form-group">
//                                                         <input type="email" className="form-control" id="email" placeholder="Your Email" required
//                                                             value={email} onChange={e => setEmail(e.target.value)} />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12 mb-3">
//                                                     <div className="form-group">
//                                                         <input type="text" className="form-control" id="subject" placeholder="Subject" required
//                                                             value={subject} onChange={e => setSubject(e.target.value)} />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12">
//                                                     <div className="form-group">
//                                                         <textarea className="form-control" rows="5" placeholder="Message" required
//                                                             value={message} onChange={e => setMessage(e.target.value)}></textarea>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12 text-center my-3">
//                                                     <button type="submit" className="button button-a button-big button-rouded">Send Message</button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="title-box-2 pt-4 pt-md-0">
//                                             <h5 className="title-left">Get in Touch</h5>
//                                         </div>
//                                         <div className="more-info">
//                                             <p className="lead">
//                                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem
//                                                 expedita aperiam aliquid at.
//                                                 Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis
//                                                 mollitia inventore?
//                                             </p>
//                                             <ul className="list-ico">
//                                                 <li><span className="bi bi-geo-alt"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
//                                                 <li><span className="bi bi-phone"></span> (617) 557-0089</li>
//                                                 <li><span className="bi bi-envelope"></span> contact@example.com</li>
//                                             </ul>
//                                         </div>
//                                         <div className="socials">
//                                             <ul>
//                                                 <li><a href="#"><span className="ico-circle"><i className="bi bi-facebook"></i></span></a></li>
//                                                 <li><a href="#"><span className="ico-circle"><i className="bi bi-instagram"></i></span></a></li>
//                                                 <li><a href="#"><span className="ico-circle"><i className="bi bi-twitter"></i></span></a></li>
//                                                 <li><a href="#"><span className="ico-circle"><i className="bi bi-linkedin"></i></span></a></li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </main>

//             {/* Footer */}
//             <footer>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="copyright-box">
//                                 <p>&copy; Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
//                                 <div className="credits">
//                                     Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>

//             {/* Scripts */}
//             {/* Here you would include your scripts or convert them to React components */}
//         </div>
        
//     );
// }

// export default Portfolio;






// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { db } from './firebase-config';
// // import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// // function Portfolio() {
// //     const { username } = useParams(); // This retrieves the username from the URL
// //     const [repoData, setRepoData] = useState(null);
// //     const [userData, setUserData] = useState(null);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchGitHubData = async () => {
// //             try {
// //                 // const repoQuery = query(collection(db, "githubRepos"), where("username", "==", username));
// //                 const repoQuery = query(
// //                     collection(db, "githubRepos"),
// //                     where("username", "==", username),
// //                     orderBy("timestamp", "desc"), // Order by timestamp descending to get the latest
// //                     limit(1) // Get only the latest document
// //                 );

// //                 const userQuery = query(collection(db, "userProfiles"), where("username", "==", username));

// //                 // Fetch repository data
// //                 const repoDocs = await getDocs(repoQuery);
// //                 if (!repoDocs.empty) {
// //                     setRepoData(repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
// //                 } else {
// //                     throw new Error('No repository data found.');
// //                 }
// //                 console.log(repoData);

// //                 // Fetch user profile data
// //                 const userDocs = await getDocs(userQuery);
// //                 if (!userDocs.empty) {
// //                     setUserData(userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]);
// //                 } else {
// //                     throw new Error('No user data found.');
// //                 }
// //             } catch (err) {
// //                 console.error("Error fetching data: ", err);
// //                 setError(err.message);
// //             }
// //         };

// //         if (username) {
// //             fetchGitHubData();
// //         } else {
// //             setError("GitHub username not provided in the URL.");
// //         }
// //     }, [username]);

// //     return (
// //         <div>
// //             <h1>Portfolio for {username}</h1>
// //             {error && <div className="error">{error}</div>}
// //             <div>
// //                 <h2>User Profile</h2>
// //                 {userData ? (
// //                     <div>
// //                         <p>Name: {userData.profileData.name}</p>
// //                         <p>Email: {userData.profileData.email}</p>
// //                         {/* Render other user data as needed */}
// //                     </div>
// //                 ) : (
// //                     <p>Loading user data...</p>
// //                 )}
// //             </div>
// //             <div>
// //                 <h2>GitHub Repositories</h2>
// //                 {repoData ? (
// //                     <ul>
// //                     {repoData.map((repoItem, index) => (
// //                         <li key={index}>
// //                             {/* If `repoItem.repos` is an array of repositories */}
// //                             {repoItem.repos.map((repo, idx) => (
// //                                 <div key={idx}>
// //                                     <p>Repository Name: {repo.name}</p>
// //                                     <p>Description: {repo.description}</p>
// //                                     <p>Html URL: {repo.html_url}</p>
// //                                     {/* Render other repository details as needed */}
// //                                 </div>
// //                             ))}
// //                         </li>
// //                     ))}
// //                 </ul>
// //                 ) : (
// //                     <p>Loading repository data...</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Portfolio;



//2nd iteration 

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from './firebase-config';
// import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import './Portfolio.css';  // Assuming your styles will be in Portfolio.css
// import { BiCheckCircle } from 'react-icons/bi';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const downloadPdf = async () => {
//   const element = document.body; // or any specific element you want to capture
//   const canvas = await html2canvas(element, { scale: 2 }); // Adjusts the resolution of the capture
//   const imgData = canvas.toDataURL('image/png');

//   const pdf = new jsPDF({
//     orientation: 'p', // portrait
//     unit: 'px',
//     format: [canvas.width, canvas.height] // sets PDF size to the same as the canvas
//   });

//   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//   pdf.save('portfolio.pdf'); // Saves the PDF with the given name
// };

// function Portfolio() {
//     const { username } = useParams(); // This retrieves the username from the URL
//     const [repoData, setRepoData] = useState([]);
//     const [repos, setRepos] = useState([]);
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState('');
//     const [jobTitle, setJobTitle] = useState('');
//     const [predictedSkills, setPredictedSkills] = useState([]);

//     // Form state
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle the form submission logic here, e.g., sending data to a server
//         console.log({ name, email, subject, message });
//         alert('Message sent!');
//     };

//     useEffect(() => {
//         console.log('useEffect triggered', { username });

//         const fetchGitHubData = async () => {
//             try {
//                 const repoQuery = query(
//                     collection(db, "githubRepos"),
//                     where("username", "==", username),
//                     orderBy("timestamp", "desc"),
//                     limit(1)
//                 );

//                 // const userQuery = query(collection(db, "userProfiles"), where("username", "==", username));

//                 const userQuery = query(
//                     collection(db, "userProfiles"),
//                     where("username", "==", username),
//                     orderBy("timestamp", "desc"),
//                     limit(1)
//                 );

//                 // Fetch repository data
//                 const repoDocs = await getDocs(repoQuery);
//                 if (!repoDocs.empty) {
//                     const repoData = repoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                     setRepoData(repoData);

//                     const repos = repoData.flatMap(repo => 
//                         repo.repos.map(subRepo => ({
//                             id: subRepo.id,
//                             icon: BiCheckCircle, // Assuming BiCheckCircle is a valid React component or icon
//                             name: subRepo.name,
//                             description: subRepo.description || "No description provided.",
//                             url: subRepo.html_url
//                         }))
//                     );
                    
//                     console.log(repos); // This will log the flattened array of repo details
//                     setRepos(repos);  // Use transformed data directly
//                 } else {
//                     throw new Error('No repository data found.');
//                 }

//                 // Fetch user profile data
//                 const userDocs = await getDocs(userQuery);
//                 if (!userDocs.empty) {
//                     const userData = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
//                     setUserData(userData);
//                     console.log(JSON.stringify(userData));
//                 } else {
//                     throw new Error('No user data found.');
//                 }
//             } catch (err) {
//                 console.error("Error fetching data: ", err);
//                 setError(err.message);
//             }
//         };

//         if (username) {
//             fetchGitHubData();
//         } else {
//             setError("GitHub username not provided in the URL.");
//         }
//     }, [username]);  // Dependency array

//     const handleJobTitleSubmit = async (event) => {
//         console.log('Entererd JobTitle');
//         event.preventDefault();

//         const data = {
//             Inputs: {
//                 data: [
//                     {
//                         "Job Title": userData.profileData.job
//                     }
//                 ]
//             },
//             GlobalParameters: {
//                 method: "predict"
//             }
//         };

//         const body = JSON.stringify(data);

//         const url = 'http://7f7a5623-ac0b-4078-a41d-698e4e400192.eastus2.azurecontainer.io/score';
//         const headers = {
//             'Content-Type': 'application/json'
//         };

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: headers,
//                 body: body
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             setPredictedSkills(result);
//             console.log('Skills fetched');
//             console.log(result);
//         } catch (error) {
//             console.error("Error fetching predicted skills:", error);
//             setError(error.message);
//         }
//     };

//     return (
//         <div>
//             <header id="header" className="fixed-top">
//                 <div className="container d-flex align-items-center justify-content-between">
//                     <h1 className="logo"><a href="index.html">DevFolio</a></h1>
//                     <nav id="navbar" className="navbar">
//                         <ul>
//                             <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
//                             <li><a className="nav-link scrollto" href="#about">About</a></li>
//                             <button onClick={downloadPdf} style={{ position: 'fixed', top: 20, right: 20 }}>
//                                 Download PDF
//                             </button>
//                             {/* More links */}
//                         </ul>
//                         <i className="bi bi-list mobile-nav-toggle"></i>
//                     </nav>
//                 </div>
//             </header>

//             <div id="hero" className="hero route bg-image">
//                 <div className="overlay-itro"></div>
//                 <div className="hero-content display-table">
//                     <div className="table-cell">
//                         <div className="container">
//                             {userData && (
//                                 <>
//                                     <h1 className="hero-title mb-4">I am {userData.profileData.name}</h1>
//                                     <p className="hero-subtitle"><span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <main id="main">
//                 <section id="about" className="about-mf sect-pt4 route">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <div className="box-shadow-full">
//                                     <div className="row">
//                                         <div className="col-md-6">
//                                             <div className="row">
//                                                 <div className="col-sm-6 col-md-5">
//                                                     <div className="about-img">
//                                                         <img src="./assets/img/testimonial-2.jpg" className="img-fluid rounded b-shadow-a" alt="" />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6 col-md-7">
//                                                     <div className="about-info">
//                                                         {userData && (
//                                                             <>
//                                                                 <p><span className="title-s">Name: </span> <span>{userData.profileData.name}</span></p>
//                                                                 <p><span className="title-s">Email: </span> <span>{userData.profileData.email}</span></p>
//                                                                 <p><span className="title-s">Phone: </span> <span>{userData.profileData.phone}</span></p>
//                                                                 <p><span className="title-s">Job Title: </span> <span>{userData.profileData.job}</span></p>
//                                                             </>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="skill-mf">
//                                                 <p className="title-s">Skill</p>
//                                                 <span>HTML</span> <span className="pull-right">85%</span>
//                                                 <div className="progress">
//                                                     <div className="progress-bar" role="progressbar" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
//                                                 </div>
//                                                 <span>CSS3</span> <span className="pull-right">75%</span>
//                                                 <div className="progress">
//                                                     <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
//                                                 </div>
//                                                 <span>PHP</span> <span className="pull-right">50%</span>
//                                                 <div className="progress">
//                                                     <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
//                                                 </div>
//                                                 <span>JAVASCRIPT</span> <span className="pull-right">90%</span>
//                                                 <div className="progress">
//                                                     <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="about-me pt-4 pt-md-0">
//                                                 <div className="title-box-2">
//                                                     <h5 className="title-left">About me</h5>
//                                                 </div>
//                                                 <p className="lead">
//                                                     Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.
//                                                 </p>
//                                                 <p className="lead">
//                                                     Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. porttitor at sem.
//                                                 </p>
//                                                 <p className="lead">
//                                                     Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="services" className="services-mf pt-5 route">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <div className="title-box text-center">
//                                     <h3 className="title-a">Projects</h3>
//                                     <p className="subtitle-a">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
//                                     <div className="line-mf"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             {repos.map(repo => (
//                                 <div className="col-md-4" key={repo.id}>
//                                     <div className="service-box">
//                                         <div className="service-ico">
//                                             <a href={repo.url} target="_blank" rel="noopener noreferrer">
//                                                 <span className="ico-circle"><repo.icon /></span>
//                                             </a>
//                                         </div>
//                                         <div className="service-content">
//                                             <h2 className="s-title">{repo.name}</h2>
//                                             <p className="s-description text-center">{repo.description}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 <section id="contact" className="paralax-mf footer-paralax bg-image sect-mt4 route">
//                     <div className="overlay-mf"></div>
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <div className="contact-mf">
//                                     <div className="box-shadow-full">
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="title-box-2">
//                                                     <h5 className="title-left">Send Message Us</h5>
//                                                 </div>
//                                                 <form onSubmit={handleSubmit} className="php-email-form">
//                                                     <div className="row">
//                                                         <div className="col-md-12 mb-3">
//                                                             <div className="form-group">
//                                                                 <input type="text" className="form-control" id="name" placeholder="Your Name" required
//                                                                     value={name} onChange={e => setName(e.target.value)} />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-md-12 mb-3">
//                                                             <div className="form-group">
//                                                                 <input type="email" className="form-control" id="email" placeholder="Your Email" required
//                                                                     value={email} onChange={e => setEmail(e.target.value)} />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-md-12 mb-3">
//                                                             <div className="form-group">
//                                                                 <input type="text" className="form-control" id="subject" placeholder="Subject" required
//                                                                     value={subject} onChange={e => setSubject(e.target.value)} />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-md-12">
//                                                             <div className="form-group">
//                                                                 <textarea className="form-control" rows="5" placeholder="Message" required
//                                                                     value={message} onChange={e => setMessage(e.target.value)}></textarea>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-md-12 text-center my-3">
//                                                             <button type="submit" className="button button-a button-big button-rouded">Send Message</button>
//                                                         </div>
//                                                     </div>
//                                                 </form>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="title-box-2 pt-4 pt-md-0">
//                                                     <h5 className="title-left">Get in Touch</h5>
//                                                 </div>
//                                                 <div className="more-info">
//                                                     <p className="lead">
//                                                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at.
//                                                         Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis mollitia inventore?
//                                                     </p>
//                                                     <ul className="list-ico">
//                                                         <li><span className="bi bi-geo-alt"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
//                                                         <li><span className="bi bi-phone"></span> (617) 557-0089</li>
//                                                         <li><span className="bi bi-envelope"></span> contact@example.com</li>
//                                                     </ul>
//                                                 </div>
//                                                 <div className="socials">
//                                                     <ul>
//                                                         <li><a href="#"><span className="ico-circle"><i className="bi bi-facebook"></i></span></a></li>
//                                                         <li><a href="#"><span className="ico-circle"><i className="bi bi-instagram"></i></span></a></li>
//                                                         <li><a href="#"><span className="ico-circle"><i className="bi bi-twitter"></i></span></a></li>
//                                                         <li><a href="#"><span className="ico-circle"><i className="bi bi-linkedin"></i></span></a></li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             <footer>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="copyright-box">
//                                 <p>&copy; Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
//                                 <div className="credits">
//                                     Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default Portfolio;




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

        const data = {
            Inputs: {
                data: [
                    {
                        "Job Title": jobTitle
                    }
                ]
            },
            GlobalParameters: {
                method: "predict"
            }
        };

        const body = JSON.stringify(data);

        const url = 'https://cors-anywhere.herokuapp.com/http://7f7a5623-ac0b-4078-a41d-698e4e400192.eastus2.azurecontainer.io/score';
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
                                                    Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.
                                                </p>
                                                <p className="lead">
                                                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. porttitor at sem.
                                                </p>
                                                <p className="lead">
                                                    Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
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
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at.
                                                        Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis mollitia inventore?
                                                    </p>
                                                    <ul className="list-ico">
                                                        <li><span className="bi bi-geo-alt"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
                                                        <li><span className="bi bi-phone"></span> (617) 557-0089</li>
                                                        <li><span className="bi bi-envelope"></span> contact@example.com</li>
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

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="copyright-box">
                                <p>&copy; Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
                                <div className="credits">
                                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Predicted Skills"
            >
                <h2>Predicted Skills</h2>
                {predictedSkills ? (
                    <pre>{JSON.stringify(predictedSkills, null, 2)}</pre>
                ) : (
                    <p>Loading...</p>
                )}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default Portfolio;

