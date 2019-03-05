/*jshint esversion: 9 */
/* ########################################
    ...
*/
import Typed from 'typed.js';

let pickEnglish = document.getElementById("flagUK");
let pickGerman = document.getElementById("flagDE");
let closePage = document.getElementById("close");
let popUpSite = document.getElementById("siteFullScreen");


let userLang = navigator.language || navigator.userLanguage;
let siteLanguage = null;



/**
 * Display the correct language which the user picked
 * @param  {[string]} lang [language code]
 * @return {[type]}      [null]
 */
const updateSiteLanguage = lang => {
  fetch('./translations.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
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
  strings: ['CODER', 'WEB DEVELOPER', '📷-grapher'],
  typeSpeed: 110,
  backDelay: 3000,
  backSpeed: 40,
  loop: true
});

/**
 * Leave fullscreen mode
 * @return {[type]} [null]
 */
const exitFullscreen = () => {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  popUpSite.classList.toggle("popUpSiteClose");
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
  closePage.addEventListener("click", () => {
    exitFullscreen();
  });
};


//Show entire DOM
enterFullscreen(document.body);
