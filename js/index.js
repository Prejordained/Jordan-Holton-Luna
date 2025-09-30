const body = document.body;

//------------FOOTER--------------

let footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

footer = document.querySelector("footer");
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
