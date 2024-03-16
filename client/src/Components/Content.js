import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Content.css';
import img from './Main/assets/a.jpg'; 
import img1 from './Main/assets/img.png'; // Adjust the path to your image files
import img2 from './Main/assets/c.png'; // Adjust the path to your image files
import imgEmbedded from './Main/assets/e.jpg'; // Adjust the path to your image files
import imgDataScience from './Main/assets/d.jpg'; // Adjust the path to your image files
import imgIot from './Main/assets/i.png'; // Adjust the path to your image files
import imgWebDev from './Main/assets/w.png'; // Adjust the path to your image files

const Content = () => {
  const [projects, setProjects] = useState([]);
  const [allDomains, setAllDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/getprojects');
        const data = await response.json();

        const uniqueDomains = ['All', 'Embedded Systems', 'Data Science', 'Internet of Things', 'Artificial Intelligence', 'Web Development'];
        setAllDomains(uniqueDomains);
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDomainClick = (domain) => {
    setSelectedDomain((prevDomain) => (prevDomain === domain ? null : domain));
  };

  const filteredProjects = selectedDomain
    ? projects.filter((project) => (selectedDomain === 'All' ? true : project.domain === selectedDomain))
    : projects;

  return (
    <>
      <div className='content-container'>
        <h1 align="center"> CURRENT PROJECTS </h1>
        // Inside the return statement of your Content component
        <div className='domain-filter'>
          <p>Filter by Domain:</p>
          <div className="options">
          {allDomains.map((domain) => (
          <span
          key={domain}
          onClick={() => handleDomainClick(domain)}
          className={`${styles.domainButton} ${selectedDomain === domain ? styles.selectedDomain : ''}`}
        >
          <img src={getImageForDomain(domain)} alt={domain} className="domain-img" />
        
        <span className="domain-text">{domain}</span>
      </span>
    ))}
  </div>
</div>

        <table className='table'>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PROJECT TITLE</th>
              <th>DOMAIN</th>
              <th>UPLOADED DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/project/${project._id}`}>{project.title}</Link>
                </td>
                <td>{project.domain}</td>
                <td>{new Date(project.uploadedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

function getImageForDomain(domain) {
  switch (domain.toLowerCase()) {
    case 'all':
      return img;
    case 'artificial intelligence':
      return img1;
    case 'cyber security':
      return img2;
    case 'embedded systems':
      return imgEmbedded;
    case 'data science':
      return imgDataScience;
    case 'internet of things':
      return imgIot;
    
    case 'web development':
      return imgWebDev;
    default:
      return ''; 
  }
}

export default Content;

