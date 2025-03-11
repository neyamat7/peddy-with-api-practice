const petsURL = "https://openapi.programming-hero.com/api/peddy/pets";
const categoryURL = "https://openapi.programming-hero.com/api/peddy/categories";
const showAllPetsContainer = document.querySelector("#show-all-pets-container");
const addToListBtn = document.querySelector("#add-to-list");
const showCategoriesContainer = document.querySelector("#show-categories");

// show all pets handler

const getPetsData = async () => {
  const response = await fetch(petsURL);
  const data = await response.json();
  const allPetsData = await data.pets;
  showAllPets(allPetsData);
};

getPetsData();

// get pet category
const getPetCategory = async () => {
  const response = await fetch(categoryURL);
  const data = await response.json();
  petCategoryShow(data.categories);
};
getPetCategory();
// pets category show
const petCategoryShow = (categories) => {
  categories.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <button onclick="showCategoryBtn('${item.category.toLowerCase()}',this)" id="buttonAll" 
    class="btn bg-white border-gray-300 w-[150px] h-[50px] md:w-[220px] md:h-[70px] lg:w-[260px] lg:h-[70px]">
    <img class="w-10 h-10" src=${item.category_icon} alt="" /> ${item.category}
    </button>`;
    showCategoriesContainer.appendChild(div);
  });
};

// show by category
const showCategoryBtn = async (categoryName, btn) => {
  const loading = document.querySelector("#spinner");
  loading.classList.remove("hidden");
  showAllPetsContainer.classList.add("hidden");
  showAllPetsContainer.innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  if (data.data.length === 0) {
    setTimeout(() => {
      loading.classList.add("hidden");
      showAllPetsContainer.classList.remove("hidden");
      showAllPetsContainer.innerHTML = `
    <div class="min-h-[360px] lg:w-[850px] flex flex-col gap-5 text-center items-center justify-center space-y-3 py-24 bg-gray-200 rounded-xl">
    <img src="./images/error.webp" alt="" />
    <h1 class="text-2xl font-bold">No Information Available</h1>
    <p class="lg:w-[600px] mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    }, 2000);
    return;
  }
  setTimeout(() => {
    loading.classList.add("hidden");
    showAllPetsContainer.classList.remove("hidden");
    showAllPets(data.data);
  }, 3000);
};

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
        <button onclick="addToList('${pet.image}')" id="add-to-list" class="btn bg-white border-gray-300">
        <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button class="btn bg-white border-gray-300">Adopt</button>
        <button onclick="showDetailsModal('${pet.image}')" class="btn bg-white border-gray-300">Details</button>
    </div>
    </div>
    `;
    showAllPetsContainer.appendChild(div);
  });
};

// add to list button handler function
let hasSameImg = false;
const addToList = (petImage) => {
  const likedImages = document.querySelector("#liked-images-container");
  checkAddedImage(petImage, likedImages);
  if (!hasSameImg) {
    const div = document.createElement("div");
    div.classList = "m-2";
    div.innerHTML = `<img class="p-2 border border-gray-300 rounded-xl" src=${petImage}>`;
    likedImages.appendChild(div);
  }
};

// check if allready added image
const checkAddedImage = (imgUrl, imgContainer) => {
  // imgContainer.querySelectorAll()
  const addedImageDiv = imgContainer.querySelectorAll("div");
  let founded = false;
  addedImageDiv.forEach((imgDiv) => {
    if (founded) {
      return;
    }
    const allImageNodes = imgDiv.childNodes;
    allImageNodes.forEach((img) => {
      if (img.src === imgUrl) {
        hasSameImg = true;
        founded = true;
      } else {
        hasSameImg = false;
        founded = false;
      }
    });
  });
};


// details modal show
const showDetailsModal = (petImage) => {
    console.log(petImage);
}