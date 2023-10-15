import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "./storageManager.js";


//TODO: cart counter only updates if a cart object is created on that hml page. so pages where that currently doesn't happen dont display an item count
export class Cart {
    createCartInLocalStorage() {
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
        this.createCartInLocalStorage();

        //key: product id (number)
        //value: amount of items of product (number)
        this.cart = this.getCartStorage();
        console.log(this.cart);

        this.outputElement = document.getElementById("cart");
        this.cartAmountElement = document.getElementById('cart-amount');
        this.updateCartCounter();

        // Assuming StorageManager.getProductsFromStorage returns a promise
    }

    async generateCartDisplay() {
        console.log(this.cart);
        const products = await StorageManager.getAllProducts();
        this.outputElement.innerHTML = Object.entries(this.cart).map(([key, value]) => {
            console.log(value);

            if (value > 0) {
                const product = products[key - 1];
                return `
                <div class="product" id="cart-product-tile-${key}">
                    <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
                    <div class="about">
                        <h1>${product.name}</h1>
                        <p>${product.description}</p>
                    </div>
                    <div class="actions">
                        <button id="remove-product-button-${key}"""=><img src="./icons/trash-outline-white.svg" alt="Delete Icon">Verwijder</buttonid>
                    </div>
                </div>
            `;
            }
        }).join("");

        this.addRemoveEventToButton(products);
    }

    addRemoveEventToButton(products) {
        products.forEach(product => {
            const productId = product.id;
            const removeButton = document.getElementById("remove-product-button-" + productId)
            if (removeButton !== null) {
                removeButton.addEventListener("click", e => {
                    e.preventDefault();
                    this.removeProductFromCart(productId);
                });
            }
        });
    }

    //make sure index is of type number
    addToCart(index) {
        //if there is no previous entry of index, then set itemCount[index] to 1
        this.cart[index] = this.cart[index] + 1 || 1;
        this.afterActionInCart();
    }

    //make sure index is of type number
    removeProductFromCart(index) {
        this.cart[index] = 0;
        this.afterActionInCart();
        this.disableTileOfProduct(index);
    }

    //make sure index is of type number
    removeItemFromCart(index) {
        if (this.cart[index] > 0) {
            this.cart[index] = this.cart[index] - 1;
        } else {
            console.log("Something went wrong; trying to remove product where there are 0 of in the cart");
        }
        this.afterActionInCart();

        if (this.cart[index] === 0) {
            this.disableTileOfProduct(index);
        }
    }

    emptyCart() {
        this.cart = {};
        this.afterActionInCart();
    }

    afterActionInCart() {
        console.log(this.cart);
        this.setCartStorage();
        this.updateCartCounter();
    }

    disableTileOfProduct(index) {
        console.log(index);
        const tile = document.getElementById("cart-product-tile-" + index);
        this.generateCartDisplay();
    }

    updateCartCounter() {
        const amountArray = this.getCartStorage();
        //reduce sums the amount of total items and displays it
        this.cartAmountElement.textContent = Object.values(amountArray).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}