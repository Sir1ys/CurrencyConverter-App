import React from "react";

export default function CurrencyField(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <div className="block block-input">
      <input
        type="number"
        className="input"
        value={isNaN(amount) ? 1 : amount}
        onChange={onChangeAmount}
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        className="select"
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
