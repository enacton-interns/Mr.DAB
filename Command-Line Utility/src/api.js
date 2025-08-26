require("dotenv").config();
const axios = require("axios");

async function getWeather(city) {
  const { API_URL, API_KEY } = process.env;
  try {
    const res = await axios.get(`${API_URL}?key=${API_KEY}&q=${city}`);
    console.log(res.data);
  } catch (err) {
    console.error("API error:", err.message);
  }
}

module.exports = { getWeather };
