import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useArticleContext } from "../Context/ArticleContext";
const MainContent = () => {
  const { items, setItems } = useArticleContext();
  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  const fetchArticle = async () => {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=react&page=${page}&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ`
    );
    const data = await res.json();
    if (data.response.length === null) {
      sethasMore(false);
    }

    return data.response.docs;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticle();
    if (articlesFormServer.length === 0 || articlesFormServer.length < 10) {
      sethasMore(false);
    }

    setItems([...items, ...articlesFormServer]);

    setpage(page + 1);
  };

  const listItems =
    items &&
    items.map((item, index) => (
      <Link
        to={`/article?q=${item._id}`}
        style={{ textDecoration: "none" }}
        key={index}
      >
        <div className="card">
          <div className="card_img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HZ5ITD8zf_5JiB4xF5h4C5_8s-8DY8RGCFeP9WqTo4CcVRAkNUyGOamSamWS90eXoA&usqp=CAU"
              alt=""
            />
          </div>
          <div className="card_header">
            <h2>{item.headline.main}</h2>
            <p>{item.abstract}</p>
            <div className="btn">
              <div>Read More</div>
            </div>
          </div>
        </div>
      </Link>
    ));
  return (
    <>
      <InfiniteScroll
        className="main_content"
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<div className="loading-inf">Loading...</div>}
        endMessage={
          <div style={{ textAlign: "center", float: "left" }}>
            <b>Yay! You have seen it all</b>
          </div>
        }
      >
        {listItems}
      </InfiniteScroll>
    </>
  );
};
export default MainContent;
