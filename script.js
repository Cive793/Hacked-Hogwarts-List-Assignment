"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let pureBloodFamilies = [];
let halfBloodFamilies = [];

const filterSortSettings = {
  filterBy: "all",
  sortBy: "lastName",
  sortDir: "asc",
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
  //document.querySelector("#searchInput").addEventListener("input", registerSearch);

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
  //console.log(allStudents);
  /* pureBloodFamilies = dataBloodFamilies.pure;
  halfBloodFamilies = dataBloodFamilies.half; */

  console.log(allStudents);

  //display list
  buildList(allStudents);
}

function prepareObject(student) {
  const studentObject = Object.create(Student);
  studentObject.img = createImage(student.fullname);
  studentObject.firstName = createFirstName(student.fullname);
  studentObject.middleName = createMiddleName(student.fullname);
  studentObject.lastName = createLastName(student.fullname);
  studentObject.nickName = createNickName(student.fullname);
  studentObject.house = createHouse(student.house);
  studentObject.gender = Student.gender;
  studentObject.bloodStatus = createBloodType(student.lastName);
  //console.log(pureBloodFamilies);

  //console.log(Student);
  return studentObject;
}

function registerFilter(filterChoiceEvent) {
  const filter = filterChoiceEvent.target.dataset.filter;
  filterSortSettings.filterBy = filter;
  buildList();
}

function filterList(list) {
  console.log(filterSortSettings.filterBy);
  let newList = list;

  if (filterSortSettings.filterBy === "expelled") {
    newList = allStudents.filter(onlyExpelled);
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

function onlyExpelled(student) {
  return student.expelled === true;
}

function onlyGriffindor(student) {
  return student.house === "Gryffindor";
}

function onlySlytherin(student) {
  return student.house === "Slytherin";
}

function onlyRavenclaw(student) {
  return student.house === "Ravenclaw";
}

function onlyHufflepuff(student) {
  return student.house === "Hufflepuff";
}

function registerSort(sortChoiceEvent) {
  const sortBy = sortChoiceEvent.target.dataset.sort;
  const sortDir = sortChoiceEvent.target.dataset.sortDirection;

  console.log(`Sort by ${sortBy}`);
  setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
  filterSortSettings.sortBy = sortBy;
  filterSortSettings.sortDir = sortDir;
  buildList();
}

function sortList(sortedList) {
  let sortDirection = 1;
  if (filterSortSettings.sortDir === "desc") {
    sortDirection = -1;
  }
  sortedList = sortedList.sort(sortByProperty);

  function sortByProperty(a, b) {
    if (a[filterSortSettings.sortBy] < b[filterSortSettings.sortBy]) {
      return -1 * sortDirection;
    } else {
      return 1 * sortDirection;
    }
  }
  return sortedList;
}

function registerSearch() {
  let search = document.querySelector("#searchInput").value.toLowerCase();
  const searchResult = allStudents.filter((student) => {
    return student.firstName.toString().toLowerCase().includes(search) || student.middleName.toString().toLowerCase().includes(search) || student.lastName.toString().toLowerCase().includes(search);
  });
  displayList(searchResult);
}

function buildList() {
  //console.log(newList);
  const newList = filterList(allStudents);
  const sortedList = sortList(newList);

  console.log(sortedList);
  displayList(sortedList);
}

function displayList(sortedList) {
  sortedList.forEach((student) => displayStudent(student));
}

function displayStudent(student) {
  //console.log(student);

  const template = document.querySelector("#student").content;
  const copy = template.cloneNode(true);
  console.log(copy);
  copy.querySelector(".studentFirstName").textContent = student.firstName;
  copy.querySelector(".studentMiddleName").textContent = student.middleName;
  copy.querySelector(".studentLastName").textContent = student.lastName;
  copy.querySelector(".studentNickname").textContent = student.nickName;
  //make copy
  //change content inside copy
  //append to parent
  const parent = document.querySelector("tbody");
  parent.appendChild(copy);
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
