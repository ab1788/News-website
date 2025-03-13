const apiKey = '30afe7d391754c2bac69688216c78b06';
const url = `https://newsapi.org/v2/everything?q=india&sortBy=popularity&apiKey=${apiKey}`;


document.addEventListener("DOMContentLoaded", fetchNews);

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image" class="news-image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available"}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
    newsContainer.appendChild(newsItem);
  });
}

function filterNews() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const newsItems = document.querySelectorAll(".news-item");
  newsItems.forEach(item => {
    const title = item.querySelector("h3").innerText.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
