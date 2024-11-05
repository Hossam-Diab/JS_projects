let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let tbody = document.getElementById("tbody");
let deleteAllBox = document.getElementById("deleteAllBox");

let searchInp = document.getElementById("searchInp");

let searchMode = "searchByTitle";
let mode = "create";
let tmp;

// checking on existing data
let productsData;
if (localStorage.products != null) {
  productsData = JSON.parse(localStorage.products);
} else {
  productsData = [];
}

//get total

function getTotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#8f1111";
  }
}

// creating element
submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    +count.value < 150
  ) {
    if (mode === "create") {
      if (+count.value >= 1) {
        for (let i = 0; i < +count.value; i++) {
          productsData.push(newProduct);
        }
      } else {
        productsData.push(newProduct);
      }
    } else {
      productsData[tmp] = newProduct;

      submit.innerHTML = `Create`;
      count.style.display = "block";
      mode = "create";
    }

    localStorage.products = JSON.stringify(productsData);

    clearData();
  }

  showData();
};

// clear data from inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  getTotal();
  category.value = "";
  count.value = "";
}

function showData() {
  tbody.innerHTML = "";
  if (productsData.length > 0) {
    for (let i = 0; i < productsData.length; i++) {
      tbody.innerHTML += `
         <tr>
              <td>${i + 1}</td>
              <td>${productsData[i].title}</td>
              <td>${productsData[i].price}</td>
              <td>${productsData[i].taxes}</td>
              <td>${productsData[i].ads}</td>
              <td>${productsData[i].discount}</td>
              <td>${productsData[i].total}</td>
              <td>${productsData[i].category}</td>
              <td><button id="update" onclick="updateElement(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteElement(${i})">Delete</button></td>
            </tr>
            `;
    }

    deleteAllBox.style.display = "block";

    deleteAllBox.innerHTML = `<button onclick="deleteAll()" id="deleteAllBtn">
                    Delete all (${productsData.length})</button>`;
  } else {
    deleteAllBox.style.display = "none";
  }
}
showData();

//update elements

function updateElement(index) {
  clearData();
  tmp = index;
  mode = "update";
  title.value = productsData[index].title;
  price.value = productsData[index].price;
  taxes.value = productsData[index].taxes;
  ads.value = productsData[index].ads;
  discount.value = productsData[index].discount;
  category.value = productsData[index].category;

  getTotal();

  submit.innerHTML = `Update Element #${tmp + 1}`;
  count.style.display = "none";

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete elements
function deleteElement(index) {
  productsData.splice(index, 1);
  localStorage.products = JSON.stringify(productsData);
  showData();
}

function deleteAll() {
  productsData = [];
  localStorage.clear();
  showData();
}

//search

function searchBy(x) {
  if (x === "searchByTitle") {
    searchMode = "searchByTitle";
    searchInp.placeholder = "Search by Title";
  } else {
    searchMode = x;
    searchInp.placeholder = "Search by Category";
  }
}

function search(value) {
  if (value != "") {
    tbody.innerHTML = "";
    for (let i = 0; i < productsData.length; i++) {
      if (searchMode === "searchByTitle") {
        if (productsData[i].title.toLowerCase().includes(value.toLowerCase())) {
          tbody.innerHTML += `
         <tr>
              <td>${i + 1}</td>
              <td>${productsData[i].title}</td>
              <td>${productsData[i].price}</td>
              <td>${productsData[i].taxes}</td>
              <td>${productsData[i].ads}</td>
              <td>${productsData[i].discount}</td>
              <td>${productsData[i].total}</td>
              <td>${productsData[i].category}</td>
              <td><button id="update" onclick="updateElement(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteElement(${i})">Delete</button></td>
            </tr>
            `;
        }
      } else if (searchMode === "searchByCategory") {
        if (
          productsData[i].category.toLowerCase().includes(value.toLowerCase())
        ) {
          tbody.innerHTML += `
             <tr>
                  <td>${i + 1}</td>
                  <td>${productsData[i].title}</td>
                  <td>${productsData[i].price}</td>
                  <td>${productsData[i].taxes}</td>
                  <td>${productsData[i].ads}</td>
                  <td>${productsData[i].discount}</td>
                  <td>${productsData[i].total}</td>
                  <td>${productsData[i].category}</td>
                  <td><button id="update" onclick="updateElement(${i})">Update</button></td>
                  <td><button id="delete" onclick="deleteElement(${i})">Delete</button></td>
                </tr>
                `;
        }
      }
    }
  } else {
    showData();
  }
}
