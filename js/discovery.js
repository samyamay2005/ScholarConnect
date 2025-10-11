// ====================
// Modal Elements
// ====================
const openPostModalBtn = document.getElementById("openPostModal");
const postModal = document.getElementById("postModal");
const closePostModalBtn = document.getElementById("closePostModal");
const submitPostBtn = document.getElementById("submitPost");
const postTitleInput = document.getElementById("postTitle");
const postTextInput = document.getElementById("postText");
const postList = document.querySelector(".post-list");

// ====================
// Open / Close Modal
// ====================
if (openPostModalBtn) {
  openPostModalBtn.addEventListener("click", () => {
    postModal.classList.remove("hidden");
  });
}

if (closePostModalBtn) {
  closePostModalBtn.addEventListener("click", () => {
    postModal.classList.add("hidden");
  });
}

// Optional: Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === postModal) {
    postModal.classList.add("hidden");
  }
});

// ====================
// Create Post
// ====================
if (submitPostBtn) {
  submitPostBtn.addEventListener("click", () => {
    const title = postTitleInput.value.trim();
    const text = postTextInput.value.trim();

    if (!title || !text) {
      alert("Please fill in all fields.");
      return;
    }

    const newPost = document.createElement("div");
    newPost.classList.add("post", "card");
    newPost.innerHTML = `
      <h4 class="post-title">${title}</h4>
      <p class="post-meta">Posted by You • Just now</p>
      <p class="post-content">${text}</p>
      <div class="post-actions">
        <button class="like-btn">👍 <span class="like-count">0</span></button>
        <button class="reply-btn">💬 Reply</button>
      </div>
      <div class="reply-box hidden">
        <textarea placeholder="Write a reply..."></textarea>
        <button class="submit-reply">Post Reply</button>
      </div>
      <div class="replies"></div>
    `;

    postList.prepend(newPost);
    attachPostEvents(newPost);

    postTitleInput.value = "";
    postTextInput.value = "";
    postModal.classList.add("hidden");
  });
}

// ====================
// Attach Event Listeners to Posts
// ====================
function attachPostEvents(postElement) {
  const likeBtn = postElement.querySelector(".like-btn");
  const replyBtn = postElement.querySelector(".reply-btn");
  const replyBox = postElement.querySelector(".reply-box");
  const submitReplyBtn = postElement.querySelector(".submit-reply");
  const repliesContainer = postElement.querySelector(".replies");

  // Like
  likeBtn.addEventListener("click", () => {
    const countSpan = likeBtn.querySelector(".like-count");
    let currentCount = parseInt(countSpan.textContent, 10);
    currentCount++;
    countSpan.textContent = currentCount;
  });

  // Toggle reply box
  replyBtn.addEventListener("click", () => {
    replyBox.classList.toggle("hidden");
  });

  // Submit reply
  submitReplyBtn.addEventListener("click", () => {
    const textarea = replyBox.querySelector("textarea");
    const replyText = textarea.value.trim();
    if (!replyText) return;

    const newReply = document.createElement("div");
    newReply.classList.add("reply");
    newReply.textContent = replyText;

    repliesContainer.appendChild(newReply);
    textarea.value = "";
    replyBox.classList.add("hidden");
  });
}

// ====================
// Initialize Existing Posts
// ====================
document.querySelectorAll(".post").forEach((post) => {
  attachPostEvents(post);
});
