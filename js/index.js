const body = document.body;

//------------FOOTER--------------

//let footer = document.createElement("footer");
//body.appendChild(footer);
const footer = document.querySelector("footer");

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerHTML = `\u00A9 Jordan Holton ${thisYear}`;
footer.appendChild(copyright);
footer.style.textAlign = "center";
copyright.style.color = "blanchedalmond";

//------------Skills--------------
const skills = ["JavaScript", "HTML", "CSS", "Git", "GitHub"];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

//------------Message Form--------------

//helper function to toggle message section visibility
function toggleMessagesSection() {
  const messageSection = document.getElementById("Messages");
  const messageList = messageSection.querySelector("ul");
  if (messageList.children.length === 0) {
    messageSection.style.display = "none";
  } else {
    messageSection.style.display = "block";
  }
}

toggleMessagesSection();

const messageForm = document.querySelector("form[name=leave_messages]");

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;

  console.log("Name: ", userName);
  console.log("Email: ", userEmail);
  console.log("Message: ", userMessage);

  const messageSection = document.getElementById("Messages");

  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");
  //set the inner HTML
  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a>: <span>${userMessage}</span>`;
  //create edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.className = "edit-btn";
  editButton.type = "button";
  //Add click event listener to edit message
  editButton.addEventListener("click", function () {
    const messageSpan = newMessage.querySelector("span");
    const newText = prompt("Edit your message: ", messageSpan.innerText);
    //update the message
    if (newText !== null) {
      messageSpan.innerText = newText;
    }
  });
  //Append the edit button to the new message
  newMessage.appendChild(editButton);
  //create remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.className = "remove_btn";
  removeButton.type = "button";

  //add click event listener to remove the message
  removeButton.addEventListener("click", function () {
    //find the <li>
    const entry = removeButton.parentNode;
    //remove it
    entry.remove();
    toggleMessagesSection();
  });

  //append the remove button to new message
  newMessage.appendChild(removeButton);

  //apend the new message to message list
  messageList.appendChild(newMessage);

  toggleMessagesSection();

  messageForm.reset();
});

//------------Project Section--------------
fetch("https://api.github.com/users/prejordained/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data from Github. Try again later");
    }
    return response.json();
  })
  .then((repositories) => {
    //repositories = JSON.parse(this.repositories);
    console.log("Repositories: ", repositories);
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    projectList.innerHTML = "";

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      const link = document.createElement("a");
      link.href = repositories[i].html_url;
      link.textContent = repositories[i].name;
      project.appendChild(link);
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    console.error("Error fetching repositiories", error);
    const projectSection = document.getElementById("projects");
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Unable to load project. Try again later.";
    projectSection.appendChild(errorMessage);
  });
