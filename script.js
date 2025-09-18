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
    content: `Honestly was just waiting for my bus, and I swear this guy just walked up to me and started showing me his knives, super creepy but oh well 
      <br>
      <img src="mental.jpg" alt="South San Francisco BART station" style="max-width:56%;height:auto;display:block;margin:1rem 0 0.5rem 0;">`,
    date: "September 14, 2025",
    time: "23:37:12"
  },
  /*{
    title: "Empty",
    content: `Empty!<br><img src="Empty.jpg" alt="Empty" style="max-width:100%;height:auto;display:block;margin:1rem 0 0.5rem 0;">`,
    date: "Empty 13, 2025",
    time: "15:22:05"
  },
  {
    title: "Empty",
    content: "Empty",
    date: "Empty 12, 2025",
    time: "09:47:30"
  }*/
];

function renderPosts() {
  const postsContainer = document.getElementById('posts');
  if (!postsContainer) return;
  postsContainer.innerHTML = '<h2>hi :P</h2>';
  posts.slice().reverse().forEach(post => {
    postsContainer.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="post-meta-row">
          <span>Posted on ${post.date}</span>
          <span>${post.time}</span>
        </div>
      </div>
      <hr>
    `;
  });
}

renderPosts();
updateDateTime();
setInterval(updateDateTime, 1000);
