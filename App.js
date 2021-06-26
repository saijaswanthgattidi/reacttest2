import "./App.css";
import React, { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [locdata, setLocdata] = useState([]);
  const [error, setError] = useState(false);
  const fetchData = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => console.log(e));
  };
  const getTemp = async () => {
    setError(false);
    const data = await fetchData(
      `https://api.github.com/search/repositories?q=${searchInput}`
    );
    console.log(data);
    setLocdata(data.items);
  };
  // full_name, description, forks_count, open_issues_count, html_url,
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={getTemp}>GetData</button>
      <table>
        <th>
          <td>FULL-NAME</td>
          <td>DESCRIPTION</td>
          <td>FORKS-COUNT</td>
          <td>OPEN_ISSUES-COUNT</td>
          <td>URL</td>
        </th>
      </table>
      {error === true ? (
        <h1>ERROR</h1>
      ) : (
        locdata.map((item) => {
          return (
            <tr>
              <td>{item.full_name}</td><br></br>
              <td>{item.description}</td>
              <td>{item.forks_count}</td>
              <td>{item.open_issues_count}</td>
              <td>{item.html_url}</td>
            </tr>
          );
        })
      )}
    </div>
  );
}

export default App;