import React, { useEffect, useState } from "react";
import { Pagination, Input, Tabs } from "antd";

import { debounce } from "lodash";
import MovieList from "../MovieList/MovieList";
import { GenresProvider } from "../Context/Context";
import { getMovies, genre, seachId, ratingFilms } from "../logic/ApiLogic";
import "./App.css";

function App() {
  const [err, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [results, setItems] = useState([]);

  const [genres, setGenres] = useState([]);
  const [rate, setRate] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    seachId();
    genre(setGenres);

    getMovies("return",3,setIsLoaded,setItems,setError
    );
  }, []);
  function pagination(page) {
    getMovies("return", page, setIsLoaded, setItems, setError);
  }
  const onChange = (e, page) => {
    if (e !== "") {
      getMovies(e, page, setIsLoaded, setItems, setError);
    }
  };

  const timeOut = debounce(onChange, 1000);

  return (
    <GenresProvider value={genres}>
      <section className="moviesapp">
        <section className="filmswrapper">
          <Tabs
            defaultActiveKey="1"
            onChange={(e) => {
              if (e === "2") ratingFilms(setRate);
            }}
          >
            <Tabs.TabPane tab="Search" key="1">
              <Input
                value={input}
                className="film__input"
                placeholder="Type to search..."
                label="query"
                onChange={(e) => {
                  setInput(e.target.value);
                  timeOut(e.target.value);
                }}
              />
              <MovieList err={err} isLoaded={isLoaded} results={results} />

              <Pagination onChange={pagination} size="small" total={50} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated"  key="2">
              <MovieList results={rate} />
            </Tabs.TabPane>
          </Tabs>
        </section>
      </section>
    </GenresProvider>
  );
}

export default App;
