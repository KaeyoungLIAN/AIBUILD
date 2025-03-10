import fetch from "node-fetch";

async function fetchCategories() {
  const response = await fetch("http://localhost:8080/categories");
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchCategories();
