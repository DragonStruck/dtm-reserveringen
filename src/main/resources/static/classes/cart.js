import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "./storageManager.js";


//to create a new cart call getCart();
export class Cart {
    static async getCart() {
        const products = await StorageManager.getAllProducts();
        return new Cart(products);
    }

    //PRIVATE: don't call the constructor, call getCart()!!!!!
    constructor(products) {
        //localStorage.clear();
        this.products = products;

        this.createCartInLocalStorage();
        this.maxAmountOfItemsPerProductMap = new Map(this.products.map(product => [product.id, product.items.length]));

        //Map()
        //key: product id (number)
        //value: amount of items of product (number)
        this.cart = this.getCartStorage();
        console.log(this.cart);

        this.outputElement = document.getElementById("cart");
        this.cartAmountElement = document.getElementById('cart-amount');
        this.updateCartCounter();
    }

    createCartInLocalStorage() {
        const cartForStorage = this.createEmptyCart();

        console.log(cartForStorage);

        if (localStorage.getItem(StorageKeys.CART) === null) {
            localStorage.setItem(StorageKeys.CART, JSON.stringify(Object.fromEntries(cartForStorage)));
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
        console.log(cartEntries, "cart map from storage");
        const cartMap =  new Map();

        Object.entries(cartEntries).forEach(([productId, amountOfItems]) => {
            cartMap.set(Number.parseInt(productId), amountOfItems);
        });

        return cartMap;
    }

    async generateCartDisplay() {
        console.log(this.cart, "cart");

        this.outputElement.innerHTML = Array.from(this.cart.entries()).map(([productId, amountOfItems]) => {
            if (amountOfItems > 0) {
                const product = this.products.filter(product => product.id === productId)[0];
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
            }
        }).join("");

        this.addRemoveEventToButton();
    }

    addRemoveEventToButton() {
        this.products.forEach(product => {
            const productId = product.id;
            const removeButton = document.getElementById("remove-product-button-" + productId)
            if (removeButton !== null) {
                removeButton.addEventListener("click", async e => {
                    e.preventDefault();
                    await this.removeProductFromCart(productId);
                });
            }
        });
    }

    createEmptyCart() {
        return new Map(this.products.map(product => [product.id, 0]));
    }

    //make sure index is of type number
    async addToCart(productId) {
        const currentAmountOfItems = this.cart.get(productId);
        const maxAmountOfItems = this.maxAmountOfItemsPerProductMap.get(productId);

        if (currentAmountOfItems < maxAmountOfItems) {
            this.cart.set(productId, (currentAmountOfItems + 1));
            alert("Item toegevoegd aan winkelmandje");
        } else {
            if (maxAmountOfItems === 1) {
                alert(`Er is maar ${maxAmountOfItems} item beschikbaar van dit product`);
            } else {
                alert(`Er zijn maar ${maxAmountOfItems} items beschikbaar van dit product`);
            }
        }

        await this.afterActionInCart();
    }

    //make sure index is of type number
    async removeProductFromCart(productId) {
        this.cart.set(productId, 0);
        //await this.disableTileOfProduct(productId);
        await this.generateCartDisplay();
        await this.afterActionInCart();
    }


    //make sure index is of type number
    //if there are 0 after removing, make sure that the entry of that product is deleted
    async removeItemFromCart(productId) {
        const items = this.cart.get(productId);
        if (items > 0) {
            this.cart.set(productId, items - 1);
        } else {
            console.log("Something went wrong; trying to remove product where there are 0 of in the cart");
        }
        await this.generateCartDisplay();
        await this.afterActionInCart();
    }

    async emptyCart() {
        this.cart = this.createEmptyCart();
        await this.generateCartDisplay();
        await this.afterActionInCart();
    }

    async afterActionInCart() {
        this.setCartStorage();
        this.updateCartCounter();
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