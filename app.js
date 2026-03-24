const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const fromCurr = document.querySelector("#from-currency");
const toCurr = document.querySelector("#to-currency");
const amountInput = document.querySelector("#amount");
const resultDiv = document.querySelector("#result");
const rateInfoDiv = document.querySelector("#rate-info");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");
const swapBtn = document.querySelector("#swap-btn");

let currencyList = [];
let debounceTimer = null;
let exchangeRates = {};

const currencyToCountry = {
  USD: "US", EUR: "EU", GBP: "GB", JPY: "JP", AUD: "AU", CAD: "CA", CHF: "CH",
  CNY: "CN", HKD: "HK", NZD: "NZ", SEK: "SE", KRW: "KR", SGD: "SG", NOK: "NO",
  MXN: "MX", INR: "IN", RUB: "RU", ZAR: "ZA", TRY: "TR", BRL: "BR", TWD: "TW",
  DKK: "DK", PLN: "PL", THB: "TH", IDR: "ID", HUF: "HU", CZK: "CZ", ILS: "IL",
  CLP: "CL", PHP: "PH", AED: "AE", COP: "CO", SAR: "SA", MYR: "MY", RON: "RO",
  PKR: "PK", EGP: "EG", VND: "VN", BDT: "BD", NGN: "NG", ARS: "AR", MAD: "MA"
};

const loadCurrencies = async () => {
  try {
    resultDiv.innerText = "Loading...";
    
    const response = await fetch(`${BASE_URL}/USD`);
    const data = await response.json();
    exchangeRates = data.rates;
    currencyList = Object.keys(exchangeRates);

    const fromSelect = document.querySelector("#from-currency");
    const toSelect = document.querySelector("#to-currency");
    
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";
    
    for (let currCode of currencyList) {
      let fromOption = document.createElement("option");
      fromOption.innerText = currCode;
      fromOption.value = currCode;
      if (currCode === "USD") fromOption.selected = "selected";
      fromSelect.appendChild(fromOption);
      
      let toOption = document.createElement("option");
      toOption.innerText = currCode;
      toOption.value = currCode;
      if (currCode === "PKR") toOption.selected = "selected";
      toSelect.appendChild(toOption);
    }

    fromSelect.addEventListener("change", () => {
      updateFlag(fromSelect, fromFlag);
      updateExchangeRate();
    });
    
    toSelect.addEventListener("change", () => {
      updateFlag(toSelect, toFlag);
      updateExchangeRate();
    });

    updateFlag(fromSelect, fromFlag);
    updateFlag(toSelect, toFlag);
    updateExchangeRate();
  } catch (error) {
    resultDiv.innerText = "Error loading currencies";
    console.error("Error:", error);
  }
};

const updateExchangeRate = async () => {
  let amtVal = amountInput.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amountInput.value = "1";
  }

  try {
    const fromRate = exchangeRates[fromCurr.value];
    const toRate = exchangeRates[toCurr.value];
    const rate = toRate / fromRate;
    let finalAmount = amtVal * rate;
    let formattedAmount = finalAmount.toLocaleString('en-US', { maximumFractionDigits: 4 });
    
    resultDiv.innerText = `${amtVal} ${fromCurr.value} = ${formattedAmount} ${toCurr.value}`;
    rateInfoDiv.innerText = `1 ${fromCurr.value} = ${rate.toFixed(4)} ${toCurr.value}`;
  } catch (error) {
    resultDiv.innerText = "Error fetching rate";
    console.error("Error:", error);
  }
};

const updateFlag = (select, img) => {
  let currCode = select.value;
  let countryCode = currencyToCountry[currCode] || "UN";
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

swapBtn.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr, fromFlag);
  updateFlag(toCurr, toFlag);
  updateExchangeRate();
});

amountInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateExchangeRate, 500);
});

amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") updateExchangeRate();
});

window.addEventListener("load", loadCurrencies);
