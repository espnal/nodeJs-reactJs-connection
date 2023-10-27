/* eslint-disable no-unused-vars */
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/add", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,age,country}),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((item) => setData(item));
  }, []);

  return (
    <div className="App">
      <div className="input-area">
        <h2>Add More Data</h2>
        <div className="form-area">
          <form onSubmit={handleSubmit}>
            <div className="input-1">
              <span>Add Name</span>
              <input
                value={name}
                placeholder="Enter Person Name..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-2">
              <span>Add Age</span>
              <input
                value={age}
                placeholder="Enter Person Age.."
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input-3">
              <span>Add Country</span>
              <input
                value={country}
                placeholder="Enter Person Country..."
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <button type="submit">Save Data</button>
          </form>
        </div>
      </div>
      <div className="display-area">
        <h2>Data From Api Displayed down below</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;