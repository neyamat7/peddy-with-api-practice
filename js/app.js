const petsURL = "https://openapi.programming-hero.com/api/peddy/pets";
const showAllPetsContainer = document.querySelector("#show-all-pets-container");
const addToListBtn = document.querySelector("#add-to-list");

// show all pets handler

const getPetsData = async () => {
  const response = await fetch(petsURL);
  const data = await response.json();
  const allPetsData = data.pets;
  showAllPets(allPetsData);

  //add to list handler
  //   addToListBtn.addEventListener("click", function () {
  //     addToList(allPetsData);
  //   });
};

getPetsData();

// show all pets function
const showAllPets = (pets) => {
  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.classList.add("border", "border-gray-300", "rounded-md");
    div.innerHTML = `
    <figure class="px-5 pt-5">
    <img
        class="w-full object-cover rounded-xl"
        src="${pet.image}"
        alt=""
        class="rounded-xl"
    />
    </figure>
    <div class="card-body">
    <h2 class="text-xl font-bold">${pet.pet_name}</h2>
    <p>
        <i class="fa-solid fa-border-all"></i> Breed: ${pet.breed}
    </p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
    <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: $${pet.price}</p>

    <hr />

    <div class="flex justify-center text-center gap-5">
        <button onclick="addToList('${this},${pet.image}')" id="add-to-list" class="btn bg-white border-gray-300">
        <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button class="btn bg-white border-gray-300">Adopt</button>
        <button class="btn bg-white border-gray-300">Details</button>
    </div>
    </div>
    `;
    showAllPetsContainer.appendChild(div);
  });
};

// add to list button handler function
const addToList = (btn, petImage) => {
  const likedImages = document.querySelector("#liked-images-container");
  const div = document.createElement("div");
  div.classList = "m-2";
  div.innerHTML = `<img class="p-2 border border-gray-300 rounded-xl" src=${petImage}>`;
  likedImages.appendChild(div);
};
