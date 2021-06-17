// ==UserScript==
// @name         YouTube Ad skipper PLUS
// @name:ja      youtube自動広告スキップ+
// @namespace    https://greasyfork.org/users/732692-wildlion
// @version      1.2.0
// @description  Auto ad skipper with some additional function for youtube
// @description:ja youtubeの広告の自動スキップとおまけ機能
// @author       WildLion
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL https://github.com/Vyasdev217/Misc-proj/raw/main/Userscripts/YouTube%20Ad%20skipper%20PLUS.user.js
// @updateURL https://greasyfork.org/scripts/421522-youtube-ad-skipper-plus/code/YouTube%20Ad%20skipper%20PLUS.user.js
// ==/UserScript==

var WL_YTASP = true;

var pbs = document.createElement("INPUT");
pbs.type="number";
pbs.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;/*-moz-appearance: textfield;*/width:8vw;text-align: center;font-size:auto;/*pointer-events: none;*/";
pbs.step=0.1;
pbs.min=0;
pbs.value=1.0;
pbs.addEventListener("change",function(){if(pbs.value>0){document.getElementsByTagName("video")[0].playbackRate = pbs.value;}else{pbs.value=1;document.getElementsByTagName("video")[0].playbackRate = pbs.value;}});

document.getElementById('center').appendChild(pbs);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
      if (document.contains(document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0])) {
          document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
      }
      if (document.contains(document.getElementsByClassName('ytp-ad-overlay-close-button')[0])) {
          document.getElementsByClassName('ytp-ad-overlay-close-button')[0].click();
      }
      document.getElementsByTagName("video")[0].playbackRate = pbs.value;
  });
});
const config = {childList:true,subtree:true};
observer.observe(document.body, config);
