/* ===========================
   reviews.js – Guest Review System
   Feature Branch: feature/review-system
   =========================== */

const sampleReviews = [
  {
    id: 1, name: "Sarah M.", room: "Penthouse",
    rating: 5, avatar: "👩",
    text: "Absolutely breathtaking views from the penthouse! The staff went above and beyond. The private pool was the highlight of our anniversary trip.",
    date: "October 2026"
  },
  {
    id: 2, name: "James K.", room: "Executive Suite",
    rating: 5, avatar: "👨",
    text: "The Executive Suite was pure luxury. Marble bathroom, panoramic ocean views, and the butler service made us feel like royalty. Will definitely return!",
    date: "September 2026"
  },
  {
    id: 3, name: "Priya R.", room: "Deluxe Room",
    rating: 4, avatar: "👩‍💼",
    text: "Fantastic value for money. The Deluxe Room had everything we needed. Loved the fine dining restaurant on the 40th floor. Highly recommend!",
    date: "August 2026"
  },
  {
    id: 4, name: "Carlos D.", room: "Private Villa",
    rating: 5, avatar: "👨‍💼",
    text: "Our family of 5 stayed in the Private Villa for a week — it was beyond perfect. The infinity pool, dedicated chef, and garden were world-class.",
    date: "July 2026"
  },
  {
    id: 5, name: "Emily T.", room: "Executive Suite",
    rating: 5, avatar: "👩‍🎨",
    text: "LuxeStay redefined what I thought luxury hospitality could be. Every detail was meticulously curated. I felt truly pampered throughout.",
    date: "June 2026"
  },
  {
    id: 6, name: "Michael B.", room: "Deluxe Room",
    rating: 4, avatar: "🧑‍💻",
    text: "Business trip turned into a mini-vacation thanks to LuxeStay's amenities. Superb WiFi, quiet workspace, and impeccable room service.",
    date: "May 2026"
  }
];

let userRating = 0;

function renderReviews(reviewsList) {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  grid.innerHTML = reviewsList.map(r => `
    <div class="review-card glass">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-meta">${r.room} · ${r.date}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function setStarRating(rating) {
  userRating = rating;
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < rating);
  });
}

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value.trim();
  const reviewText = document.getElementById('reviewText').value.trim();
  const room = document.getElementById('reviewRoom').value;

  if (!name || !reviewText || !room) {
    showToast('Please fill in all review fields.');
    return;
  }
  if (userRating === 0) {
    showToast('Please select a star rating.');
    return;
  }

  const newReview = {
    id: Date.now(), name, room, rating: userRating,
    avatar: '🌟', text: reviewText,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };

  sampleReviews.unshift(newReview);
  renderReviews(sampleReviews);

  e.target.reset();
  userRating = 0;
  setStarRating(0);
  showToast('✅ Your review has been submitted! Thank you.');
}

function initReviews() {
  renderReviews(sampleReviews);

  const form = document.getElementById('reviewForm');
  if (form) form.addEventListener('submit', submitReview);
}

document.addEventListener('DOMContentLoaded', initReviews);
