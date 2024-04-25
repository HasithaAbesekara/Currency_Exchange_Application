const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//midlle wares

app.use(express.json());
app.use(cors());
//all currenct
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=c8ffc0e1754444eba28e18cd90d8a022`;

  try {
    const namesResposn = await axios.get(nameURL);
    const nameDate = namesResposn.data;

    return res.json(nameDate);
  } catch (err) {
    console.error(err);
  }
});

//get the target amunt
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  try {
    const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=c8ffc0e1754444eba28e18cd90d8a022`;

    const dataReaspons = await axios.get(dataURL);
    const rates = dataReaspons.data.rates;

    //rates

    const sourceRate = rates[sourceCurrency];
    const targateRate = rates[targetCurrency];
    const targetAmout = (targateRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmout.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});

//listen to a prot

app.listen(5000, () => {
  console.log("Server started");
});
