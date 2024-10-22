require('dotenv').config;
function capitalizeFirstLetter(string) {
  return string.length ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

module.exports = capitalizeFirstLetter;