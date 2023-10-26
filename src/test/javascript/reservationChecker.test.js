import {Product} from "../../main/resources/static/classes/product.js";
import {ItemReservation} from "../../main/resources/static/classes/itemReservation.js";

const nonSelectableDaysHelper = require("../../main/resources/static/classes/reservationHelper.js");
const caller = nonSelectableDaysHelper.ReservationHelper.prototype;

describe("checks if reservation is possible", () => {
    const product1 = new Product(1, [1,2], "naam", "des", "det", "con", ["a"], ["b"]);
    const product2 = new Product(2, [4,5]);

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


    it("gives the dates, given a start date and a period", () => {
        let firsDate = new Date(2023,3,20);
        let amountOfDays = 3;
        expect(caller.getAllDatesOfReservation(firsDate, amountOfDays)).toStrictEqual(["2023-04-20", "2023-04-21", "2023-04-22"]);

        firsDate = new Date(2023, 11, 31);
        amountOfDays = 3;
        expect(caller.getAllDatesOfReservation(firsDate, amountOfDays)).toStrictEqual(["2023-12-31", "2024-01-01", "2024-01-02"]);

        firsDate = new Date(2023, 11, 31);
        amountOfDays = 1;
        expect(caller.getAllDatesOfReservation(firsDate, amountOfDays)).toStrictEqual(["2023-12-31"]);
    });

    it("creates a map of all the items of products, with an empty array for dates", () => {
        const checkMap = new Map([
            [1, []],
            [2, []]
        ]);

        const cart = new Map([
            [1, 2]
        ]);

        expect(caller.createItemReservationMap(cart, products)).toStrictEqual(checkMap);
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



        const itemReservation1 = new ItemReservation(date1, 1, 1);
        const itemReservation2 = new ItemReservation(date2, 1, 1);
        const itemReservation3 = new ItemReservation(date3, 1, 2);
        const itemReservation4 = new ItemReservation(date4, 1, 3);

        const itemReservations = [itemReservation1, itemReservation2, itemReservation3, itemReservation4];

        expect(caller.putItemReservationInMap(itemReservationMap, itemReservations)).toStrictEqual(resultMap);
    });

    it("for the products the user wants to reserve, check how many products are not available", () => {
        const cart = new Map([
            [1, 2],
            [2, 1]
        ])

        const reservationDates = ["2023-04-20"];

        const emptyItemReservationMap = caller.createItemReservationMap(cart, products);
        const itemReservationMap = caller.putItemReservationInMap(emptyItemReservationMap, itemReservations, products);

        const expectedMap = new Map([
            [1, 1],
            [2, 0]
        ]);

        expect(caller.calculateNonAvailabilityOfItems(cart, products, itemReservationMap, reservationDates)).toStrictEqual(expectedMap);

    });

    it("for every product, check whether there are enough items available compared to the amount of items not available", () => {
        const productNonAvailabilityMap = new Map([
            [1, 1],
            [2, 1]
        ])

        const cart = new Map([
            [1, 2],
            [2, 1]
        ])

        const answerMap = new Map([
            [1,false],
            [2,true]
        ]);



        expect(caller.checkWhetherEnoughItemsAreAvailable(cart, products, productNonAvailabilityMap)).toStrictEqual(answerMap);
    });
});

