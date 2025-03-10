const express = require("express");
const app = express();
const port = 8080;

// Load category data from the JSON file
const categories = require("./categories.json");

// Define the /categories endpoint
app.get("/categories", (req, res) => {
  const categoryTree = buildCategoryTree(categories);
  res.json(categoryTree);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function buildCategoryTree(categories) {
  const map = {};
  const roots = [];

  // Create a mapping of categoryId to category objects, initializing an empty children array for each
  categories.forEach((category) => {
    map[category.categoryId] = { ...category, children: [] };
  });

  // Build the tree structure by assigning children to their respective parents
  categories.forEach((category) => {
    if (category.parent === "root") {
      // If the category has no parent (i.e., its parent is "root"), add it to the roots array
      roots.push(map[category.categoryId]);
    } else {
      // Otherwise, find its parent in the map and add it to the parent's children array
      if (map[category.parent]) {
        map[category.parent].children.push(map[category.categoryId]);
      }
    }
  });

  // Return the root category object with its children
  return {
    categoryId: "root",
    name: "Root Category",
    parent: null,
    children: roots,
  };
}
