// section variables
const homeSection = document.getElementById('home');
const projectsSection = document.getElementById('projects');
const skillsSection = document.getElementById('skills');
const musicSection = document.getElementById('music');
const aboutSection = document.getElementById('about');
const contactSection = document.getElementById('contact');

const allSections = [
  homeSection,
  projectsSection,
  skillsSection,
  musicSection,
  aboutSection,
  contactSection
];

const sectionsNoHome = document.querySelector('.below-content');

// section specific containers
const skillsIconsContainer = document.querySelector('.skills-container');

const highlight = document.querySelector('.highlight');
const navLinks = document.querySelectorAll('.nav-link');
const homeNavLink = document.getElementById('home-link');

// radio buttons
const aboutRadioButtons = document.querySelectorAll('.radio');
const skillsRadioButtons = document.querySelectorAll('.skills-radio');

type RadioButtons = {
  experience: HTMLElement | null
  interests: HTMLElement | null
  education: HTMLElement | null
  languages: HTMLElement | null
  frameworks: HTMLElement | null
  tools: HTMLElement | null
  databases: HTMLElement | null
}

const radioButtons: RadioButtons = {
  experience: document.getElementById('experience'),
  interests: document.getElementById('interests'),
  education: document.getElementById('education'),
  languages: document.getElementById('languages'),
  frameworks: document.getElementById('frameworks'),
  tools: document.getElementById('tools'),
  databases: document.getElementById('databases')
};

// about cards
const card = {
  experience: document.getElementById('experience-card'),
  interests: document.getElementById('interests-card'),
  education: document.getElementById('education-card')
};

const allCards = [card.experience, card.interests, card.education];

// icons
const languageIcons = [
  document.getElementById('ruby'),
  document.getElementById('js'),
  document.getElementById('ts')
];

const frameworkIcons = [
  document.getElementById('rails'),
  document.getElementById('bootstrap')
];

const toolIcons = [
  document.getElementById('git'),
  document.getElementById('github'),
  document.getElementById('heroku'),
  document.getElementById('html'),
  document.getElementById('css'),
  document.getElementById('sass')
];

const dbIcons = [
  document.getElementById('postgres')
];

const iconGroups = {
  languages: languageIcons,
  frameworks: frameworkIcons,
  tools: toolIcons,
  databases: dbIcons
};

const allIcons = [...languageIcons, ...frameworkIcons, ...toolIcons, ...dbIcons];

// home arrow to top
const homeArrow = document.querySelector('.home-arrow');
const homeArrowIcon = document.getElementById('arrow-icon');


// intersection observer - elements IN viewport

// show home arrow button when sections in view
function homeArrowInView(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      homeArrow.classList.remove('hidden');
    } else if (!entry.isIntersecting) {
      homeArrow.classList.add('hidden');
    }
  })
}

const arrowObserver = new IntersectionObserver(homeArrowInView);
arrowObserver.observe(sectionsNoHome);

// highlight nav when each section is in viewport
function sectionViewChangeNav(entries) {
  entries.map((entry) => {
    if (entry.isintersecting) {
      moveHighlight(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(sectionViewChangeNav);
allSections.forEach(section=> {
  if (section) {
    sectionObserver.observe(section);
  }
});

// widen separation bars
function widenBar(entries){
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('widen');
    }
  })
};

const barObserver = new IntersectionObserver(widenBar);
let dividingBars = document.querySelectorAll('.dividing-bar');
dividingBars.forEach(bar => {
  if (bar) {
    barObserver.observe(bar);
  }
});


// intersection observer - element OUT of viewport

// clear skills container
function clear(entries){
  entries.map((entry)=> {
    if (!entry.isIntersecting) {
      clearFadeExpand()
      skillsRadioButtons.forEach(button => {
        button.removeAttribute('checked');
      });
    }
  })
};

const skillsObserver = new IntersectionObserver(clear);
skillsObserver.observe(skillsIconsContainer);


// navbar select
function moveHighlight(target) {
  // get position and size of clicked link
  const rect = target.getBoundingClientRect();
  // get position of navbar-links container
  const containerRect = target.parentElement.getBoundingClientRect();

  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.left = `${rect.left - containerRect.left}px`;
  highlight.style.top = `${rect.top - containerRect.top}px`;
}

function navLinkClick(link) {
  document.querySelector('.nav-link.active')?.classList.remove('active');
  link.classList.add('active');
  moveHighlight(link);
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinkClick(link);
  });
});

homeArrowIcon.addEventListener('click', () => {
  navLinkClick(homeNavLink);
});

window.addEventListener('DOMContentLoaded', () => {
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) moveHighlight(activeLink);
});


// about cards toggle
aboutRadioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let selectedCard = null;

    if (radioButtons.experience.checked) {
      selectedCard = card.experience;
    } else if (radioButtons.interests.checked) {
      selectedCard = card.interests;
    } else if (radioButtons.education.checked) {
      selectedCard = card.education;
    }

    allCards.forEach((card) => {
      if (card === selectedCard) {
        card.classList.remove('hidden');
        card.classList.add('visible');
      } else {
        card.classList.remove('visible');
        card.classList.add('hidden');
      }
    });
  });
});

// skills icons toggle
function clearFadeExpand() {
  Object.values(iconGroups).forEach(group => {
    group.forEach((icon) => {
      icon.classList.remove('fade');
      icon.classList.remove('expand');
    });
  });
};

skillsRadioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    clearFadeExpand();

    const selected = Object.keys(radioButtons).find(buttonName => radioButtons[buttonName].checked);

    Object.entries(iconGroups).forEach(([group, icons]) => {
      if (group !== selected) {
        icons.forEach((icon) => icon.classList.add('fade'));
      } if (group === selected) {
        icons.forEach((icon) => icon.classList.add('expand'));
      }
    });
  });
});

// music album flip
const albumCards = document.querySelectorAll(".flip-album");

function flipCard() {
  this.classList.toggle("flip");
}

albumCards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
