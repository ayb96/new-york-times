import React, { useContext, useEffect, useState } from "react";

const ArticleContext = React.createContext();

export function useArticleContext() {
  return useContext(ArticleContext);
}

export function ArticleContextProvider(props) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [retrived, setRetrived] = useState([]);
  const value = {
    q,
    setQ,
    items,
    setItems,
    retrived,
    setRetrived,
  };

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&page=0&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ`
      );
      const data = await res.json();
      setItems(data.response.docs);
      setRetrived(data.response.docs);
      console.log("2314342343243242334", q);
    };
    getArticles();
  }, []);

  return (
    <ArticleContext.Provider value={value}>
      {props.children}
    </ArticleContext.Provider>
  );
}
