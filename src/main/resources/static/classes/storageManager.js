import {StorageKeys} from "../ENUM/storageKeys.js";
import {Product} from "./product.js";
import {Reservation} from "./reservation.js";
import {ItemReservation} from "./itemReservation.js";

export class StorageManager {
    static async setProductsInStorage() {
        try {
            const response = await fetch("/api/product/all");

            if (!response.ok) {
                console.log("All products: response is error; Status code: " + response.status);
            } else {
                const productsJson = await response.json();

                console.log("All products: got a json response");
                JSON.stringify(productsJson)
                console.log(productsJson);

                const products = Object.values(productsJson).map(data => {
                    const product = new Product();
                    product.setValuesFromDbJson(data);
                    return product;
                });

                sessionStorage.setItem(StorageKeys.PRODUCTS, JSON.stringify(products));
            }
        } catch (error) {
            console.error("Something went wrong retrieving all products; Error:", error);
        }
    }

    //TODO: only retrieve the non password relevant thing
    static async setReservationsInStorage() {
        try {
            const response = await fetch("/api/reservation/all");
            if (!response.ok) {
                console.log("All reservations: response is error; Status code: " + response.status);
            } else {
                const reservationsJson = await response.json();

                console.log("All reservations: got a json response");
                JSON.stringify(reservationsJson);
                console.log(reservationsJson);

                console.log(reservationsJson);
                const reservations = Object.values(reservationsJson).map(data => {
                    const reservation = new Reservation();
                    reservation.setValuesFromDbJson(data);
                    return reservation;
                });

                sessionStorage.setItem(StorageKeys.RESERVATIONS, JSON.stringify(reservations));
            }
        } catch (error) {
            console.error("Something went wrong retrieving all reservations:", error);
        }
    }

    static async getAllProducts() {
        if (sessionStorage.getItem(StorageKeys.PRODUCTS) === null) {
            await this.setProductsInStorage();
        }
        console.log("StorageManger returning products");
        const productsJson = JSON.parse(sessionStorage.getItem(StorageKeys.PRODUCTS));
        return Object.values(productsJson).map(data => {
            const product = new Product();
            product.setValuesFromObject(data);
            return product;
        });
    }

    //make sure index is of type number
    static async getProduct(index) {
        if (sessionStorage.getItem(StorageKeys.PRODUCTS) === null) {
            await this.setProductsInStorage();
        }

        const productsJson = JSON.parse(sessionStorage.getItem(StorageKeys.PRODUCTS));
        let product = new Product();
        Object.values(productsJson).forEach(data => {
            if (data.id === index) {
                product.setValuesFromObject(data);
            }
        });

        return product;
    }

    static async getReservations() {
        if (sessionStorage.getItem(StorageKeys.RESERVATIONS) === null) {
            await this.setReservationsInStorage();
        }
        console.log("StorageManger returning reservations");
        const reservationsJson = JSON.parse(sessionStorage.getItem(StorageKeys.RESERVATIONS));

        return Object.values(reservationsJson).map(data => {
            const reservation = new Reservation();
            reservation.setValuesFromObject(data);
            return reservation;
        });
    }


    static async getAllItemReservations() {
        
        const response = await fetch("/api/item-reservation/all");
        console.log(response);
        if (!response.ok) {
            console.log("All item Reservations: response is error; Status code: " + response.status);
        } else {
            const itemReservationsJson = await response.json();

            console.log("All item reservations: got json response")
            JSON.stringify(itemReservationsJson);
            console.log(itemReservationsJson, "item reservations json from db");

            const itemReservations = Object.values(itemReservationsJson).map(data => {
                const itemReservation = new ItemReservation();
                itemReservation.setValuesFromDbJson(data);
                return itemReservation;
            });
            console.log(itemReservations, "item reservations as objects");

            return itemReservations;
        }
    }
}