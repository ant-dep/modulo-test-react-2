import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { Link } from "react-router-dom";

function Header() {
  const { basket } = useContext(AppContext);
  const [basketLength, setBasketLength] = useState(0);
  useEffect(() => {
    let length = 0;
    basket?.map((item) => (length += parseInt(item.quantity)));
    setBasketLength(length);
    console.log(basketLength);
    console.log(basket, "basket");
  }, [basket, basketLength]);

  return (
    <header>
      <Link to="/">Accueil</Link>
      <Link to="/panier">
        Panier {basket.length > 0 && <span>{basketLength}</span>}
      </Link>
    </header>
  );
}

export default Header;
