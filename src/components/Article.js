import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";
export default function Article() {
  const [items, setItems] = useState({});
  const location = useLocation();

  console.log(location.search.slice(3));
  useEffect(() => {
    const getArticle = async () => {
      const id = `${location.search.slice(3)}`;

      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:(\"${id}\")&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ`
      );
      const data = await res.json();
      setItems(data.response.docs[0]);
    };

    getArticle();
  }, []);

  return (
    <div className="articles-allcontainer">
      <div className="article-info">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HZ5ITD8zf_5JiB4xF5h4C5_8s-8DY8RGCFeP9WqTo4CcVRAkNUyGOamSamWS90eXoA&usqp=CAU"
          alt=""
        />
        <div className="single-article">
          <div className="title-wrap">
            <h1 className="single-article-title">
              {items.headline && items.headline.main}
            </h1>
          </div>

          <div className="category-description">
            <div className="single-category common">
              <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
                category: {items && items.subsection_name}
              </h3>
            </div>
            <div className="single-description common">
              <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
                description:
              </h3>
              {items && items.lead_paragraph}
            </div>
          </div>
        </div>
      </div>
      <div className="article-container">
        <WhatsappShareButton
          title="Share Content"
          url={`https://www.newyorktime.com/${location.search.slice(3)}`}
        >
          <WhatsappIcon lightingColor="white" round={true}></WhatsappIcon>
        </WhatsappShareButton>
        <FacebookShareButton
          url={`https://www.newyorktime.com/${location.search.slice(3)}`}
          quote={"Hey"}
          hashtag="#React"
          style={{ marginRight: "10px", marginLeft: "10px" }}
        >
          <FacebookIcon lightingColor="white" round={true} />
        </FacebookShareButton>

        <EmailShareButton
          url={`https://www.newyorktime.com/${location.search.slice(3)}`}
          quote={"Hey"}
          subject="subject"
          hashtag="#React"
          body={
            "hey there, pls share my link" + <a href="www.example.com">Link</a>
          }
          style={{ marginRight: "10px" }}
        >
          <EmailIcon lightingColor="white" round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
}
