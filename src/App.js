import React from 'react';
import logo from './logo512.png'; // './logo.svg';
import './App.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      fname: "Chuck",
      lname: "Norris"
    };
  }

  // Get random joke
  fetchJoke = () => {
    fetch("http://api.icndb.com/jokes/random")
    .then(
      response => response.json()
    )
    .then(
      data => document.getElementById("joke").innerHTML = data.value.joke
    )
    .catch(
      error => alert("Error fetching joke")
    );
  }

  // Get joke for custom name
  fetchCustom = () => {
    let params = "?firstName=" + this.state.fname + "&lastName=" + this.state.lname;
    let url = "http://api.icndb.com/jokes/random" + params;
    fetch(url)
    .then(
      response => response.json()
    )
    .then(
      data => document.getElementById("joke").innerHTML = data.value.joke
    )
    .catch(
      error => alert("Error fetching joke")
    );
  }

  // Check input is legal and update
  updateName = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    let legal = /^[A-Za-z]+$/;
    if (!val && name === "fname") {
      this.setState({fname: "Chuck"});  // Default set to Chuck Norris
    }
    else if (!val && name === "lname") {
      this.setState({lname: "Norris"});
    }
    else if (!val.match(legal)) { // Validate input and remove illegal char
      event.target.value = val.slice(0, val.length - 1);
      alert("Names may only contain alphabetical letters."); 
    }
    else {
      this.setState({[name]: val});
    }
  }

  // Toddle display of text fields
  toggleInput = () => {
    let container = document.getElementById("search");
    let curr = container.style.display;
    if (curr === "none" || curr === "") {
      container.style.display = "block";
    }
    else {
      container.style.display = "none";
    }
  }

  // Display html
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Chuck Norris"/>
        <h1>{this.state.fname} {this.state.lname} Facts</h1>
        <p id="joke"></p>
        <div id="buttons">
          <button type="button" onClick={() => this.fetchJoke()}>
            Random Joke
          </button>
          <button type="button" onClick={() => this.toggleInput()}>
            Search Joke
          </button>
        </div>
        <div id="search">
          <input type="text" name="fname" placeholder="(first name)" onChange={this.updateName}/>
          <input type="text" name="lname" placeholder="(last name)" onChange={this.updateName}/>
          <button type="submit" onClick={() => this.fetchCustom()}>
            Search
          </button>
        </div>
        <a className="App-link" href="https://github.com/JoeParker" target="_blank" rel="noopener noreferrer">
          Created by Joe Parker
        </a>
      </header>
    </div>
  );
  }
}

export default App;
