import {Account} from "../classes/account.js";
import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "../classes/storageManager.js";
import {Cart} from "../classes/cart.js";

let productsContainer = document.getElementById("products");
sessionStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(new Account(1, 1, "test@mail.com", "test1")));
const cart = new Cart();

//get all products
const products = await StorageManager.getAllProducts();

//display all the product tiles on the home page
if (products.length > 0) {
    products.forEach(product => {
        productsContainer.innerHTML += product.generateProductTile();
    });

    let buttons = document.querySelectorAll('.cartDirectButton');
    buttons.forEach((cartButton, index) => {
        //when a product is removed, the id's won't be ascending by the same amount, so need to use the productId
        const productId = products[index].id;
        cartButton.addEventListener('click', e => {
            e.preventDefault();
            cart.addToCart(productId);
        })
    });

    document.getElementById('loader').style.display = "none";
} else {
    console.log("No products found");
}

