"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
function PromptCardList({ data, searchedPosts, handleTagClick }) {
  let tempData = searchedPosts ? searchedPosts : data;
  return (
    <div className="mt-16 prompt_layout">
      {tempData?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}
export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState();
  const [posts, setPosts] = useState([]);
  function handleSearchChange(e) {
    setSearchText(e.target.value);
    let tempData = posts?.filter((post) =>
      [post.prompt, post.creator.username, ...post.tag].some((field) =>
        //some sadece dizi ile çalıştığı için arama yaptığımız üç alanı da bir dizi içine alarak arama
        //arama yapmamız gerekli [] ifadesi ile dizi içerisine alma gerçekleşiyor.
        field.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setSearchedPosts(tempData);
  }
  useEffect(() => {
    async function fetcPosts() {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }
    fetcPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag, prompt or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        searchedPosts={searchText ? searchedPosts : null}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
}
