export const convertTime = (time) => {
  return `${Math.floor(time / 60)}hrs ${time % 60}mins`
}

export const convertGenres = (genres) => {
  const genreArr = JSON.parse(genres);
  
  return genreArr.map((genre) => genre.name).join(", ")
}

export const convertRevenue = (revenue) => {
  const convertedRevenue = revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split(".")[0]
  return `$ ${convertedRevenue}`
}