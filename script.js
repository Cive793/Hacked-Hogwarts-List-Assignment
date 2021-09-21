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

  buildList();
}

function prepareObject() {
  const student = Object.create(Student);
  student.img = createImage(student.fullname);
  student.firstName = createFirstName(student.fullname);
  student.firstName = createMiddleName(student.fullname);
  student.firstName = createLastName(student.fullname);
  student.firstName = createNickName(student.fullname);
  student.gender = createFirstName(student.fullname);
  student.firstName = Student.gender;
}
