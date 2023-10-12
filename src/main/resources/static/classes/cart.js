import {StorageKeys} from "../ENUM/storageKeys.js";

export class Cart {
    getCartFromStorage() {
        if (localStorage.getItem(StorageKeys.CART) === null) {
            localStorage.setItem(StorageKeys.CART, JSON.stringify({}));
        }
    }

    constructor() {
        console.log("Creating a new cart instance");
        this.getCartFromStorage();

        this.cart = JSON.parse(localStorage.getItem(StorageKeys.CART));
        this.outputElement = document.getElementById("cart");

        // Assuming StorageManager.getProductsFromStorage returns a promise
    }

    generateCartDisplay() {
        console.log(Object.keys(this.cart));
        return (this.outputElement.innerHTML = Object.keys(this.cart).map(productId => {
            const product = this.cart.at(Number.parseInt(productId) - 1);
                return `
                <div class="product">
                    <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
                    <div class="about">
                        <h1>${product.name}</h1>
                        <p>${product.description}</p>
                    </div>
                    <div class="actions">
                        <button onclick="this.removeProductFromCart(${product.id})"><img src="./icons/trash-outline-white.svg" alt="Delete Icon">Verwijder</button>
                    </div>
                </div>
            `;
        }).join(""));
    }

    generateProductTile(product) {
        return `
            <a href="/product?id=${product.id}" class="product">
                <img class="product-image" src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
                <div class="product-text">
                    <h1>${product.name}</h1>
                    <p>${product.description}</p>
                </div>
                <button id="addToCartButton${product.id}" class="cartDirectButton">
                    <img src="./icons/cart-outline-white.svg" class="cartDirectImg" alt="Cart Icon">
                </button>
            </a>
        `;
    }

    addButtonEvent(product) {
        const buttonAddToCart = document.getElementById("addToCartButton" + product.id.toString());
        buttonAddToCart.addEventListener("click", e => {
            e.preventDefault();
            console.log("added to cart " + product.id);
            this.addToCart(product.id);
        });
    }


    addToCart(index) {
        //if there is no previous entry of index, then set itemCount[index] to 1
        this.cart[index] = this.cart[index]++ || 1;
        console.log(this.cart);
        localStorage.setItem(StorageKeys.CART, JSON.stringify(this.cart));
    }

    removeProductFromCart(index) {
        this.cart[index] = 0;
    }

    removeItemFromCart(index) {
        if (this.cart[index] > 0) {
            this.cart[index]--;
        }
    }

    emptyCart() {
    }
}