import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "./storageManager.js";

export class Cart {
    getCartFromStorage() {
        if (localStorage.getItem(StorageKeys.CART) === null) {
            localStorage.setItem(StorageKeys.CART, JSON.stringify({}));
        }
    }

    setCartStorage() {
        localStorage.setItem(StorageKeys.CART, JSON.stringify(this.cart));
    }

    getCartStorage() {
        return JSON.parse(localStorage.getItem(StorageKeys.CART));
    }

    constructor() {
        console.log("Creating a new cart instance");
        this.getCartFromStorage();

        this.cart = this.getCartStorage();
        console.log(this.cart);
        this.outputElement = document.getElementById("cart");
        this.cartAmountElement = document.getElementById('cart-amount');

        // Assuming StorageManager.getProductsFromStorage returns a promise
    }

    async generateCartDisplay() {
        // console.log(Object.keys(this.cart));
        // const products = await StorageManager.getProductsFromStorage();
        // console.log(products);
        // return (this.outputElement.innerHTML = Object.keys(this.cart).map(productId => {
        //     console.log(products);
        //     const product = products[productId];
        //     console.log(product);
        //         return `
        //         <div class="product">
        //             <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
        //             <div class="about">
        //                 <h1>${product.name}</h1>
        //                 <p>${product.description}</p>
        //             </div>
        //             <div class="actions">
        //                 <button onclick="this.removeProductFromCart(${product.id})"><img src="./icons/trash-outline-white.svg" alt="Delete Icon">Verwijder</button>
        //             </div>
        //         </div>
        //     `;
        // }).join(""));
    }

    addToCart(index) {
        //if there is no previous entry of index, then set itemCount[index] to 1
        console.log(this.cart);
        this.cart[index] = this.cart[index] + 1 || 1;
        console.log(this.cart)
        console.log("after adding")
        this.setCartStorage();
        this.updateCartCounter();
    }

    removeProductFromCart(index) {
        this.cart[index] = 0;
        this.setCartStorage();
        this.updateCartCounter();
    }

    removeItemFromCart(index) {
        if (this.cart[index] > 0) {
            this.cart[index] = this.cart[index] - 1;
        }
        this.setCartStorage();
        this.updateCartCounter();
    }

    emptyCart() {
        this.cart = {};
        this.setCartStorage();
    }

    updateCartCounter() {
        const amountArray = this.getCartStorage();
        this.cartAmountElement.textContent = Object.values(amountArray).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}