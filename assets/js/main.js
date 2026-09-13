const contactIcons = {
  location: "assets/images/icons/location.svg",
  email: "assets/images/icons/email.svg",
  phone: "assets/images/icons/phone.svg",
  instagram: "assets/images/icons/instagram.svg",
  linkedin: "assets/images/icons/linkedin.svg",
  github: "assets/images/icons/github-contact.svg"
};

function updateProfileInfo(profileData) {
  const photo = document.getElementById("profile.photo");
  photo.src = profileData.photo;
  photo.alt = profileData.name;

  document.getElementById("profile.name").innerText = profileData.name;
  document.getElementById("profile.job").innerText = profileData.job;

  const contacts = document.getElementById("profile.contacts");
  const items = profileData.contacts || [];

  contacts.innerHTML = items.map((item) => {
    const icon = contactIcons[item.type] || contactIcons.location;
    const content = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" title="${item.type}">${item.label}</a>`
      : `<span title="${item.type}">${item.label}</span>`;

    return `
      <li class="contact-item contact-${item.type}">
        <img src="${icon}" alt="" aria-hidden="true" />
        ${content}
      </li>
    `;
  }).join("");
}

function updateSoftSkills(profileData) {
  const softSkills = document.getElementById("profile.skills.softSkills");
  softSkills.innerHTML = profileData.skills.softSkills.map((skill) => `<li>${skill}</li>`).join("");
}

function updateHardSkills(profileData) {
  const hardSkills = document.getElementById("profile.skills.hardSkills");
  hardSkills.innerHTML = profileData.skills.hardSkills
    .map((skill) => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`)
    .join("");
}

function updateLanguages(profileData) {
  const languages = document.getElementById("profile.languages");
  languages.innerHTML = profileData.languages.map((language) => `<li>${language}</li>`).join("");
}

function updatePortfolio(profileData) {
  const portfolio = document.getElementById("profile.portfolio");
  portfolio.innerHTML = profileData.portfolio.map((project) => `
    <li>
      <h3 ${project.github ? 'class="github"' : ""}>${project.name}</h3>
      <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.url}</a>
    </li>
  `).join("");
}

function updateConquest(profileData) {
  const conquest = document.getElementById("profile.conquest");
  conquest.innerHTML = profileData.conquest
    .map((item) => `<li><img src="${item.logo}" alt="${item.name}" title="${item.name}"></li>`)
    .join("");
}

function updateEducation(profileData) {
  const education = document.getElementById("profile.education");
  education.innerHTML = profileData.education.map((item) => `
    <li>
      <h3>${item.name}</h3>
      <p class="period">${item.period}</p>
      <p>${item.description}</p>
    </li>
  `).join("");
}

(async () => {
  const profileData = await fetchProfileData();
  updateProfileInfo(profileData);
  updateSoftSkills(profileData);
  updateHardSkills(profileData);
  updateLanguages(profileData);
  updatePortfolio(profileData);
  updateEducation(profileData);
  updateConquest(profileData);
})();
