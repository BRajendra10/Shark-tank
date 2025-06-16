const container = document.getElementById("container")
const data = await get_data()
get_pitch_data(data);

async function get_data() {
    const res = await fetch("http://localhost:3000/cart")
    const data = await res.json()

    return data
}

function get_pitch_data(data) {
  let cards = data.map((el, i) => creat_card(el.image, el.title, el.founder, el.price));

  console.log(cards);
  container.innerHTML = cards.join("");
}

function creat_card(image, title, founder, price) {
  const card = `
    <div class="card">
        <div class="card-img">
            <img src=${image} alt="image">
        </div>
        <div class="card-body">
            <h2>${title}</h2>
            <h4>Founder: ${founder}</h4>
            <h5>Price: $${price}</h5>

            <button data-id="15" id="add-to-cart">Add to cart</button>
            <button data-id="15" id="buy-now">Buy now</button>
        </div>
      </div>
    `

  return card;
}