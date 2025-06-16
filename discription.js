const container = document.getElementById("container");
const z = new URLSearchParams(window.location.search);
const id = z.get("id");
const data = await get_data(id);
const card = creat_card();

container.innerHTML = card;

async function get_data(id) {
  const res = await fetch(`http://localhost:3000/pitches/${id}`);
  const data = await res.json();

  return data;
}

function creat_card(){
    const card = `
    <div class="card">
        <div class="card-img">
            <img src=${data.image} alt="image">
        </div>
        <div class="card-body">
            <h2>${data.title}</h2>
            <h4>Founder: ${data.founder}</h4>
            <p>${data.description}</p>
            <h5>Price: $${data.price}</h5>

            <button data-id="15" id="add-to-cart">Add to cart</button>
            <button data-id="15" id="buy-now">Buy now</button>
        </div>
      </div>
    `

    return card;
}