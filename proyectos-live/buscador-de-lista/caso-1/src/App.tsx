import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";

// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const CURRENT_LOCALE = 'es-ES'
const CURRENT_CURRENCY = 'ARS'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map(({ id, title, description, price }) => (
          <li key={id}>
            <h4>{title}</h4>
            <p>{description}</p>
            <span>
              {new Intl.NumberFormat(CURRENT_LOCALE, {
                style: 'currency',
                currency: CURRENT_CURRENCY,
              }).format(price)}
            </span>

          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
