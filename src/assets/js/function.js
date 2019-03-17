/*jshint esversion: 9 */
/* ########################################
    ...
*/
import Typed from 'typed.js';

let pickEnglish = document.getElementById("flagUK");
let pickGerman = document.getElementById("flagDE");
let popUpSite = document.getElementById("siteFullScreen");
let background = document.getElementById("background");
let menuPhotography = document.getElementById("menuPhotography");
let menuProjects = document.getElementById("menuProjects");
let menuResume = document.getElementById("menuResume");


let userLang = navigator.language || navigator.userLanguage;
let siteLanguage = null;

/**
 * Display the correct language which the user picked
 * @param  {[string]} lang [language code]
 * @return {[type]}      [null]
 */
const updateSiteLanguage = lang => {
  fetch('./translations.json')
    .then((response) => response.json())
    .then((myJson) => {
      Object.keys(myJson).forEach(textField => {
        let transField = document.getElementById(textField);
        if(transField != null) transField.innerHTML = myJson[textField][lang];
      });
  });
};

/**
 * Change the users language
 * @param  {[string]} lang [language code]
 */
const pickLanguage = lang => {
  siteLanguage = lang;
  if(lang === "de") {
    pickEnglish.classList.remove("picked");
    pickGerman.classList.add("picked");
  } else {
    pickGerman.classList.remove("picked");
    pickEnglish.classList.add("picked");
  }
  updateSiteLanguage(lang);
};

//Set sitelanguage to language of user
if(userLang.startsWith("de-")) {
  pickLanguage("de");
} else {
  pickLanguage("en");
}


//Right-top language symbols to change the global language
pickGerman.addEventListener("click", e => {
  pickLanguage("de");
});

pickEnglish.addEventListener("click", e => {
  pickLanguage("en");
});


//Title animation Typed.js
const TYPED = new Typed('#typed', {
  strings: ['CODER', 'WEB DEVELOPER'],
  typeSpeed: 110,
  backDelay: 3000,
  backSpeed: 40,
  loop: true
});

/**
 * Is fullscreen mode?
 * @return {[boolean]} [true = fullscreen, false = not fullscreen]
 */
const isFullscreen = () => {
  if (
    document.fullscreenElement || /* Standard syntax */
    document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
    document.mozFullScreenElement ||/* Firefox syntax */
    document.msFullscreenElement /* IE/Edge syntax */
  ) { return true; }
  return false;
};


/**
 * Leave fullscreen mode
 * @return {[type]} [null]
 */
const exitFullscreen = () => {
  if(isFullscreen()) {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    popUpSite.classList.remove('big');
  }
  popUpSite.classList.remove("popUpSiteOpen");
};

/**
 * Go into fullscreen mode
 * @param  {[DOMElement]} element Element to show in fullscreen
 * @return {[type]}         [null]
 */
const enterFullscreen = (element) => {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  //Add exit page functionality
  document.getElementById("close").addEventListener("click", () => {
    exitFullscreen();
  }, true);
};

/**
 * Load subpages and add close button and translate it to the current site language
 * @param  {[string]} file [Filename with filetype]
 * @return {[type]}      [null]
 */
const loadSubPage = file => {
  fetch('./' + file)
    .then((response) => response.text())
    .then((subpage) => {
      popUpSite.innerHTML = subpage;
      popUpSite.classList.add("popUpSiteOpen");
      document.getElementById("close").addEventListener("click", () => {
        exitFullscreen();
      });
      updateSiteLanguage(siteLanguage);
    });
};

menuPhotography.addEventListener("click", () => {
  popUpSite.classList.add('big');
  loadSubPage("photography.html");
  enterFullscreen(document.body);
});

menuProjects.addEventListener("click", () => {
  loadSubPage("projects.html");
});

menuResume.addEventListener("click", () => {
  loadSubPage("resume.html");
});
