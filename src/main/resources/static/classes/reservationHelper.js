import {ItemReservation} from "./itemReservation.js";
import {StorageManager} from "./storageManager.js";

//needs to trigger when a reservation is added outside
export class ReservationHelper {
    constructor() {
        //this will be used for 'getItemsToBeReserved', ugly
        this.itemAvailabilityMap = null;
    }


    isReservationAvailable(cart, reservationDate, reservationPeriod, products, itemReservations) {
        console.log(cart, "cart");
        console.log(reservationDate, "reservation date");
        console.log(this.dateToString(reservationDate), "reservation date string")
        console.log(reservationPeriod, "reservation period");


        //else we alter the Date start date of the calendar
        reservationDate = new Date(reservationDate);
        const reservationDates = this.getAllDatesOfReservation(reservationDate, reservationPeriod);

        const emptyItemReservationMap = this.createItemReservationMap(cart, products);
        console.log(emptyItemReservationMap, "empty item reservation map");

        const itemReservationMap = this.putItemReservationInMap(emptyItemReservationMap, itemReservations, products); //populate that map
        console.log(itemReservationMap, "map with item reservations");

        const itemAvailabilityMap = this.checkIfItemsAreAvailable(itemReservations, itemReservationMap, reservationDates);
        console.log(itemAvailabilityMap, "is item available map");
        this.itemAvailabilityMap = itemAvailabilityMap;

        const itemsPerProductAvailableMap = this.itemsPerProductAvailable(cart, products, itemAvailabilityMap);
        console.log(itemsPerProductAvailableMap, "how many of product are available map");

        const isProductAvailableMap = this.enoughProductsAvailable(cart, itemsPerProductAvailableMap);
        console.log(isProductAvailableMap, "is product available map");

        return [...isProductAvailableMap.values()].every(value => value === true);
    }


    async getItemsToBeReserved(cart) {
        const products = await StorageManager.getAllProducts();
        const itemAvailabilityMap = this.itemAvailabilityMap;

        const itemsToReturn = [];
        [...cart.entries()].forEach(([productId, wantedItems]) => {
            const product = products.filter(product => product.id === productId);

            product[0].items.forEach(item => {
                if (itemAvailabilityMap.get(item) && wantedItems > 0) {
                    itemsToReturn.push(item);
                    wantedItems--;
                }
            });
        });

        return itemsToReturn;
    }


    createItemReservationMap(cart, products) {
        //create a map for every item where the dates can be stored
        //key: item id
        //values: array with dates
        const itemMap = new Map();

        //only make a map for the needed products
        const productsToBePutInMap = products.filter(product => [...cart.keys()].includes(product.id))

        productsToBePutInMap.map(product => {
            product.items.forEach(item => {
                itemMap.set(item, []);
            });
        });

        return itemMap;
    }


    //set all the item reservations per product in the map
    putItemReservationInMap(itemReservationMap, itemReservations) {
        const relevantItemReservations = itemReservations.filter(itemReservation => itemReservationMap.has(itemReservation.itemId))

        relevantItemReservations.forEach(itemReservation => {
            const dates = this.getAllDatesOfReservation(itemReservation.reservationDate, itemReservation.reservationPeriod);
            const datesValues = itemReservationMap.get(itemReservation.itemId);

            dates.forEach(date => {
                datesValues.push(date);
            });
        });

        return itemReservationMap;
    }


    checkIfItemsAreAvailable(itemReservations, itemReservationMap, reservationDates) {
        const itemAvailabilityMap = new Map([...itemReservationMap.keys()].map(itemId => [itemId, true]));

        [...itemReservationMap.entries()].forEach(([itemId, dates]) => {
            const itemReservationsOfItem = itemReservations.filter(itemReservation => itemReservation.id === itemId)

            for (const date of reservationDates) {
                if (dates.includes(date)) {
                    itemAvailabilityMap.set(itemId, false);
                    break
                }
            }
        });

        return itemAvailabilityMap;
    }


    itemsPerProductAvailable(cart, products, itemAvailabilityMap) {
        const productAvailability = new Map([...cart.keys()].map(productId => [productId, 0]));

        [...cart.keys()].forEach(productId => {
            const product = products.filter(product => productId === product.id);

            product[0].items.forEach(item => {
                if (itemAvailabilityMap.get(item)) {
                    productAvailability.set(productId, productAvailability.get(productId) + 1);
                }
            });
        });

        return productAvailability;
    }


    enoughProductsAvailable(cart, productAvailabilityMap) {
        const isProductAvailableMap = new Map([...cart.keys()].map(productId => [productId, true]));

        [...cart.entries()].forEach(([productId, wantedItems]) => {
            if (wantedItems > productAvailabilityMap.get(productId)) {
                isProductAvailableMap.set(productId, false);
            }
        });

        return isProductAvailableMap;
    }


    //given the start date and the number of days, return all the dates of these days in string "yyyy-mm-dd"
    getAllDatesOfReservation(date, amountOfDays) {
        const dates = [];
        dates.push(this.dateToString(date));
        for (let i = 0; i < amountOfDays - 1; i++) {
            //increments the day by i
            date.setDate(date.getDate() + 1);
            //set date to string in format yyyy-mm-dd
            dates.push(this.dateToString(date));
        }

        return dates;
    }


    dateToString(date) {
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - (offset*60*1000));
        return date.toISOString().substring(0,10);
    }
}

