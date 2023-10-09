import {Product} from "../classes/product.js";

let productsContainer = document.getElementById("products");
let products = [];

console.log("Get all products")
if (sessionStorage.getItem("products") != null) {
    console.log("products sessionStorage is not empty");
    const productJson = sessionStorage.getItem("products");

    JSON.parse(productJson).forEach(productData => {
        const product = new Product();
        product.setValuesFromObject(productData);
        products.push(product);

    });
} else {
    console.log("products sessionStorage is empty, retrieving products from database");
    try {
        const response = await fetch("/product/all");
        if (!response.ok) {
            console.log("All products: response is error; Status code: " + response.status);
        }

        const json = await response.json();
        console.log("All products: got a json response");
        JSON.stringify(json)

        Object.values(json).forEach(data => {
            const product = new Product();
            product.setValuesFromJson(data);
            products.push(product)
        });

        sessionStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
        console.error("Something went wrong retrieving all products:", error);
    }
}

//display all the product tiles on the home page
if (products.length > 0) {
    products.forEach(product => {
        productsContainer.innerHTML += product.generateProductTile();
    });

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

