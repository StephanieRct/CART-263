"use strict";

/*****************

SPY PROFILE GENERATOR
PIPPIN BARR

GENERATES A RANDOMIZED SPY PROFILE FOR THE USER, AND PASSWORD PROTECTS IT

******************/

let spyProfile = {
  name: '**REDACTED**',
  alias: '**REDACTED**',
  secretWeapon: '**REDACTED**',
  password: '**REDACTED**'
}

let tarotData = undefined;
let objectData = undefined;
let instrumentData = undefined;

function preload() {

  tarotData = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json');
  instrumentData = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json');
  objectData = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem('spy-profile-data'));

  if (data !== null) {

    let password = prompt(`Agent! What is your password??`);
    if (password === data.password){

      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  }
  else {
    generateSpyProfile();
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt('Agent! What is your name?!');

  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;

  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`,JSON.stringify(spyProfile));
}

function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  push();
  textFont('courier, monospace');
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 100, 100);
  pop();

}
