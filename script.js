// ul element
const draggable_list = document.getElementById("draggable-list");
// button
const check = document.getElementById("check");

// Richest people array in CORRECT order
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amacio Ortega",
  "Larrgy Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];

let dragStartIndex;

function createList() {
  [...richestPeople]
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach(({ value: person }, index) => {
      // Create the list element
      const listItem = document.createElement("li");
      // Set the data attribute
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListeners();
}

// 1. Create a document fragment
// 2. Loop through and append listItem to document fragment
// 3. Append this document fragment to ul

createList();

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  // Swap the items
  swap(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function swap(fromIndex, toIndex) {

  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

check.addEventListener("click", checkOrder);

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if(personName !== richestPeople[index]) {
      // it's in the wrong spot
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  })
}
