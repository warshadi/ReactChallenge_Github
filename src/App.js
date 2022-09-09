import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apis, setapis] = useState({});
  const [repos, setrepos] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.github.com/users/warshadi?client_id=01f66adcc33dcc4c7990&client_secret=7db31754076bcc4c7cf50dc8a33d12c09baad34f&sort=created"
      )
      .then((res) => {
        setapis(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("https://api.github.com/users/warshadi/repos")
      .then((repos) => setrepos(repos.data))
      .catch((err) => console.log(err));
  });
  let imag = apis.avatar_url
  return (
    <div className="App">
      <div className="container">
        <img src={imag} alt="person_photo"/>
        <div className="details">
          <p>FullName: <span>{apis.name}</span></p>
          <p>UserName: <span>{apis.login}</span></p>
          <p>Location: <span>{apis.location}</span></p>
          <p>email: <span>{apis.email}</span></p>
        </div>
      </div>
      <h2>User Repos</h2>
      <ul className="repo-name">
        {repos.map((item) => {
          return <li key={item.id}>
            <a href={'https://github.com/' + item.full_name}>{item.name}</a>
            </li>;
        })}
      </ul>
    </div>
  );
}
export default App;
