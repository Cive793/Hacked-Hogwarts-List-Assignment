"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let pureBloodFamilies = [];
let halfBloodFamilies = [];

const Student = {
  image: "",
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  gender: "",
  house: "",
  bloodStatus: "",
  prefect: false,
  inquisitorial: false,
  quidditch: false,
  expelled: false,
};

function start() {
  console.log("start");

  //search button
  document.querySelector(".searchButton").addEventListener("click", buttonDropdown);
  document.querySelector("#searchInput").addEventListener("keyup", getSearchFilterChoice);
  //search button

  getSearchFilterChoice();
  loadJson();
}

//search button dropdown
function buttonDropdown() {
  document.getElementById("searchDropdown").classList.toggle("show");
}

//search button filter choice
function getSearchFilterChoice() {
  //document.querySelectorAll(".searchFilterChoice").forEach((button) => button.addEventListener("click", selectFilter));
}

async function loadJson() {
  const responseStudents = await fetch("https://petlatkea.dk/2021/hogwarts/students.json");
  const dataStudents = await responseStudents.json();

  /* const responseBloodFamilies = await fetch("https://petlatkea.dk/2021/hogwarts/families.json");
  const dataBloodFamilies = await responseBloodFamilies.json(); */

  prepareObjects(dataStudents /* dataBloodFamilies */);
}

function prepareObjects(dataStudents /* dataBloodFamilies */) {
  allStudents = dataStudents.map(prepareObject);
  /* pureBloodFamilies = dataBloodFamilies.pure;
  halfBloodFamilies = dataBloodFamilies.half; */
  console.log(allStudents);

  //buildList(allStudents);
}

function prepareObject(student) {
  const studentObject = Object.create(Student);
  student.img = createImage(student.fullname);
  student.firstName = createFirstName(student.fullname);
  student.middleName = createMiddleName(student.fullname);
  student.lastName = createLastName(student.fullname);
  student.nickName = createNickName(student.fullname);
  student.house = createHouse(student.house);
  student.gender = Student.gender;
  student.bloodStatus = createBloodType(student.lastName);
  //console.log(pureBloodFamilies);

  return student;
}

function createImage(fullname) {}

function createFirstName(fullname) {
  let firstNameOnly;
  firstNameOnly = fullname.trim();
  firstNameOnly = firstNameOnly.split(" ")[0];
  firstNameOnly = firstNameOnly.substring(0, 1).toUpperCase() + firstNameOnly.substring(1).toLowerCase();

  //console.log(firstNameOnly);
  return firstNameOnly;
}

function createMiddleName(fullname) {
  let middleNameOnly;
  middleNameOnly = fullname.trim();
  let numberOfNames = middleNameOnly.split(" ");

  if (fullname.includes('"')) {
    middleNameOnly = null;
  } else if (numberOfNames.length > 2) {
    middleNameOnly = middleNameOnly.substring(middleNameOnly.indexOf(" ") + 1, middleNameOnly.lastIndexOf(" "));
    //console.log(middleNameOnly);
    middleNameOnly = middleNameOnly.substring(0, 1).toUpperCase() + middleNameOnly.substring(1).toLowerCase();
  } else {
    middleNameOnly = null;
  }
  //console.log(middleNameOnly);
  return middleNameOnly;
}

function createLastName(fullname) {
  let lastNameOnly;
  lastNameOnly = fullname.trim();
  lastNameOnly = lastNameOnly.substring(lastNameOnly.lastIndexOf(" ") + 1);
  lastNameOnly = lastNameOnly.substring(0, 1).toUpperCase() + lastNameOnly.substring(1).toLowerCase();

  if (lastNameOnly.includes("-")) {
    let twoLastNamesOnly = lastNameOnly.split("-");
    twoLastNamesOnly[1] = twoLastNamesOnly[1].substring(0, 1).toUpperCase() + twoLastNamesOnly[1].substring(1).toLowerCase();

    let twoLastNamesJoin = twoLastNamesOnly.join("-");

    //console.log(twoLastNamesJoin);
    return twoLastNamesJoin;
  }

  //console.log(lastNameOnly);
  return lastNameOnly;
}

function createNickName(fullname) {
  let nickNameOnly;
  nickNameOnly = fullname.trim();

  if (fullname.includes('"')) {
    nickNameOnly = nickNameOnly.substring(nickNameOnly.indexOf(" ") + 2, nickNameOnly.lastIndexOf(" ") - 1);
    nickNameOnly = nickNameOnly.substring(0, 1).toUpperCase() + nickNameOnly.substring(1).toLowerCase();
  } else {
    nickNameOnly = null;
  }

  //console.log(nickNameOnly);
  return nickNameOnly;
}

function createHouse(house) {
  let correctedHouse;
  correctedHouse = house.trim();
  correctedHouse = correctedHouse.substring(0, 1).toUpperCase() + correctedHouse.substring(1).toLowerCase();

  //console.log(correctedHouse);
  return correctedHouse;
}

async function createBloodType(lastName) {
  let bloodType;

  //console.log(pureBloodFamilies);
  //console.log(halfBloodFamilies);

  const responseBloodFamilies = await fetch("https://petlatkea.dk/2021/hogwarts/families.json");
  const dataBloodFamilies = await responseBloodFamilies.json();

  pureBloodFamilies = dataBloodFamilies.pure;
  halfBloodFamilies = dataBloodFamilies.half;

  if (pureBloodFamilies.includes(lastName)) {
    bloodType = "Pure blood";
    //console.log("Pure");
  } else if (halfBloodFamilies.includes(lastName)) {
    bloodType = "Half blood";
    //console.log("Half");
  } else {
    bloodType = "Muggle";
    //console.log("Muggle");
  }

  console.log(bloodType);
  return bloodType;
}
