// ===== SUPABASE SETUP =====
const sb = window.supabase.createClient(
  "https://fcsulkjgynoyebmplpms.supabase.co",
  "YOUR_ANON_KEY"
);

// ===== FORM =====
const form = document.getElementById("bookingForm");

if (form) {
  document.getElementById("sendSms").addEventListener("click", async (e) => {
    e.preventDefault();

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

    // basic validation
    if (!booking.name || !booking.phone || !booking.pickup || !booking.dropoff || !booking.date || !booking.time) {
      alert("Please fill all required fields.");
      return;
    }

    const { error } = await sb
      .from("bookings")
      .insert([booking]);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Booking sent successfully!");
    form.reset();
  });
}
