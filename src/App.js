import react, { component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { renderIntoDocument } from "react-dom/test-utils";

import { CardList } from "./Components/Card-list/card-list.component";
import { SearchBox } from "./Components/searchBox/searchBox.component";
class App extends react.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  handleChange = (e) => this.setState({ searchField: e.target.value });

  async componentDidMount() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await res.json();
    this.setState({ monsters: data });
  }
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((cur) =>
      cur.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1> Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
