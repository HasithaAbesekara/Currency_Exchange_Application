import React, { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  //state in from fiiled

  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargatCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSocurceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargateCurrency] = useState(0);
  const [loding, setLoding] = useState(true);

  const [currencyNames, setCurrencyNames] = useState([]);

  //handle submit method

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposn = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      //Todu set the rest....
      setAmountInTargateCurrency(resposn.data);
      setLoding(false);
    } catch (err) {
      console.error(err);
    }
  };

  //get all curecny name

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const resposns = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(resposns.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);
  return (
    <div>
      <h1 className="lg:mx-32  text-5xl font-black flex items-center justify-normal text-yellow-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 font-sm opacity-40 py-6">
        Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.
      </p>
      <div className=" mt-5 flex items-center justify-center flex-col">
        <section className=" w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="Date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
              >
                <option value="">Select source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1 " key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
                onChange={(e) => setTargatCurrency(e.target.value)}
              >
                <option value="">Select Target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1 " key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in source currency
              </label>
              <input
                type="text"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                onChange={(e) => setAmountInSocurceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Amount in source currency"
              />
            </div>
            <button className=" bg-yellow-500 text-black hover:bg-slate-500 hover:text-white font-medium py-2 px-4 rounded-md">
              Get the Currency
            </button>
          </form>
        </section>
      </div>

      {!loding ? (
        <section className=" mt-5 lg:mx-32 text-xl font-bold ">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to{" "}
          <span className=" text-yellow-500">{amountInTargetCurrency}</span>{" "}
          {currencyNames[targetCurrency]}
        </section>
      ) : null}
    </div>
  );
};

export default MainPage;
