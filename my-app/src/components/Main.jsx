import React, { useEffect, useState } from "react";
import CurrencyField from "./CurrencyField";

let myHeaders = new Headers();
myHeaders.append("apikey", process.env.REACT_APP_FIREBASE_API_KEY);

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export default function Main() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) { 
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols${toCurrency}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setExchangeRate(result.rates[toCurrency]))
        .catch((error) => console.log("error", error));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
      .catch((error) => console.log("error", error));
  }, []);
  
  return (
    <main className="main">
      <div className="content">
        <span className="text">1 {fromCurrency} equals</span>
        <h1>
          {exchangeRate !== undefined ? exchangeRate.toFixed(2) : 1}{" "}
          {toCurrency}
        </h1>
        <CurrencyField
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <CurrencyField
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </main>
  );
}
