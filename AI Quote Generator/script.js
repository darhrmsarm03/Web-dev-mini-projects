const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteText = document.getElementById("quoteText");

// Set initial button state when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  setButtonDefault();
});

// Add event listener to fetch quote on click
getQuoteBtn.addEventListener("click", () => {
  setButtonLoading();
  getQuote();
});

// Function to set button to loading state
function setButtonLoading() {
  getQuoteBtn.classList.add("loading");
  getQuoteBtn.textContent = "Loading...";
}

// Function to reset button to default state
function setButtonDefault() {
  getQuoteBtn.classList.remove("loading");
  getQuoteBtn.textContent = "Get Quote";
}

// Async function to fetch and display quote
async function getQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    quoteText.innerHTML = `"${data.content}" - ${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.innerHTML = "Failed to fetch a quote. Please try again later.";
  } finally {
    setButtonDefault();
  }
}
