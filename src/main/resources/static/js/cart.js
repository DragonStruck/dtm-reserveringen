import {Device} from "../classes/device.js";

let cartContainer = document.getElementById("cart");
let cartLocalStorage;
let cart = [];

try {
    cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cartLocalStorage.items.length; i++) {
        let device = new Device();
        cart.push(await device.fetch(cartLocalStorage.items[i]));
    }
} catch (ex) {
    console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
}

// Show Cart

let generateCart =()=>{
    return (cartContainer.innerHTML = cart.map((product)=>{
        return `
        <div class="product">
            <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
            <div class="about">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
            </div>
            <div class="actions">
                <button id="delete${product.id}"><img src="./icons/trash-outline-white.svg" alt="Delete Icon"> Verwijder</button>
            </div>
        </div>
        `;
    }).join(""));
}

if (cart.length > 0) {
    generateCart();
    document.getElementById('loader').style.display = "none";
} else {
    alert("No products in cart");
    document.getElementById('loader').style.display = "none";
    console.log("No products found");
}