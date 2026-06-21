const API_URL = "/api/menu";
const IMAGE_BASE_URL = "/images/";
const ITEMS_PER_PAGE = 9;

let currentPage = 1;
let currentCategory = "all";
let searchDebounceTimer = null;

async function getMenu(page = 1) {
  currentPage = page;

  const search = document.getElementById("menuSearch")?.value.trim() || "";

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (currentCategory !== "all") params.set("category", currentCategory);
  params.set("page", page);
  params.set("limit", ITEMS_PER_PAGE);

  try {
    const res = await fetch(`${API_URL}?${params.toString()}`);
    const data = await res.json();
    renderMenu(data.items || []);
    renderPagination(data);
  } catch (err) {
    console.error("Error fetching menu:", err);
    document.getElementById("menu-container").innerHTML =
      '<p class="text-danger text-center">Failed to load menu items.</p>';
  }
}

function renderMenu(items) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = '<p class="text-center text-muted">No dishes match your search.</p>';
    return;
  }

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

function renderPagination(data) {
  const el = document.getElementById("menuPagination");
  if (!el) return;

  if (!data.totalPages || data.totalPages <= 1) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = `
    <button class="btn btn-outline-dark btn-sm me-3" id="menuPrevBtn" ${data.page <= 1 ? "disabled" : ""}>
      &laquo; Prev
    </button>
    <span>Page ${data.page} of ${data.totalPages}</span>
    <button class="btn btn-outline-dark btn-sm ms-3" id="menuNextBtn" ${data.page >= data.totalPages ? "disabled" : ""}>
      Next &raquo;
    </button>
  `;

  document.getElementById("menuPrevBtn")?.addEventListener("click", () => getMenu(currentPage - 1));
  document.getElementById("menuNextBtn")?.addEventListener("click", () => getMenu(currentPage + 1));
}

// --- Search input (debounced) ---
document.getElementById("menuSearch")?.addEventListener("input", () => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => getMenu(1), 300);
});

// --- Category filter buttons (now query the API instead of show/hide) ---
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    getMenu(1);
  });
});

window.onload = () => getMenu(1);
