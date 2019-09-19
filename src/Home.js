import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "./Api";

function Home() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    api.loadGenres().then(res => {
      setIsLoading(false);
      setGenres(res.data);
    });
  }, []);

  const renderGenreLink = genre => {
    return (
      <span key={genre}>
        &nbsp;<Link to={`/series/${genre}`}>{genre}</Link>&nbsp;
      </span>
    );
  };
  return (
    <div>
      <section id="intro" className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>
                <img src="images/logo.png" alt="" />
              </h1>
              <p>
                Nunca mais esqueça uma série que você assistiu ou que alguém lhe
                indicou.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {isLoading && <span>Aguarde, carregando...</span>}
        {!isLoading && (
          <div className="container">
            Ver séries do gênero:
            {genres.map(renderGenreLink)}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
