"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let expelledStudents = [];
let pureBloodFamilies = [];
let halfBloodFamilies = [];

const filterSortSettings = {
  filterBy: "all",
  sortBy: "lastName",
  sortDir: "",
};

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

  //open search button dropdown
  document.querySelector(".searchButton").addEventListener("click", buttonDropdown);

  //filter buttons
  const filterButtons = document.querySelectorAll("[data-action='filter']");
  filterButtons.forEach((button) => button.addEventListener("click", registerFilter));

  //sort buttons
  const sortButtons = document.querySelectorAll("[data-action='sort']");
  sortButtons.forEach((button) => button.addEventListener("click", registerSort));

  //search input
  document.querySelector("#searchInput").addEventListener("input", registerSearch);

  loadJson();
}

//toggle search button dropdown
function buttonDropdown() {
  document.getElementById("searchDropdown").classList.toggle("show");
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

  //console.log(allStudents);

  buildList(allStudents);
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

function registerFilter(filterChoice) {
  const filter = filterChoice.target.dataset.filter;
  filterSortSettings.filterBy = filter;
  buildList();
}

function filterList(list) {
  console.log(filterSortSettings.filterBy);
  let newList = list;

  if (filterSortSettings.filterBy === "expelled") {
    newList = expelledStudents;
  } else if (filterSortSettings.filterBy === "Gryffindor") {
    newList = allStudents.filter(onlyGriffindor);
  } else if (filterSortSettings.filterBy === "Slytherin") {
    newList = allStudents.filter(onlySlytherin);
  } else if (filterSortSettings.filterBy === "Ravenclaw") {
    newList = allStudents.filter(onlyRavenclaw);
  } else if (filterSortSettings.filterBy === "Hufflepuff") {
    newList = allStudents.filter(onlyHufflepuff);
  }
  console.log(newList);
  return newList;
}

function onlyGriffindor(student) {
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function onlySlytherin(student) {
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function onlyRavenclaw(student) {
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function onlyHufflepuff(student) {
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function registerSort() {}

function registerSearch() {}

function buildList() {
  //console.log(allStudents);
  const newList = filterList(allStudents);
  //const sortedList = registerSort(filteredList);
}

//cleaning up data
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

  //fetch blood families json
  const responseBloodFamilies = await fetch("https://petlatkea.dk/2021/hogwarts/families.json");
  const dataBloodFamilies = await responseBloodFamilies.json();

  //decide which are pure and which are halfblood
  pureBloodFamilies = dataBloodFamilies.pure;
  halfBloodFamilies = dataBloodFamilies.half;

  //calculate blood status for each student
  if (pureBloodFamilies.includes(lastName)) {
    bloodType = "Pure blood";
  } else if (halfBloodFamilies.includes(lastName)) {
    bloodType = "Half blood";
  } else {
    bloodType = "Muggle";
  }

  //console.log(bloodType);
  return bloodType;
}

/* function getImageSrc() {
  allStudents.forEach((student) => {
    if (student.lastName !== "") {
      // for every student, find out whether there are more students with the same last name
      const sameLastName = allStudents.filter(
        (item) => item.lastName === student.lastName
      );

      // check whether last name consists of two words with hyphen, and, if yes, shorten it
      const shortenedLastName = shortenLastName(student.lastName);

      // if there is more than one student with the same last name
      if (sameLastName.length > 1) {
        student.imageSrc = `assets/images/${shortenedLastName.toLowerCase()}_${student.firstName.toLowerCase()}.png`;
      } else {
        // if there is only one student with this last name
        student.imageSrc = `assets/images/${shortenedLastName.toLowerCase()}_${student.firstName
          .slice(0, 1)
          .toLowerCase()}.png`;
      }
    } else {
      student.imageSrc = "";
    }
  });
} */
