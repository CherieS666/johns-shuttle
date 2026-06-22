// ===== SUPABASE SETUP =====
const sb = window.supabase.createClient(
  "https://fcsulkjgynoyebmplpms.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjc3Vsa2pneW5veWVibXBscG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjczMTcsImV4cCI6MjA5NzY0MzMxN30.91Qw2w_ES9dKaeO37o8J29sh97Nzus1ZBth8fpnOTXI"
);

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");
  const btn = document.getElementById("sendSms");

  if (!form || !btn) {
    console.error("Form or button not found");
    return;
  }

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log("BUTTON CLICKED");

    const booking = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      pickup: document.getElementById("pickup").value.trim(),
      dropoff: document.getElementById("dropoff").value.trim(),
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      passengers: document.getElementById("passengers").value || null,
      flight: document.getElementById("flight").value || null,
      notes: document.getElementById("notes").value || null,
      status: "new"
    };

    if (!booking.name || !booking.phone || !booking.pickup || !booking.dropoff || !booking.date || !booking.time) {
      alert("Please fill all required fields.");
      return;
    }

    const { error } = await sb.from("bookings").insert([booking]);

    if (error) {
      console.error(error);
      alert("Database error. Check console.");
      return;
    }

    alert("Booking sent successfully!");
    form.reset();
  });

});
