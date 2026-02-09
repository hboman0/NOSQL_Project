const API_URL_RES = "/api/reservations";
const ADMIN_TOKEN = "Bearer " + localStorage.getItem("token");

async function addItem() {
  const reservationId = document.getElementById("reservationIdAdd").value;
  const menuItem = document.getElementById("menuItemId").value;
  const quantity = Number(document.getElementById("quantity").value);

  try {
    const res = await fetch(`${API_URL_RES}/${reservationId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ADMIN_TOKEN
      },
      body: JSON.stringify({ menuItem, quantity })
    });
    const data = await res.json();
    console.log("Add Item Result:", data);
    alert("Item added!");
  } catch (err) {
    console.error("Error adding item:", err);
  }
}

async function removeItem() {
  const reservationId = document.getElementById("reservationIdRemove").value;
  const menuItem = document.getElementById("menuItemIdRemove").value;

  try {
    const res = await fetch(`${API_URL_RES}/${reservationId}/items`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ADMIN_TOKEN
      },
      body: JSON.stringify({ menuItemId: menuItem })
    });
    const data = await res.json();
    console.log("Remove Item Result:", data);
    alert("Item removed!");
  } catch (err) {
    console.error("Error removing item:", err);
  }
}

async function markLarge() {
  try {
    const res = await fetch(`${API_URL_RES}/bulk/large`, {
      method: "PUT",
      headers: {
        "Authorization": ADMIN_TOKEN
      }
    });
    const data = await res.json();
    console.log("Bulk Update Result:", data);
    alert("Large reservations updated!");
  } catch (err) {
    console.error("Error bulk updating:", err);
  }
}

async function getStats() {
  try {
    const res = await fetch(`${API_URL_RES}/stats/summary`, {
      headers: {
        "Authorization": ADMIN_TOKEN
      }
    });
    const stats = await res.json();
    document.getElementById("statsOutput").textContent = JSON.stringify(stats, null, 2);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
}
