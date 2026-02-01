const API_URL = "http://localhost:3000/api/menu";
const IMAGE_BASE_URL = "http://localhost:3000/images/";

async function getMenu() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderMenu(data);
  } catch (err) {
    console.error("Error fetching menu:", err);
    document.getElementById("menu-container").innerHTML = 
      '<p class="text-danger text-center">Failed to load menu items.</p>';
  }
}

function renderMenu(items) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  items.forEach(item => {
    const imageSrc = item.image ? `${IMAGE_BASE_URL}${item.image}` : `${IMAGE_BASE_URL}default.png`;

    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4", "menu-item", item.category);
    
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imageSrc}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="price fw-bold text-success">$${item.price}</p>
          <p class="category text-muted"><small>Category: ${item.category}</small></p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.onload = getMenu;