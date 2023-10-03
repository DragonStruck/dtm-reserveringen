import {Device} from "./device.js";

let productsContainer = document.getElementById("products");

// Get amount of products

let amount;
try {
    console.log("Product amount")
    const response = await fetch("/product/amount");
    console.log("Product amount: response is ok? " + response.ok + " Status code " + response.status);

    const json = await response.json();
    console.log("Product amount: got a json response; " + JSON.stringify(json));
    amount = json;
}
catch (ex) {
    console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
}

// Get products

// sessionStorage.removeItem("products");

let products = [];

if (sessionStorage.getItem("products") != null) {
    console.log("products sessionStorage is not empty");

    products = JSON.parse(sessionStorage.getItem("products"));

} else {
    console.log("products sessionStorage is empty, retrieving products from database");

    try {
        for (let i = 0; i < amount; i++) {
            let device = new Device();
            await device.fetch(i + 1);
            products.push(device);
        }
        console.log("print print print print")
        console.log(products[0]);
        sessionStorage.setItem("products", JSON.stringify(products));
    } catch (ex) {
        console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
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
        </a>
        `;
    }).join(""));
}

if (products.length > 0) {
    generateProducts();
    document.getElementById('loader').style.display = "none";
} else {
    console.log("No products found");
}

