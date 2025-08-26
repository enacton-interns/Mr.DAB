function toUpperCase(str) {
  return str.toUpperCase();
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function wordCount(str) {
  return str.trim().split(/\s+/).length;
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

module.exports = { toUpperCase, toLowerCase, wordCount, isPalindrome };
