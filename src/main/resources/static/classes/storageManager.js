import {StorageKeys} from "../ENUM/storageKeys.js";
import {Product} from "./product.js";

export class StorageManager {
    static async getProductsFromStorage() {
        if (sessionStorage.getItem(StorageKeys.PRODUCTS) === null) {
            try {
                const response = await fetch("/product/all");

                if (!response.ok) {
                    console.log("All products: response is error; Status code: " + response.status);
                } else {
                    const json = await response.json();
                    console.log("All products: got a json response");
                    JSON.stringify(json)

                    const products = Object.values(json).map(data => {
                        const product = new Product();
                        product.setValuesFromJson(data);
                        console.log(product);
                        return product;
                    });
                    console.log(products)
                    sessionStorage.setItem(StorageKeys.PRODUCTS, JSON.stringify(products));
                }
            } catch (error) {
                console.error("Something went wrong retrieving all products; Error:", error);
            }
        }
        console.log("StorageManger returning products")
        return sessionStorage.getItem(StorageKeys.PRODUCTS);
    }
}