/* ===========================
   app.js – LuxeStay Hotel Booking
   =========================== */

// ── ROOM DATA ──────────────────────────────────────────────
const rooms = [
  {
    id: 1, name: "Deluxe Room", badge: "Popular",
    price: 180, priceKey: "deluxe",
    desc: "Elegant room with city skyline views, king-size bed, and premium amenities for the discerning traveler.",
    features: ["King Bed", "City View", "Free WiFi", "Mini Bar"],
    emoji: "🌃"
  },
  {
    id: 2, name: "Executive Suite", badge: "Best Value",
    price: 320, priceKey: "suite",
    desc: "Expansive suite with separate living area, marble bathroom, and panoramic ocean views.",
    features: ["Sea View", "Living Room", "Jacuzzi", "Butler"],
    emoji: "🌊"
  },
  {
    id: 3, name: "Penthouse", badge: "Luxury",
    price: 650, priceKey: "penthouse",
    desc: "The crown jewel of our property – private rooftop terrace, private pool, and 360° city views.",
    features: ["Private Pool", "Rooftop", "Chef Service", "Limo"],
    emoji: "🌅"
  },
  {
    id: 4, name: "Private Villa", badge: "Exclusive",
    price: 1200, priceKey: "villa",
    desc: "A standalone private villa with gardens, heated infinity pool, and dedicated concierge team.",
    features: ["Infinity Pool", "Garden", "Full Kitchen", "Gym"],
    emoji: "🏡"
  }
];

// ── RENDER ROOMS ───────────────────────────────────────────
function renderRooms() {
  const grid = document.getElementById('roomsGrid');
  if (!grid) return;

  grid.innerHTML = rooms.map(room => `
    <div class="room-card" id="room-${room.id}">
      <div class="room-img-wrapper">
        <div class="room-img" style="
          background: linear-gradient(135deg, 
            hsl(${220 + room.id * 30}, 40%, 15%) 0%, 
            hsl(${260 + room.id * 20}, 30%, 10%) 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 5rem; height: 220px;
        ">${room.emoji}</div>
        <div class="room-badge">${room.badge}</div>
      </div>
      <div class="room-info">
        <h3 class="room-name">${room.name}</h3>
        <p class="room-desc">${room.desc}</p>
        <div class="room-features">
          ${room.features.map(f => `<span class="room-feature">${f}</span>`).join('')}
        </div>
        <div class="room-footer">
          <div class="room-price">
            <span>From</span>
            <strong>$${room.price}<small style="font-size:0.6em;font-family:var(--font-sans);font-weight:400">/night</small></strong>
          </div>
          <button class="room-book-btn" onclick="selectRoom('${room.priceKey}')">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── SELECT ROOM FROM CARD ──────────────────────────────────
function selectRoom(priceKey) {
  const select = document.getElementById('roomType');
  if (select) {
    select.value = priceKey;
    calculatePrice();
  }
  scrollToBooking();
}

// ── PRICE CALCULATION ──────────────────────────────────────
const roomPrices = { deluxe: 180, suite: 320, penthouse: 650, villa: 1200 };

function calculatePrice() {
  const roomType = document.getElementById('roomType')?.value;
  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  const summary = document.getElementById('priceSummary');

  if (!roomType || !checkIn || !checkOut) { summary.style.display = 'none'; return; }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));

  if (nights <= 0) { summary.style.display = 'none'; return; }

  const rate = roomPrices[roomType] || 0;
  const subtotal = rate * nights;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  document.getElementById('roomRate').textContent = `$${rate}/night`;
  document.getElementById('nightCount').textContent = nights + (nights === 1 ? ' night' : ' nights');
  document.getElementById('taxAmount').textContent = `$${tax}`;
  document.getElementById('totalAmount').textContent = `$${total}`;

  summary.style.display = 'block';
}

// ── HANDLE BOOKING FORM ────────────────────────────────────
function handleBooking(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const roomType = document.getElementById('roomType').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;

  if (!roomType) { showToast('Please select a room type.'); return; }

  const checkInFormatted = new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const checkOutFormatted = new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  const msg = `
    Dear <strong>${firstName} ${lastName}</strong>,<br/>
    Your <strong>${document.getElementById('roomType').options[document.getElementById('roomType').selectedIndex].text}</strong> 
    has been reserved from <strong>${checkInFormatted}</strong> to <strong>${checkOutFormatted}</strong>.<br/>
    A confirmation email will be sent to <strong>${document.getElementById('email').value}</strong>.
  `;
  document.getElementById('modalMessage').innerHTML = msg;
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('bookingForm').reset();
  document.getElementById('priceSummary').style.display = 'none';
}

// ── MODAL ──────────────────────────────────────────────────
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// ── TOAST NOTIFICATION ─────────────────────────────────────
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9998;
    background: #1a0a0a; border: 1px solid rgba(239,68,68,0.4);
    color: #fca5a5; padding: 1rem 1.5rem; border-radius: 10px;
    font-size: 0.9rem; animation: fadeInUp 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── QUICK SEARCH ───────────────────────────────────────────
function quickSearch() {
  const dest = document.getElementById('destination').value.trim();
  if (!dest) { showToast('Please enter a destination.'); return; }
  showToast(`🔍 Searching for hotels in "${dest}"... Showing all available rooms.`);
  scrollToRooms();
}

// ── NAVIGATION ─────────────────────────────────────────────
function scrollToBooking() {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}
function scrollToRooms() {
  document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
}
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ── NAVBAR SCROLL EFFECT ───────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// ── DATE VALIDATION & PRICE UPDATE ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderRooms();

  const today = new Date().toISOString().split('T')[0];
  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');
  const quickCheckIn = document.getElementById('quickCheckIn');
  const quickCheckOut = document.getElementById('quickCheckOut');

  if (checkIn) { checkIn.min = today; checkIn.addEventListener('change', () => { checkOut.min = checkIn.value; calculatePrice(); }); }
  if (checkOut) { checkOut.addEventListener('change', calculatePrice); }
  if (document.getElementById('roomType')) { document.getElementById('roomType').addEventListener('change', calculatePrice); }
  if (quickCheckIn) { quickCheckIn.min = today; quickCheckIn.addEventListener('change', () => { if (quickCheckOut) quickCheckOut.min = quickCheckIn.value; }); }

  // Intersection Observer for card animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.room-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
