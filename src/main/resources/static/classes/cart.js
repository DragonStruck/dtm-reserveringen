import {StorageKeys} from "../ENUM/storageKeys.js";
import {StorageManager} from "./storageManager.js";

export class Cart {
    getCartFromStorage() {
        //this wil set all the product amount in the cart to 0
        for (let i = 0; i < this.products.length; i++) {
            this.itemCount[i + 1] = 0;
        }

        if (localStorage.getItem(StorageKeys.CART) === null) {
            localStorage.setItem(StorageKeys.CART, JSON.stringify(this.itemCount));
        }
    }

    populateCart() {
        //sets the items in the cart, so we can later increment these values
        const itemStorage = JSON.parse(localStorage.getItem(StorageKeys.CART));
        console.log(itemStorage);
        this.itemCount = JSON.stringify(itemStorage);
        console.log(this.itemCount);
    }

    constructor(outputElement) {
        if (Cart.instance) {
            console.log("returning instance")
            return Cart.instance;
        }
        //using items as a dictionary
        this.itemCount = {};
        this.outputElemnt = outputElement;
        this.products = {}
        StorageManager.getProductsFromStorage().then(productsData => {
            this.products = JSON.parse(productsData);
            this.getCartFromStorage();
            this.populateCart();
            Cart.instance = this;
        });
        console.log(this.products);
    }

    generateCartDisplay() {
        console.log(Object.keys(this.itemCount));
        return (this.outputElemnt.innerHTML = Object.keys(this.itemCount).map(productId => {
            if (productId >= 1) {
                const product = this.products.at(Number.parseInt(productId) - 1);
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
            }
        }).join(""));
    }

    addToCart(index) {
        this.itemCount[index]++;
    }

    removeProductFromCart(index) {
        this.itemCount[index] = 0;
    }

    removeItemFromCart(index) {
        if (this.itemCount[index] > 0) {
            this.itemCount[index]--;
        }
    }


    emptyCart() {
    }
}