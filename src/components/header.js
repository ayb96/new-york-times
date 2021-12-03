import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useArticleContext } from "../Context/ArticleContext";
export default function Header() {
  const { q, setQ, items, setItems } = useArticleContext();
  const handelchange = () => {
    const fetchArticle = async () => {
 
      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(\"${q}\")&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ`
      );
      const data = await res.json();

      setItems(data.response.docs);
    };
    fetchArticle();
    console.log(q);
    console.log(items);
  };

  return (
    <nav>
      <div className="logo">New York Times</div>
      <div className="search">
        <input
          type="text"
          className="input-search"
          placeholder="Search for articles"
          onChange={(e) => setQ(e.target.value)}
          defaultValue={q}
        />
        <div className="icon-search" onClick={handelchange}>
          <SearchIcon />
        </div>
      </div>

      <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>Our article</li>
        </Link>

        <li>About Us</li>
      </ul>
    </nav>
  );
}
