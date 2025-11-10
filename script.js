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
  {
    title: "",
    content: "Im fucking jealous of you if you're going to see kimj later 2nite in sf DX, still trying to bring myself to opening vs studio to code bruuuuuuuuu",
    date: "October 17, 2025",
    time: "19:41:30"
  },
  {
    title: "yipeee",
    content: "Had so much fun today, met these two awesome people at the Bar Italia's concert here in San Francisco, AND VOYEUR?!?!?! LIKE LOL TWO BIRDS WITH ONE STONE. Especially being at barricade, made my experience so much better than I could have ever imagined. My only regret is that I didn't speak up to the band so that I could ask for a photo xd. Final thing, after the concert I met up with my parents and they ended up sneaking me into a club for the first time, lets just say I'll be sticking to concerts.",
    date: "November 9, 2025",
    time: "03:56:22"
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
  })();



