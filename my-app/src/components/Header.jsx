import React, { useEffect, useState } from "react";

let myHeaders = new Headers();
myHeaders.append("apikey", process.env.REACT_APP_FIREBASE_API_KEY);

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export default function Header() {
  const [currencyEur, setcurrencyEur] = useState(0);
  const [currencyUsd, setcurrencyUsd] = useState(0);
  const [currencyGbp, setcurrencyGbp] = useState(0);

  const fetchRequest = (curr1, curr2, func) => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?base=${curr1}&symbols${curr2}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => func(result.rates[`${curr2}`]))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchRequest("EUR", "UAH", setcurrencyEur);
    fetchRequest("USD", "UAH", setcurrencyUsd);
    fetchRequest("GBP", "UAH", setcurrencyGbp);
  }, []);

  return (
    <header className="header">
      <div className="block block-logo">
        <h1>Currency Converter</h1>
      </div>
      <div className="block block-currency">
        <div className="box">
          <span>EUR</span>=<span>{currencyEur.toFixed(2)} UAH</span>
        </div>
        <div className="box">
          <span>EUR</span>=<span>{currencyUsd.toFixed(2)} UAH</span>
        </div>
        <div className="box">
          <span>EUR</span>=<span>{currencyGbp.toFixed(2)} UAH</span>
        </div>
      </div>
    </header>
  );
}
