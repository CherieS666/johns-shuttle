// ===== SUPABASE SETUP =====
const sb = window.supabase.createClient(
  "https://fcsulkjgynoyebmplpms.supabase.co",
  "YOUR_ANON_KEY"
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
