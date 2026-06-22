// ===== SUPABASE SETUP =====
const supabase = window.supabase.createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

// ===== LOAD BOOKINGS =====
async function loadBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const table = document.getElementById("bookingsTable");
  table.innerHTML = "";

  data.forEach(booking => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${booking.name || ""}</td>
      <td>${booking.phone || ""}</td>
      <td>${booking.pickup || ""}</td>
      <td>${booking.dropoff || ""}</td>
      <td>${booking.date || ""}</td>
      <td>${booking.time || ""}</td>
      <td>
        <span class="status ${booking.status || "new"}">
          ${booking.status || "new"}
        </span>
      </td>
      <td>
        <button onclick="updateStatus('${booking.id}', 'confirmed')">Confirm</button>
        <button onclick="updateStatus('${booking.id}', 'completed')">Done</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// ===== UPDATE STATUS =====
async function updateStatus(id, status) {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  loadBookings();
}

// auto load
loadBookings();