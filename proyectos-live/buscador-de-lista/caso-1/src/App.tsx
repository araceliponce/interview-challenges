import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";
import { getLocalStorageData, setLocalStorageData } from "./functions";

// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const CURRENT_LOCALE = 'es-ES';
const CURRENT_CURRENCY = 'ARS';
const KEY_LS = 'data-digitalgoncy';
// localStorage.removeItem('data-digitalgoncy');

function App() {

  const [preferences] = useState(() =>
    getLocalStorageData(KEY_LS, {
      query: '',
      ascendingChars: undefined,
      ascendingPrice: undefined,
    })
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(preferences.query);
  const [ascendingChars, setAscendingChars] = useState<boolean | undefined>(
    preferences.ascendingChars ?? undefined
  );
  const [ascendingPrice, setAscendingPrice] = useState<boolean | undefined>(
    preferences.ascendingPrice ?? undefined
  );

  useEffect(() => {
    // api.search(query).then(setProducts);
    api.search(query).then((results) => {
      setProducts(sortProducts(results));
    });
  }, [query]);

  // reapply sorting whenever the preference changes
  useEffect(() => {
    setProducts((prev) => sortProducts(prev));
  }, [ascendingChars, ascendingPrice]);

  useEffect(() => {
    setLocalStorageData(KEY_LS, {
      query,
      ascendingChars,
      ascendingPrice,
    });
  }, [query, ascendingChars, ascendingPrice]);

  const sortProducts = (products: Product[]) => {
    const sorted = [...products];

    if (ascendingPrice !== undefined) {
      sorted.sort((actual, next) => {
        if (ascendingPrice) return actual.price - next.price;
        else return next.price - actual.price;
      });
    }

    if (ascendingChars !== undefined) {
      sorted.sort((actual, next) => {
        if (ascendingChars) return next.title.localeCompare(actual.title);
        else return actual.title.localeCompare(next.title);
      });
    }

    return sorted;
  };

  const toggleSortByPrice = () => {
    setAscendingPrice((prev) => !prev);
    setAscendingChars(undefined);
  };

  const toggleSortByChars = () => {
    setAscendingChars((prev) => !prev);
    setAscendingPrice(undefined);
  };

  const arrowSymbol = (value: boolean | undefined) => {
    return value == undefined ? '-' : value == true ? '↑' : '↓';
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <div className="flex"><input name="text" placeholder="tv" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="flex">
          <button type="button" onClick={toggleSortByChars}>
            <span>a-z</span>
            {arrowSymbol(ascendingChars)}
          </button>
          <button type="button" onClick={toggleSortByPrice}>
            <span>precio</span>
            {arrowSymbol(ascendingPrice)}
          </button>
        </div></div>
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
