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

const EVENT_HANDLER_MAPPING = {
  dragstart: dragStart,
  dragover: dragOver,
  drop: dragDrop,
  dragenter: dragEnter,
  dragleave: dragLeave,
};

let dragStartIndex;

function createList() {
  const documentFragment = new DocumentFragment();
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
      documentFragment.appendChild(listItem);
    });
    draggable_list.appendChild(documentFragment);
  addEventListeners();
}

createList();

function addEventListeners() {
  for (const event in EVENT_HANDLER_MAPPING) {
    if (Object.hasOwnProperty.call(EVENT_HANDLER_MAPPING, event)) {
      const eventHandler = EVENT_HANDLER_MAPPING[event];
      draggable_list.addEventListener(event, eventHandler);
    }
  }
}

/*
The event object that we get in the following events will ALWAYS be the div with
the class name of "draggable". Because only this div has the attribute draggable = true.
So we need to get the closest li element from this div and update accordingly.
*/

function dragEnter(e) {
  e.target.closest('li').classList.add('over');
}

function dragLeave(e) {
  e.target.closest('li').classList.remove('over');
}

function dragStart(e) {
  dragStartIndex = +e.target.closest('li').dataset.index;
}

function dragDrop(e) {
  const dragEndIndex = +e.target.closest('li').dataset.index;
  // Swap the items
  swap(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function swap(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

check.addEventListener("click", checkOrder);

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      // it's in the wrong spot
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}
