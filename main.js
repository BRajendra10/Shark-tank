let mainSection = document.getElementById("data-list-wrapper");

// // pitch
// let pitchTitleInput = document.getElementById("pitch-title");
// let pitchImageInput = document.getElementById("pitch-image");
// let pitchCategoryInput = document.getElementById("pitch-category");
// let pitchfounderInput = document.getElementById("pitch-founder");
// let pitchPriceInput = document.getElementById("pitch-price");
// let pitchCreateBtn = document.getElementById("add-pitch");

// // Update pitch
// let updatePitchIdInput = document.getElementById("update-pitch-id");
// let updatePitchTitleInput = document.getElementById("update-pitch-title");
// let updatePitchImageInput = document.getElementById("update-pitch-image");
// let updatePitchfounderInput = document.getElementById("update-pitch-founder");
// let updatePitchCategoryInput = document.getElementById("update-pitch-category");
// let updatePitchPriceInput = document.getElementById("update-pitch-price");
// let updatePitchBtn = document.getElementById("update-pitch");

// //Update price
// let updatePricePitchId = document.getElementById("update-price-pitch-id");
// let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
// let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

// //sort and filter
// let sortAtoZBtn = document.getElementById("sort-low-to-high");
// let sortZtoABtn = document.getElementById("sort-high-to-low");
// let filterFood = document.getElementById("filter-Food");
// let filterElectronics = document.getElementById("filter-Electronics");
// let filterPersonalCare = document.getElementById("filter-Personal-Care");

// //Search by title/founder

// let searchBySelect = document.getElementById("search-by-select");
// let searchByInput = document.getElementById("search-by-input");
// let searchByButton = document.getElementById("search-by-button");

// // Problem 1. List of pitches on page load [3}

(function (){
  fetch("http://localhost:3000/pitches")
    .then((res) => res.json())
    .then((data) => {
      get_pitch_data(data);
    })
    .catch((err) => {
      console.log(err);
    });
})();

function get_pitch_data(data){
    let cards =  data.map((el, i)=> creat_card(el.image, el.title, el.founder, el.category, el.price));
    mainSection.innerHTML = cards.join("");
}

function creat_card(img, title, founder, category, price){
    let card = `
    <div class="card">
        <div class="card-img">
            <img src=${img} alt="pitch">
        </div>
        <div class="card-body">
            <h4 class="class-title">${title}</h4>
            <p class="card-founder">Founder: ${founder}</p>
            <p class="card-category">${category}</p>
            <p class="card-price">${price}</p>
            <a href="#" class="card-link">Edit</a>
            <button class="card-button">Delete</button>
        </div>
    </div>`;

    return card;
}