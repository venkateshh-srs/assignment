import { useState, useEffect } from "react";
import "./App.css";

//Makes API call
async function getBeers() {
  const response = await fetch("https://api.punkapi.com/v2/beers");
  const res = await response.json();
  return res;
}
function App() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [beerData, setBeerData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredBeerData, setFilteredBeerData] = useState([]);

  //Side effect to filter beer data based on change of search text
  useEffect(() => {
    if (searchText === "") setFilteredBeerData(beerData);
    else {
      const filteredData = beerData.filter((beer) => {
        return beer.name.toLowerCase().includes(searchText.toLowerCase());
      });
      console.log(filteredData);
      setFilteredBeerData(filteredData);
    }
  }, [searchText]);

  //initialise beer data and filtered beerdata after API call 
  const handleBeerData = async () => {
    setButtonVisible(false);
    const data = await getBeers();
    setBeerData(data);
    setFilteredBeerData(data);
  };

  //Handles search text
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      {buttonVisible && (
        <button className="getbeers-btn" onClick={handleBeerData}>
          Get Beers
        </button>
      )}
      {!buttonVisible && (
        <input
          className="search"
          type="text"
          placeholder="Type to search"
          onChange={handleSearchChange}
        />
      )}
      <div className="beer-card-container">
        {/*skeleton of each card */}
        {filteredBeerData.map((item) => (
          <div className="beer-card" key={item.id}>
            <h3 className="beer-name">{item.name}</h3>
            <br />
            <img className="img" src={`${item.image_url}`} width={"90px"} />
            <div className="tag">#{item.tagline}</div>
            <br />
            <div className="pairing-heading">Pairing:</div>
            <div className="pairing">
              {item.food_pairing.map((itemm) => (
                <div key={itemm}>{itemm}</div>
              ))}
            </div>
            <br />
            <div className="description-heading">Description:</div>
            <div className="description">{item.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
