import React from "react";
import "./App.css";
import Header from "./components/header";
import MainContent from "./components/mainContent";
import Footer from "./components/footer";
import Article from "./components/Article";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArticleContextProvider } from "./Context/ArticleContext";
function App() {
  return (
    <div className="container">
      <ArticleContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Header />
                  <MainContent />
                  <Footer />
                </>
              }
            />
            <Route
              path="/article"
              exact
              element={
                <>
                  <Header />
                  <Article />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </ArticleContextProvider>
    </div>
  );
}

export default App;
