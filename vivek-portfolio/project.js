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

// Function to handle project form submission
function handleProjectFormSubmit(event) {
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

// Function to load skills from localStorage
function loadSkills() {
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skills.forEach(skill => {
      addSkillToDOM(skill);
  });
}

// Function to add skill to the DOM
function addSkillToDOM(skillName) {
  const skillItem = document.createElement('li');
  skillItem.className = 'skill-item';

  const nameElement = document.createElement('span');
  nameElement.className = 'skill-name';
  nameElement.textContent = skillName;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
      skillItem.remove(); // Remove the skill item from the UI
      deleteSkillFromStorage(skillName); // Remove from localStorage
  };

  skillItem.appendChild(nameElement);
  skillItem.appendChild(deleteButton);

  document.getElementById('skill-list').appendChild(skillItem);
}

// Function to delete skill from localStorage
function deleteSkillFromStorage(skillName) {
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  const updatedSkills = skills.filter(skill => skill !== skillName);
  localStorage.setItem('skills', JSON.stringify(updatedSkills));
}

// Function to handle skill form submission
function handleSkillFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const skillName = document.getElementById('skill-name').value;

  // Validate input
  if (!skillName) {
      alert('Please enter a skill name.');
      return;
  }

  // Add skill to localStorage
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skills.push(skillName);
  localStorage.setItem('skills', JSON.stringify(skills));

  // Add skill to DOM
  addSkillToDOM(skillName);

  // Clear input field
  document.getElementById('skill-name').value = '';
}

// Event listener for project form submission
document.getElementById('project-form').addEventListener('submit', handleProjectFormSubmit);

// Event listener for skill form submission
document.getElementById('skill-form').addEventListener('submit', handleSkillFormSubmit);

// Load projects and skills when the page is loaded
window.onload = function () {
  loadProjects();
  loadSkills();
};
