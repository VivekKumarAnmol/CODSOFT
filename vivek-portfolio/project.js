// script.js

// Function to load projects from localStorage
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.forEach(project => {
    addProjectToDOM(project.name, project.description);
  });
}

// Function to add project to the DOM
function addProjectToDOM(projectName, projectDescription) {
  const projectItem = document.createElement('li');
  projectItem.className = 'project-item';

  const nameElement = document.createElement('h3');
  nameElement.className = 'project-name';
  nameElement.textContent = projectName;

  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'project-description';
  descriptionElement.textContent = projectDescription;

  const editButton = document.createElement('button');
  editButton.className = 'edit-button';
  editButton.textContent = 'Edit';
  editButton.onclick = function () {
    editProject(projectItem, projectName, projectDescription);
  };

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    projectItem.remove();
    deleteProjectFromStorage(projectName); // Remove from localStorage
  };

  projectItem.appendChild(nameElement);
  projectItem.appendChild(descriptionElement);
  projectItem.appendChild(editButton);
  projectItem.appendChild(deleteButton);

  document.getElementById('project-list').appendChild(projectItem);
}

// Function to delete project from localStorage
function deleteProjectFromStorage(projectName) {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const updatedProjects = projects.filter(project => project.name !== projectName);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const projectName = document.getElementById('project-name').value;
  const projectDescription = document.getElementById('project-description').value;

  // Validate input
  if (!projectName || !projectDescription) {
    alert('Please fill in both fields.');
    return;
  }

  // Add project to localStorage
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push({ name: projectName, description: projectDescription });
  localStorage.setItem('projects', JSON.stringify(projects));

  // Add project to DOM
  addProjectToDOM(projectName, projectDescription);

  // Clear input fields
  document.getElementById('project-name').value = '';
  document.getElementById('project-description').value = '';
}

// Function to edit project details
function editProject(projectItem, projectName, projectDescription) {
  // Set the input fields with the current project details
  document.getElementById('project-name').value = projectName;
  document.getElementById('project-description').value = projectDescription;

  // Remove the project from the DOM and localStorage
  projectItem.remove();
  deleteProjectFromStorage(projectName);

  // Focus on the name input field
  document.getElementById('project-name').focus();
}

// Event listener for form submission
document.getElementById('project-form').addEventListener('submit', handleFormSubmit);

// Load projects when the page is loaded
window.onload = loadProjects;