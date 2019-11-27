import React from 'react';
import logo from './logo512.png'; // Image courtesy of publicdomainvectors.org
import './App.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      fname: "Chuck",
      lname: "Norris"
    };
  }

  // Get joke with or without custom name
  fetchJoke = (params) => {
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

  // Toggle display of search fields
  toggleInput = () => {
    let container = document.getElementById("search");
    let curr = container.style.display;
    if (curr === "none" || curr === "") {
      container.style.display = "block";
      container.setAttribute("class", "slide-down");
      document.getElementById("searchBtn").innerHTML = "Search Joke ⇣";
    }
    else {
      container.style.display = "none";
      document.getElementById("searchBtn").innerHTML = "Search Joke ⇡";
    }
  }

  // Display html
  render() {
  return (
    <div id="app">
      <header>
        <img src={logo} alt="Chuck Norris"/>
        <h1>{this.state.fname} {this.state.lname} Facts</h1>
        <p id="joke"></p>

        <div id="buttons">
          <button type="button" id="randomBtn" onClick={() => this.fetchJoke()}>
            Random Joke
          </button>
          <button type="button" id="searchBtn" onClick={() => this.toggleInput()}>
            Search Joke ⇡
          </button>
        </div>
        
        <a id="footer" href="https://github.com/JoeParker" target="_blank" rel="noopener noreferrer">
          Made by Joe Parker
        </a> 
      </header>

      <div id="search">
        <input type="text" name="fname" placeholder="(first name)" onChange={this.updateName}/>
        <input type="text" name="lname" placeholder="(last name)" onChange={this.updateName}/>
        <button type="submit" onClick={() => this.fetchJoke("?firstName=" + this.state.fname + "&lastName=" + this.state.lname)}>
          Search
        </button>
        <button type="button" id="close" onClick={() => this.toggleInput()}>
            X
        </button>
      </div>
    </div>
    );
  }
}

export default App;
