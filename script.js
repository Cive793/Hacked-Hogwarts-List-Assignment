"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];

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

function loadJson() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  allStudents = jsonData.map(prepareObject);
  console.log(allStudents);

  //buildList(allStudents);
}

function prepareObject(student) {
  const studentObject = Object.create(Student);
  student.img = createImage(student.fullname);
  student.firstName = createFirstName(student.fullname);
  student.middleName = createMiddleName(student.fullname);
  student.lastName = createLastName(student.fullname);
  student.NicktName = createNickName(student.fullname);
  student.house = createHouse(student.house);
  student.gender = Student.gender;
  return student;
}

function createImage(fullname) {}

function createFirstName(fullname) {
  //console.log(fullname);
  const firstNameOnly = fullname.split(" ")[0].trim();
  const firstNameCapitalization = firstNameOnly.substring(0, 1).toUpperCase() + firstNameOnly.substring(1).toLowerCase();
  //console.log(firstNameCapitalization);
  return firstNameCapitalization;
}

function createMiddleName(fullname) {}

function createLastName(fullname) {}

function createNickName(fullname) {}

function createHouse(house) {}
