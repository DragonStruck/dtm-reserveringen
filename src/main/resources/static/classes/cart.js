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
        const cartForStorage = {};
        this.cart.forEach((amountOfItems, productId) => {
            cartForStorage[productId] = amountOfItems;
        });
        console.log(cartForStorage, "cart object for in storage");
        localStorage.setItem(StorageKeys.CART, JSON.stringify(cartForStorage));
    }

    getCartStorage() {
        const cartEntries = JSON.parse(localStorage.getItem(StorageKeys.CART));

        const cartMap =  new Map();

        console.log(cartEntries, "cart map from storage");
        Object.entries(cartEntries).forEach(([productId, amountOfItems]) => {
            cartMap.set(Number.parseInt(productId), amountOfItems);
        });

        return cartMap;
    }

    constructor() {
        this.createCartInLocalStorage();

        //Map()
        //key: product id (number)
        //value: amount of items of product (number)
        this.cart = this.getCartStorage();

        this.outputElement = document.getElementById("cart");
        this.cartAmountElement = document.getElementById('cart-amount');
        this.calender = null;
        this.updateCartCounter();


        // Assuming StorageManager.getProductsFromStorage returns a promise
    }

    async generateCartDisplay() {
        console.log(this.cart, "cart");
        const products = await StorageManager.getAllProducts();

        this.outputElement.innerHTML = Array.from(this.cart.entries()).map(([productId, amountOfItems]) => {
            const product = products[productId - 1];
            return `
                <div class="product" id="cart-product-tile-${productId}">
                    <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
                    <div class="about">
                        <h1>${product.name}</h1>
                        <p>${product.description}</p>
                    </div>
                    <div class="actions">
                        <button id="remove-product-button-${productId}"<img src="./icons/trash-outline-white.svg" alt="Delete Icon">Verwijder</buttonid>
                    </div>
                </div>
            `;
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
    addToCart(productId) {
        //if there is no previous entry of index, then set itemCount[index] to 1
        this.cart.set(productId, (this.cart.get(productId) || 0) + 1);
        this.afterActionInCart();

    }

    //make sure index is of type number
    removeProductFromCart(productId) {
        this.cart.delete(productId);
        this.disableTileOfProduct(productId);
        this.afterActionInCart();

    }


    //make sure index is of type number
    //if there are 0 after removing, make sure that the entry of that product is deleted
    removeItemFromCart(productId) {
        const items = this.cart.get(productId);
        if (items > 0) {
            this.cart.set(productId, items - 1);
        } else {
            console.log("Something went wrong; trying to remove product where there are 0 of in the cart");
        }
        this.afterActionInCart();
        this.disableTileOfProduct(productId);
    }

    emptyCart() {
        this.cart = new Map();
        this.afterActionInCart();
    }

    afterActionInCart() {
        console.log(this.cart);
        this.setCartStorage();
        this.updateCartCounter();
        console.log(this.getCartStorage());
    }

    disableTileOfProduct(productId) {
        console.log(productId);
        const tile = document.getElementById("cart-product-tile-" + productId);
        this.generateCartDisplay();
    }

    updateCartCounter() {
        let count = 0;
        const values = this.cart.values();
        for (const value of values) {
            count += value;
        }
        this.cartAmountElement.textContent = count.toString();

    }
}