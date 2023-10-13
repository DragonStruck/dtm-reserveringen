import {Product} from "../classes/product.js";
import {Account} from "../classes/account.js";
import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "../classes/storageManager.js";
import {Cart} from "../classes/cart.js";

let productsContainer = document.getElementById("products");
sessionStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(new Account(1, 1, "test@mail.com", "test1")));
const cart = new Cart();

//get all products
const productJson = await StorageManager.getProductsFromStorage();
const products = JSON.parse(productJson).map(productData => {
    const product = new Product();
    product.setValuesFromObject(productData);
    console.log(product);
    return product;
});

//display all the product tiles on the home page
if (products.length > 0) {
    products.forEach(product => {
        productsContainer.innerHTML += product.generateProductTile();
    });

    let buttons = document.querySelectorAll('.cartDirectButton');
    buttons.forEach((cartButton, index) => {
        cartButton.addEventListener('click', e => {
            e.preventDefault();
            cart.addToCart(index + 1);
        })
    });

    document.getElementById('loader').style.display = "none";
} else {
    console.log("No products found");
}

