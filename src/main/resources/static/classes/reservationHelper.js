import {ItemReservation} from "./itemReservation.js";
import {StorageManager} from "./storageManager.js";

//needs to trigger when a reservation is added outside
export class ReservationHelper {
    constructor() {
        this.itemAvailabilityMap = null;
    }


    async getItemReservations() {
        const response = await fetch("/item-reservation/all");
        console.log(response);
        if (!response.ok) {
            console.log("All item Reservations: response is error; Status code: " + response.status);
        } else {
            const itemReservationsJson = await response.json();

            console.log("All item reservations: got json response")
            JSON.stringify(itemReservationsJson);
            console.log(itemReservationsJson);

            const itemReservations = Object.values(itemReservationsJson).map(data => {
                const itemReservation = new ItemReservation();
                itemReservation.setValues(data);
                return itemReservation;
            });
            console.log(itemReservations);

            return itemReservations;
        }
    }


    //re-trigger when change in cart, for reservation validity
    //update when a new reservation is added.
    //update when a reservation has been returned
    async isValidReservation(cart, reservationDate, reservationPeriod) {
        console.log(cart);
        console.log(reservationDate);
        console.log(reservationPeriod);
        //idea:
        //we get all the item reservations, then for each item we check if there are enough available periods for the item.
        //we check by checking if every date available is in per item, or just check if the dates are not in itemReservation

        //else we alter the Date start date in the calendar
        reservationDate = new Date(reservationDate);
        const reservationDates = this.getAllDatesOfReservation(reservationDate, reservationPeriod);
        const itemReservations = await this.getItemReservations();
        const products = await StorageManager.getAllProducts();

        //create a map for every item where the dates can be stored
        const emptyItemReservationMap = this.createItemReservationMap(cart, products);
        console.log(emptyItemReservationMap);

        const itemReservationMap = this.putItemReservationInMap(emptyItemReservationMap, itemReservations, products); //populate that map
        console.log(itemReservationMap);

        //contains the amount of items NOT available for a given item
        const itemAvailabilityMap = this.checkIfItemsAreAvailable(itemReservations, itemReservationMap, reservationDates);
        console.log(itemAvailabilityMap);
        this.itemAvailabilityMap = itemAvailabilityMap;

        const productAvailableMap = this.itemsPerProductAvailable(cart, products, itemAvailabilityMap);
        console.log(productAvailableMap);

        const isProductAvailableMap = this.enoughProductsAvailable(cart, productAvailableMap);
        console.log(isProductAvailableMap);
        //if there are any products not available (a value in availableAnswerMap is False), return false
        return [...isProductAvailableMap.values()].every(value => value === true);
    }

    checkIfItemsAreAvailable(itemReservations, itemReservationMap, reservationDates) {
        const itemAvailabilityMap = new Map([...itemReservationMap.keys()].map(itemId => [itemId, true]));

        console.log(reservationDates, "reservation dates" );

        [...itemReservationMap.entries()].forEach(([itemId, dates]) => {
            console.log(dates, "dates");
            const itemReservationsOfItem = itemReservations.filter(itemReservation => itemReservation.id === itemId)
            for (const date of reservationDates) {
                console.log(date, "date");
                if (dates.includes(date)) {
                    console.log("includes");
                    itemAvailabilityMap.set(itemId, false);
                    break
                }
            }
        });

        return itemAvailabilityMap;
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



    itemsPerProductAvailable(cart, products, itemAvailability) {
        const productAvailability = new Map([...cart.keys()].map(productId => [productId, 0]));

        [...cart.keys()].forEach(productId => {
            const product = products.filter(product => productId === product.id);
            product[0].items.forEach(item => {
                if (itemAvailability.get(item)) {
                    productAvailability.set(productId, productAvailability.get(productId) + 1);
                }
            });
        });

        return productAvailability;
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


    calculateNonAvailabilityOfItems(cart, products, itemReservationMap, reservationDates) {
        const productAvailabilityMap = new Map([...cart.keys()].map(productId => [productId, 0]));

        //loop over all cart entries and check for each product how many items are not available
        [...cart.keys()].forEach(productId => {
            const product = products.filter(product => product.id === productId);

            const itemIds = product[0].items;
            //check for all ids how many items there are not available for the given reservation period
            itemIds.forEach(itemId => {
                const itemDates = itemReservationMap.get(itemId);
                for (const date of reservationDates) {
                    if (itemDates.includes(date)) {
                        productAvailabilityMap.set(itemId, productAvailabilityMap.get(itemId) + 1)
                        break;
                    }
                }
            });
        });

        return productAvailabilityMap;
    }


    //firstDay is of object Date()
    //given the start date and the amount of days, return all the dates of these days
    getAllDatesOfReservation(date, amountOfDays) {
        const dates = [];

        for (let i = 0; i < amountOfDays; i++) {
            //increments the day by i
            date.setDate(date.getDate() + 1);

            //set date to string in format yyyy-mm-dd
            dates.push(date.toISOString().slice(0, 10));
        }

        return dates;
    }

    async getItemsToBeReserved(cart) {
        const products = await StorageManager.getAllProducts();
        const itemAvailabilityMap = this.itemAvailabilityMap;

        const itemsReturn = [];
        [...cart.entries()].forEach(([productId, wantedItems]) => {
            const product = products.filter(product => product.id === productId);

            product[0].items.forEach(item => {
                if (itemAvailabilityMap.get(item) && wantedItems > 0) {
                    itemsReturn.push(item);
                    wantedItems--;
                }
            });
        });

        return itemsReturn;
    }
}

