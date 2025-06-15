let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

// Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

// sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

// Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//  Problem 1. List of pitches on page load [3}

let json_data = await get_data();
get_pitch_data(json_data);

async function get_data(){
  const res = await fetch("http://localhost:3000/pitches")
  const data = await res.json();

  return data;
}

// Note for both get_pitch_data and update _pitch
// array are 0 index based

function get_pitch_data(data) {
  let cards = data.map((el, i) =>
    creat_card(el.image, el.title, el.founder, el.category, el.price, el.id)
  );

  mainSection.innerHTML = cards.join("");
  // so here first eliment that has #edit id is o indexed
  document.querySelectorAll("#edit").forEach((el, i) => {
    el.addEventListener("click", () => {
      let id = el.getAttribute("data-id");
      edit_pitch(id); // and i am here pasing the 0 indexed as id
    });
  });

  document.querySelectorAll("#btn").forEach((el, i) => {
    el.addEventListener("click", () => {
      let id = el.getAttribute("data-id");
      delete_pitch(id);
    });
  });
}

function delete_pitch(id) {
  alert(id);

  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log("Deleted data", data))
    .catch((err) => console.log(err));
}

function edit_pitch(id) {
  // and here i get the data
  // json_data is arra so it's 0 index based so don't have to change it
  updatePitchTitleInput.value = json_data[id].title;
  updatePitchImageInput.value = json_data[id].image;
  updatePitchCategoryInput.value = json_data[id].category;
  updatePitchfounderInput.value = json_data[id].founder;
  updatePitchPriceInput.value = json_data[id].price;
  // but the id of eliment in json-server are not index based
  // so i have to use pree increament (el-in-array index=5 json-data index=6)
  updatePitchIdInput.value = ++id;
}

function creat_card(img, title, founder, category, price, id) {
  let card = `
    <div class="card">
        <p>${id}</p>
        <div class="card-img">
            <img src=${img} alt="pitch">
        </div>
        <div class="card-body">
            <h4 class="class-title">${title}</h4>
            <p class="card-founder">Founder: ${founder}</p>
            <p class="card-category">${category}</p>
            <p class="card-price">$${price}</p>
            <a href="#" class="card-link" data-id=${id} id="edit">Edit</a>
            <button data-id=${id} class="card-button" id="btn">Delete</button>
        </div>
    </div>`;

  return card;
}

pitchCreateBtn.addEventListener("click", () => {
  const newData = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    founder: pitchfounderInput.value,
    category: pitchCategoryInput.value,
    price: pitchPriceInput.value,
  };

  fetch("http://localhost:3000/pitches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => res.json())
    .then((data) => {
      json_data = data;
    })
    .catch((err) => console.log("Error", err));
});

updatePitchBtn.addEventListener("click", () => {
  let id = updatePitchIdInput.value;

  let updated_pitch_obj = {
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    category: updatePitchCategoryInput.value,
    founder: updatePitchfounderInput.value,
    price: updatePitchPriceInput.value,
  };

  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updated_pitch_obj),
  })
    .then((res) => res.json())
    .then((data) => {
      json_data = data;
    })
    .catch((err) => console.log("Error", err));
});

updatePricePitchPriceButton.addEventListener("click", () => {
  let updated_price_obj = {
    price: updatePricePitchPrice.value,
  };

  fetch(`http://localhost:3000/pitches/${updatePricePitchId.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updated_price_obj),
  })
    .then((res) => res.json())
    .then((data) => {
      json_data = data;
    })
    .catch((err) => console.log("Error", err));
});

sortAtoZBtn.addEventListener("click", () => {
  json_data = json_data.sort((a, b) => a.price - b.price);
  get_pitch_data(json_data);
});

sortZtoABtn.addEventListener("click", () => {
  json_data = json_data.sort((a, b) => b.price - a.price);
  get_pitch_data(json_data);
});

filterFood.addEventListener("click", () => {
  json_data = json_data.filter((obj) => obj.category === "Food");
  get_pitch_data(json_data);
});

filterPersonalCare.addEventListener("click", () => {
  json_data = json_data.filter(
    (obj) => obj.category === "Personal Care"
  );
  get_pitch_data(json_data);
});

filterElectronics.addEventListener("click", () => {
  json_data = json_data.filter(
    (obj) => obj.category === "Electronics"
  );
  get_pitch_data(json_data);
});

searchByButton.addEventListener("click", () => {
  fetch(
    `http://localhost:3000/pitches?${searchBySelect.value}=${searchByInput.value}`
  )
    .then((res) => res.json())
    .then((data) => get_pitch_data(data))
    .catch((res) => console.log(res));
});
