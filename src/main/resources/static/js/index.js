import {Product} from "../classes/product.js";

let productsContainer = document.getElementById("products");
let products = [];

console.log("Get all products")
if (sessionStorage.getItem("products") != null) {
    console.log("products sessionStorage is not empty");
    products = JSON.parse(sessionStorage.getItem("products"));
} else {
    console.log("products sessionStorage is empty, retrieving products from database");

    try {
        const response = await fetch("/product/all");
        if (!response.ok) {
            console.log("All products: response is error; Status code: " + response.status);
        }

        const json = await response.json();
        console.log("All products: got a json response; " + JSON.stringify(json));

        const jsonValues = Object.values(json);
        jsonValues.forEach(data => {
            const product = new Product();
            product.setValues(data);
            products.push(product)
        });
    } catch (error) {
        console.error("Something went wrong retrieving all products:", error);
    }
}

// Show Products
let generateProducts =()=>{
    return (productsContainer.innerHTML = products.map((product)=>{
        return `
        <a href="/product?id=${product.id}" class="product">
        <img class="product-image" src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
        <div class="product-text">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
        </div>
        <div class="status">
            <!--<div class="status-background"></div>
            <span class="status-text">${product.status}</span>-->
        </div>
        <button onclick="addToCart(${product.id})" class="cartDirectButton">
            <img src="./icons/cart-outline.svg" class="cartDirectImg" alt="Cart Icon">
        </button>
        </a>
        `;
    }).join(""));
}

if (products.length > 0) {
    generateProducts();

    let buttons = document.querySelectorAll('.cartDirectButton');
    buttons.forEach(cartButton => {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
        })
    });

    document.getElementById('loader').style.display = "none";
} else {
    console.log("No products found");
}

