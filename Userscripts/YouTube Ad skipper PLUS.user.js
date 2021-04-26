// ==UserScript==
// @name         YouTube Ad skipper PLUS
// @name:ja      youtube自動広告スキップ+
// @namespace    https://greasyfork.org/users/732692-wildlion
// @version      1.0.3
// @description  Auto ad skipper with some additional function for youtube
// @description:ja youtubeの広告の自動スキップとおまけ機能
// @author       WildLion
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL https://github.com/Vyasdev217/Misc-proj/raw/main/Userscripts/YouTube%20Ad%20skipper%20PLUS.user.js
// @updateURL https://greasyfork.org/scripts/421522-youtube-ad-skipper-plus/code/YouTube%20Ad%20skipper%20PLUS.user.js
// ==/UserScript==

var enabled = true;
document.getElementById('start').insertAdjacentHTML('beforeend', '<div id="adskipperbtn">(Ad skipper enabled)</div>');

var minusbtn = document.createElement("BUTTON");
var Minusbtn = document.createElement("BUTTON");
var pbs = document.createElement("INPUT");
var Plusbtn = document.createElement("BUTTON");
var plusbtn = document.createElement("BUTTON");

var speedDiv = document.createElement("DIV");


pbs.type="number";
pbs.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;/*-moz-appearance: textfield;*/text-align: center;font-size:25px;width:8%;/*pointer-events: none;*/";
pbs.step=0.1;
pbs.min=0;

minusbtn.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;font-size:20px";
plusbtn.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;font-size:20px";
Minusbtn.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;font-size:15px";
Plusbtn.style="background-color: black;color: white;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden;outline:none;font-size:15px";
minusbtn.innerHTML = "-0.5";
Minusbtn.innerHTML = "-0.1";
pbs.value=1.0;
Plusbtn.innerHTML = "+0.1";
plusbtn.innerHTML = "+0.5";

speedDiv.appendChild(minusbtn);
speedDiv.appendChild(Minusbtn);
document.getElementById("center").appendChild(pbs);
speedDiv.appendChild(Plusbtn);
speedDiv.appendChild(plusbtn);

pbs.addEventListener("change",function(){if(pbs.value>0){document.getElementsByTagName("video")[0].playbackRate = pbs.value;}else{pbs.value=1;document.getElementsByTagName("video")[0].playbackRate = pbs.value;}});

minusbtn.addEventListener("click",function(){
	pbs.stepDown(5);
	document.getElementsByTagName("video")[0].playbackRate = pbs.value;
});

plusbtn.addEventListener("click",function(){
	pbs.stepUp(5);
	document.getElementsByTagName("video")[0].playbackRate = pbs.value;
});

Minusbtn.addEventListener("click",function(){
	pbs.stepDown(1);
	document.getElementsByTagName("video")[0].playbackRate = pbs.value;
});

Plusbtn.addEventListener("click",function(){
	pbs.stepUp(1);
	document.getElementsByTagName("video")[0].playbackRate = pbs.value;
});

//Ad skipper on/off button
document.getElementById('adskipperbtn').style.display='none';
document.getElementById('adskipperbtn').addEventListener('mouseover', function () {
  document.getElementById('adskipperbtn').innerText = (enabled) ? 'Click to disable' : 'Click to enable';
});

document.getElementById('adskipperbtn').addEventListener('mouseout', function () {
  document.getElementById('adskipperbtn').innerText = (enabled) ? '(Ad skipper enabled)' : '(Ad skipper disabled)';
});

document.getElementById('adskipperbtn').addEventListener('click', function () {
  enabled = (enabled) ? false : true;
  document.getElementById('adskipperbtn').innerText = (enabled) ? '(Ad skipper enabled)' : '(Ad skipper disabled)';
});

document.getElementById('adskipperbtn').style.fontSize='large';
document.getElementById('adskipperbtn').style.background='#111111';
document.getElementById('adskipperbtn').style.color='white';

//Ad skipper and speed setter
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (enabled) {
        if (document.contains(document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0])) {
            document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
        }
        if (document.contains(document.getElementsByClassName('ytp-ad-overlay-close-button')[0])) {
            document.getElementsByClassName('ytp-ad-overlay-close-button')[0].click();
        }
        document.getElementsByTagName("video")[0].playbackRate = pbs.value;
    }
  });
});
const config = {childList:true,subtree:true};
observer.observe(document.body, config);

