// import {Product} from "./product.js";
// import {StorageManager} from "../classes/storageManager.js";

export class Item {

    constructor(id, product_id) {
        this.id = id || 0;
        this.product_id = product_id || 0;
    }

    setValuesFromObject(data) {
        this.id = data.id;
        this.product_id = data.product_id;
    }

    // checkProducts() {
    //     if (sessionStorage.getItem("products") == null) {
    //         StorageManager.setProductsInStorage();
    //         return true;
    //     }
    // }

    // generateAdminProduct() {
    //     checkProducts()
    //     let products = JSON.parse(localStorage.getItem("products"));

    //     let product = new Product();
    //     products.forEach(storageProduct => {
    //         if (storageProduct.id == this.product_id) {
    //             product.setValuesFromObject(product);
    //         }
    //     });

    //     return `
    //         <p>${product.name}</p>
    //     `;
    // }
}