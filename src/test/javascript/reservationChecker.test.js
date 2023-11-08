import {Product} from "../../main/resources/static/classes/product.js";
import {ItemReservation} from "../../main/resources/static/classes/itemReservation.js";

const reservationHelperImport = require("../../main/resources/static/classes/reservationHelper.js");
const reservationHelper = reservationHelperImport.ReservationHelper.prototype;

describe("checks if reservation is possible", () => {
    const product1 = new Product(1, [1,2]);
    const product2 = new Product(2, [3,4]);

    const products = [product1, product2];

    let date1 = new Date(2023,3,20);
    let date2 = new Date(2024,3,20);
    let date3 = new Date(2025,3,20);
    let date4 = new Date(2026,3,20);

    const itemReservation1 = new ItemReservation(date1, 1, 1);
    const itemReservation2 = new ItemReservation(date2, 1, 1);
    const itemReservation3 = new ItemReservation(date3, 1, 2);
    const itemReservation4 = new ItemReservation(date4, 1, 3);

    const itemReservations = [itemReservation1, itemReservation2, itemReservation3, itemReservation4];

    const cart = new Map([
        [1, 2]
    ]);

    const reservationDates = ["2023-04-20"];

    it("gives the dates, given a start date and a period", () => {
        let firstDate = new Date(2023,3,20);
        let amountOfDays = 3;
        expect(reservationHelper.getAllDatesOfReservation(firstDate, amountOfDays)).toStrictEqual(["2023-04-20", "2023-04-21", "2023-04-22"]);

        firstDate = new Date(2023, 11, 31);
        amountOfDays = 3;
        expect(reservationHelper.getAllDatesOfReservation(firstDate, amountOfDays)).toStrictEqual(["2023-12-31", "2024-01-01", "2024-01-02"]);

        firstDate = new Date(2023, 11, 31);
        amountOfDays = 1;
        expect(reservationHelper.getAllDatesOfReservation(firstDate, amountOfDays)).toStrictEqual(["2023-12-31"]);
    });


    it("creates a map of all the items of products, with an empty array for dates", () => {
        const checkMap = new Map([
            [1, []],
            [2, []]
        ]);

        expect(reservationHelper.createItemReservationMap(cart, products)).toStrictEqual(checkMap);
    });


    it("puts the item reservations dates into the map, appending arrays with multiple days", () => {
        const itemReservationMap = new Map([
            [1, []],
            [2, []],
            [3, []],
            [4, []]
        ]);

        const resultMap = new Map([
            [1, ["2023-04-20", "2024-04-20"]],
            [2, ["2025-04-20"]],
            [3, ["2026-04-20"]],
            [4, []]
        ]);

        expect(reservationHelper.putItemReservationInMap(itemReservationMap, itemReservations)).toStrictEqual(resultMap);
    });


    it("for every item, check whether the item is available on the given dates", () => {
        const resultMap = new Map([
            [1, false],
            [2, true],
            [3, true],
            [4, true]
        ]);

        const itemReservationMap  = new Map([
            [1, ["2023-04-20", "2024-04-20"]],
            [2, ["2025-04-20"]],
            [3, ["2026-04-20"]],
            [4, []]
        ]);

        expect(reservationHelper.checkIfItemsAreAvailable(itemReservations, itemReservationMap, reservationDates)).toStrictEqual(resultMap);
    });


    it("lists the amount of items available per products", () => {
        const itemAvailabilityMap = new Map([
            [1, false],
            [2, true],
            [3, true],
            [4, true]
        ]);

        const resultMap = new Map([
            [1, 1]
        ]);

        expect(reservationHelper.itemsPerProductAvailable(cart, products, itemAvailabilityMap)).toStrictEqual(resultMap);
    });


    it("converts the date object to a date string of format: 'YYYY-MM-DD'", () => {
        const result = "2023-04-20"

        expect(reservationHelper.dateToString(date1)).toStrictEqual(result);
    });

    it("uses all the functions above to check whether a reservation is available", () => {
        const result = false;

        expect(reservationHelper.isReservationAvailable(cart, date1, 1, products, itemReservations)).toStrictEqual(result);
    });
});

