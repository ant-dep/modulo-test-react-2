import { useContext, useState } from "react";
import { AppContext } from "../context";

function Panier() {
  const { items, basket, dispatchEvent } = useContext(AppContext);
  const [quantity, setQuantity] = useState();
  console.log(basket, "basket");
  console.log(items, "items");

  return (
    <>
      {basket?.length > 0 ? (
        <>
          <h1>Panier</h1>
          <div className="basket__container">
            {basket?.map((item) => {
              return (
                <div className="basket__item" key={item.id}>
                  <img
                    src={items[item.id - 1].thumbnailUrl}
                    alt={items[item.id - 1].title}
                  />
                  <h3>{items[item.id - 1].title}</h3>
                  <div className="products__inputGroup">
                    <input
                      type="number"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      min="1"
                      placeholder={item.quantity}
                    />
                    <button
                      onClick={() => {
                        dispatchEvent({
                          type: "MODIFY_BASKET",
                          payload: {
                            id: item.id,
                            quantity: parseInt(quantity),
                          },
                        });
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      id="products__inputGroup--delete"
                      onClick={() => {
                        dispatchEvent({
                          type: "REMOVE_FROM_BASKET",
                          payload: {
                            id: item.id,
                          },
                        });
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Panier vide</p>
      )}
    </>
  );
}

export default Panier;
