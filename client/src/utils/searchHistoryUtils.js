export const addToSearchHistory = (sentence) => {
  const searchHistory = JSON.parse(window.localStorage.getItem("searchHistory"));

  if (!searchHistory) {
    window.localStorage.setItem("searchHistory", JSON.stringify([sentence]));
    return;
  }

  searchHistory.unshift(sentence);

  if (searchHistory.length > 30) {
    searchHistory.pop();
  }

  window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

export const getSearchHistory = () => {
  const searchHistory = JSON.parse(window.localStorage.getItem("searchHistory"));

  return searchHistory.join(" ");
}