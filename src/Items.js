import { useContext, useState } from "react";
import { AppContext } from "./context";

function Items() {
  const { items, dispatchEvent } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      {items?.length > 0 ? (
        <>
          <h1>Mes Produits</h1>
          <div className="products__container">
            {items?.map((item) => {
              return (
                <div className="products__item" key={item.id}>
                  <img src={item.thumbnailUrl} alt={item.title} />
                  <h3>
                    {item.title.length > 20
                      ? item.title.substr(0, 60) + "..."
                      : item.title}
                  </h3>
                  <div className="products__inputGroup">
                    <input
                      type="number"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      min="1"
                      placeholder="Quantité"
                    />
                    <button
                      onClick={() => {
                        dispatchEvent({
                          type: "ADD_TO_BASKET",
                          payload: {
                            id: item.id,
                            quantity: parseInt(quantity),
                          },
                        });
                      }}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </>
  );
}

export default Items;
