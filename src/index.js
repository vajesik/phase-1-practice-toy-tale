let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let toyData;

//Fetch Andy's Toys
document.addEventListener("DOMContentLoaded", event => {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      initialToyRender(toys);
      toyData = toys;
    });
});

//Toy collection div where all toy cards will go
const toyCollection = document.querySelector("#toy-collection");

//Create toy cards as a div from JSON data by looping through toys object returned from GET request
//Toy cards are created with functioning like button
function initialToyRender(toys) {
  toys.forEach(function (toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class= "toy-avatar"/>
  <p>${toy.likes} likes</p>
  <button class= "like-btn" id=${toy.id}>Like ❤️</button>
  `;
    const likeBtn = toyCard.querySelector(".like-btn");
    likeBtn.addEventListener("click", event => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: (toy.likes += 1),
        }),
      });
      toyCard.querySelector("p").textContent = `${toy.likes} likes`;
    });
    toyCollection.append(toyCard);
  });
}

//New toy form
const createToyForm = document.querySelector("form.add-toy-form");

//New toy form submit sends POST request to JSON file and returns a response that gets passed into newToyRender function
document.addEventListener("DOMContentLoaded", event => {
  createToyForm.addEventListener("submit", e => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
      }),
    })
      .then(response => response.json())
      .then(toy => newToyRender(toy));
    createToyForm.reset();
  });
});

//New toy submit request returns a response that is passed into this function to create a new card
//Creates new toy card with functionion like button
function newToyRender(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";
  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class= "toy-avatar"/>
  <p>${toy.likes} likes</p>
  <button class= "like-btn" id= ${toy.id}>Like ❤️</button>
  `;
  const likeBtn = toyCard.querySelector(".like-btn");
  likeBtn.addEventListener("click", event => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: (toy.likes += 1),
      }),
    });
    toyCard.querySelector("p").textContent = `${toy.likes} likes`;
  });
  toyCollection.append(toyCard);
}
