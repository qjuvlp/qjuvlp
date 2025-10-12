// ---- Main Home Page (main.html) ----
// Controls the live date and time in the right-side bio

function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateElem = document.getElementById("date");
  if (dateElem) {
    dateElem.textContent = now.toLocaleDateString(undefined, options);
  }
  const timeElem = document.getElementById("time24");
  if (timeElem) {
    timeElem.textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
}

// ---- Posts Section ----
const posts = [
  {
    title: "South San Francisco Bart",
    content: `Honestly was just waiting for my bus, and I swear this guy just walked up to me with his knives, super creepy but oh well`,
    media: [
      { type: 'image', src: 'mental.jpg', alt: 'South San Francisco BART station' }
    ],
    date: "September 14, 2025",
    time: "23:37:12"
  },
  {
    title: "videoooooooooooo",
    content: `Finally figured out how to add video, so hopefully it works out and doesn't break anything, also sorry for leaving for a while, been procrastinatiing on this site for a while now since im still trying to figure out what I'm going to do with it, And if you're checking it out for the first time, thank you :)`,
    media: [
      { type: 'video', src: 'muni.mp4', alt: 'Muni Station' }
    ],
    date: "October 11, 2025",
    time: "18:05:50"
  },
  /*{
    title: "Empty",
    content: "Empty",
    date: "Empty 12, 2025",
    time: "09:47:30"
  }*/
];

function renderPosts() {
  const postsContainer = document.getElementById('posts');
  if (!postsContainer) return;
  postsContainer.innerHTML = '<h2>Entries</h2>';
  posts.slice().reverse().forEach(post => {
    postsContainer.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${renderMedia(post.media || [])}
        <div class="post-meta-row">
          <span>Posted on ${post.date}</span>
          <span>${post.time}</span>
        </div>
      </div>
      <hr>
    `;
  });
}

function renderMedia(media) {
  if (!media || !media.length) return '';
  // simple gallery container
  let html = '<div class="post-media">';
  media.forEach(item => {
    if (item.type === 'image') {
      const alt = item.alt ? item.alt : '';
      html += `<img src="${item.src}" alt="${alt}">`;
    } else if (item.type === 'video') {
      // support mp4/webm with controls
      html += `<video controls src="${item.src}"></video>`;
    }
  });
  html += '</div>';
  return html;
}

renderPosts();
updateDateTime();
setInterval(updateDateTime, 1000);

/* Toggle background-only mode
   - Keeps the <video> visible
   - Hides nav (.hotbar), main content (.container) and footer (.footerbar)
   - Stores preference in localStorage so it persists across reloads
*/
(function () {
  const TOGGLE_KEY = 'qjuvlp_bg_only';
  const btn = document.getElementById('bg-toggle');
  if (!btn) return;

  function setBgOnly(enabled) {
    document.body.classList.toggle('bg-only', !!enabled);
    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    btn.textContent = enabled ? 'Show content' : 'Show background only';
    // persist
    try { localStorage.setItem(TOGGLE_KEY, enabled ? '1' : '0'); } catch (e) {}
  }

  // click / keyboard activation
  btn.addEventListener('click', () => setBgOnly(!document.body.classList.contains('bg-only')));
  btn.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      setBgOnly(!document.body.classList.contains('bg-only'));
    }
  });
  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyAfCgZm-oA67DWRWp-9iMYkj0M5ai5gJqs",
  authDomain: "chatbox-9bc21.firebaseapp.com",
  projectId: "chatbox-9bc21",
  storageBucket: "chatbox-9bc21.firebasestorage.app",
  messagingSenderId: "306173101129",
  appId: "1:306173101129:web:b9c234cdd991d3ca11ab98"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById("recommendForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const songName = document.getElementById("songName").value;
  const artistName = document.getElementById("artistName").value;
  const message = document.getElementById("message").value;

  await db.collection("recommendations").add({
    songName,
    artistName,
    message,
    approved: false,
    timestamp: new Date()
  });

  alert("Thanks for your recommendation!");
  e.target.reset();
});

// Load only approved recommendations
db.collection("recommendations")
  .where("approved", "==", true)
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const list = document.getElementById("list");
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "recommend";
      div.innerHTML = `
        <strong>${data.songName}</strong> – ${data.artistName}<br>
        <span>${data.message}</span>
      `;
      list.appendChild(div);
      });
    });
  })();
