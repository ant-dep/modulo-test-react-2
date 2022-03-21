import { AppContext } from "./context";
import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Items from "./Items";
import Panier from "./Panier";

function App() {
  const [basket, setBasket] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        "https://jsonplaceholder.typicode.com/photos?albumId=1"
      );
      data = await data.json();
      console.log(data);
      setItems(data);
    }
    fetchData();
  }, []);

  const dispatchEvent = ({ type, payload }) => {
    switch (type) {
      case "ADD_TO_BASKET":
        setBasket([...basket, payload]);
        break;
      case "MODIFY_BASKET":
        setBasket(
          basket.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: payload.quantity }
              : item
          )
        );
        break;
      case "REMOVE_FROM_BASKET":
        setBasket(basket.filter((item) => item.id !== payload.id));
        break;
      case "LOAD_ITEMS":
        setItems(payload);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ items, basket, dispatchEvent }}>
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<Items />} />
            <Route exact path="/panier" element={<Panier />} />
          </Routes>
        </main>
      </AppContext.Provider>
    </div>
  );
}

export default App;
