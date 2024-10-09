const outputList = document.getElementById("output");
const getBtn = document.getElementById("get-posts-btn");
const addPostForm = document.getElementById("add-post-form");

async function showPosts() {
  let posts = [];
  try {
    const res = await fetch("http://localhost:8000/api/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    posts = await res.json();
  } catch (err) {
    console.error(err);
  }
  outputList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    const pTitleH2 = document.createElement("h2");
    const pContent = document.createElement("p");
    pTitleH2.textContent = post.title;
    pContent.textContent = post.content;
    li.appendChild(pTitleH2);
    li.appendChild(pContent);
    outputList.appendChild(li);
  });
}

async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const content = formData.get("content");
  try {
    const res = await fetch("http://localhost:8000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("Failed to create post");
    const allPosts = await res.json();
    const newPost = allPosts[allPosts.length - 1];
    const li = document.createElement("li");
    const hr = document.createElement("hr");
    const addPost = document.createElement("h1");
    addPost.textContent = "Post Added Successfully";
    const pTitleH2 = document.createElement("h2");
    const pContent = document.createElement("p");
    pTitleH2.textContent = "Title: " + newPost.title;
    pContent.textContent = "Content: " + newPost.content;
    outputList.innerHTML = "";
    li.appendChild(hr);
    li.appendChild(addPost);
    li.appendChild(pTitleH2);
    li.appendChild(pContent);
    outputList.appendChild(li);
  } catch (err) {
    console.error(err);
  }
}

getBtn.addEventListener("click", showPosts);
addPostForm.addEventListener("submit", addPost);
