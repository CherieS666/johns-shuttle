// ===== SUPABASE SETUP =====
const supabase = window.supabase.createClient(
  "https://fcsulkjgynoyebmplpms.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjc3Vsa2pneW5veWVibXBscG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjczMTcsImV4cCI6MjA5NzY0MzMxN30.91Qw2w_ES9dKaeO37o8J29sh97Nzus1ZBth8fpnOTXI"
);

// ===== FORM ELEMENTS =====
const form = document.getElementById("bookingForm");

if (form) {
  document.getElementById("sendSms").addEventListener("click", async () => {
    e.preventDefault();

    const booking = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      pickup: document.getElementById("pickup").value,
      dropoff: document.getElementById("dropoff").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      passengers: document.getElementById("passengers").value || null,
      flight: document.getElementById("flight").value || null,
      notes: document.getElementById("notes").value|| null,
      status: "new"
    };

    const { error } = await supabase
      .from("bookings")
      .insert([booking]);

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    // success message
    alert("Booking request sent successfully!");

    form.reset();
  });
}

// ===== ADMIN PAGE: LOAD BOOKINGS =====
async function loadBookings() {
  const table = document.getElementById("bookingsTable");
  if (!table) return;

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  table.innerHTML = "";

  data.forEach((b) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${b.name || ""}</td>
      <td>${b.phone || ""}</td>
      <td>${b.pickup || ""}</td>
      <td>${b.dropoff || ""}</td>
      <td>${b.date || ""}</td>
      <td>${b.time || ""}</td>
      <td>${b.status || "new"}</td>
      <td>
        <button onclick="updateStatus('${b.id}', 'confirmed')">Confirm</button>
        <button onclick="updateStatus('${b.id}', 'completed')">Done</button>
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

// auto load admin page
loadBookings();
