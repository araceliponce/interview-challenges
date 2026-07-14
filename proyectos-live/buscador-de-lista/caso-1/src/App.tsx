import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";

// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const CURRENT_LOCALE = 'es-ES'
const CURRENT_CURRENCY = 'ARS'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [ascendingChars, setAscendingChars] = useState<boolean | undefined>(undefined) //
  const [ascendingPrice, setAscendingPrice] = useState<boolean | undefined>(undefined) //


  useEffect(() => {
    api.search(query).then(setProducts);

  }, [query]);
  // const handleSearch = (e: any) => {
  //   setQuery(e.target.value)
  //   let tempProducts = products.filter((data) => {
  //     return data.title.toLocaleLowerCase().includes(query.toLowerCase())
  //   })
  //   setProducts(tempProducts)
  // }


  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  const toggleSortByPrice = () => {

    setProducts(() => [...products].sort((actual, next) => {
      if (ascendingPrice) return actual.price - next.price;
      else return next.price - actual.price;

    }))

    setAscendingPrice((prev) => !prev)
    setAscendingChars(undefined)
  }

  const toggleSortByChars = () => {

    setProducts(() => [...products].sort((actual, next) => {
      if (ascendingChars) return next.title.localeCompare(actual.title);
      else return actual.title.localeCompare(next.title);
    }))

    setAscendingChars((prev) => !prev)
    setAscendingPrice(undefined)
  }


  const arrowSymbol = (value: boolean | undefined) => {
    return value == undefined ? '-' : ascendingPrice == true ? '↑' : '↓'
  }

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <div>
        <button type="button" onClick={toggleSortByChars}>
          a-z
          {arrowSymbol(ascendingChars)}
        </button>
        <button type="button" onClick={toggleSortByPrice}>
          precio
          {arrowSymbol(ascendingPrice)}
        </button>
      </div>
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
