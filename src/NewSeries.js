import React, { useState, useEffect } from "react";

import api from "./Api";

const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
};

function NewSeries() {
  const [form, setForm] = useState({
    name: "",
    comments: "",
    status: "",
    genre: ""
  });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api.loadGenres().then(res => {
      setGenres(res.data);
    });
  }, []);

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const saveSeries = () => {
    api.saveSeries(form).then(res => console.log(res));
  };

  return (
    <div>
      <section className="intro-section">
        <h1>Nova Série</h1>
        <form action="">
          Nome:
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Nome da Série"
            value={form.name}
            onChange={onChange("name")}
          />
          <br />
          Status:
          <select
            name="status"
            className="form-control"
            id="status"
            value={form.status}
            onChange={onChange("status")}
          >
            {Object.keys(statuses).map(key => (
              <option key={key} value={key}>
                {statuses[key]}
              </option>
            ))}
          </select>
          <br />
          Gêneros:
          <select
            name="genre"
            className="form-control"
            id="genre"
            value={form.genre}
            onChange={onChange("genre")}
          >
            {genres.map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <br />
          Comentários:
          <textarea
            name="comments"
            className="form-control"
            id="comments"
            placeholder="Comentário"
            value={form.comments}
            onChange={onChange("comments")}
          ></textarea>
          <br />
          <button type="button" onClick={saveSeries}>
            Salvar
          </button>
          <br />
        </form>
      </section>
    </div>
  );
}

export default NewSeries;
