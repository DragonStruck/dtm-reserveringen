import {Account} from "./account.js";
import {ItemReservation} from "./itemReservation.js";
import {StorageManager} from "../classes/storageManager.js";
import {Item} from "../classes/item.js";

export class Reservation {

    constructor(id, itemReservations, account) {
        //values of product
        this.id = -1;
        this.itemReservations = [];
        this.account = account;
    }

    setValuesFromDbJson(dbJson) {
        this.id = dbJson.id;
        for (let i = 0; i < dbJson.itemReservations.length; i++) {
            const itemReservation = new ItemReservation();
            itemReservation.setValuesFromDbJson(dbJson.itemReservations[i]);
            this.itemReservations[i] = itemReservation;
        }
        const account = new Account();
        account.setValues(dbJson.account);
        this.account = account;
    }

    setValuesFromObject(data) {
        this.id = data.id;
        for (let i = 0; i < data.itemReservations.length; i++) {
            const itemReservation = new ItemReservation();
            itemReservation.setValuesFromObject(data.itemReservations[i]);
            this.itemReservations[i] = itemReservation;
        }
        const account = new Account();
        account.setValues(data.account);
        this.account = account;
    }

    setButtons(tableRow) {
        const acceptButton = tableRow.querySelector("#accept-button")
        const rejectButton = tableRow.querySelector("#reject-button")
        const seeReservationButton = tableRow.querySelector("#see-reservation-button")

        acceptButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.acceptReservation();
        });

        rejectButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.rejectReservation();
        });

        seeReservationButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.seeReservation(seeReservationButton);
        });
    }

    checkProducts() {
        if (sessionStorage.getItem("products") == null) {
            StorageManager.setProductsInStorage();
            return true;
        }
    }

    async getTableRow() {
        let items;

        try {
            const response = await fetch("/api/item/all");

            if (!response.ok) {
                console.log("All items: response is error; Status code: " + response.status);
            } else {
                const itemsJson = await response.json();
                console.log(itemsJson);

                console.log("All items: got a json response");
                JSON.stringify(itemsJson)
                console.log(itemsJson);

                items = Object.values(itemsJson).map(data => {
                    const item = new Item();
                    item.setValuesFromDbJson(data);
                    return item;
                });

                sessionStorage.setItem(StorageKeys.PRODUCTS, JSON.stringify(products));
            }
        } catch (error) {
            console.error("Something went wrong retrieving all items; Error:", error);
        }



        console.log(items)





        let reservationItems = "";
        this.itemReservations.forEach(itemReservation => {



            // console.log(itemReservation.itemId);
        })


        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", "table-row-reservations" + this.id);
        tableRow.innerHTML = `
            <td>${this.account.email}</td>
            <td>${this.itemReservations.length}</td>
            <td>${this.getDates()}</td>
            <td>
                <button id="accept-button">accepteer</button>
                <button id="reject-button">wijger</button>
                <div class="dropdown">
                    <button class="dropbtn" id="see-reservation-button">zie reservering</button>
                    <div class="dropdown-content">${reservationItems}</div>
                </div>  
            </td>
        `;

        this.setButtons(tableRow);

        return tableRow;
    }

    getDates() {
        const dates = [];
        const date = new Date(this.itemReservations[0].reservationDate);

        for (let i = 0; i < this.itemReservations[0].reservationPeriod; i++) {
            //increments the day by i
            date.setDate(date.getDate() + 1);

            //set date to string in format yyyy-mm-dd
            dates.push(date.toISOString().slice(0, 10));
        }

        console.log(dates);
        if (dates.length === 2) {
            return [dates[0] + " - " + dates[1]];
        }

        if (dates.length > 2) {
            console.log([dates[0] + " - " + dates[dates.length - 1]]);
            return [dates[0] + " - " + dates[dates.length -1]];
        }

        return dates;
    }


    async deleteReservation() {
        let returnStatus = "";
        await fetch('reservation/delete/' + this.id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => {
                console.log("Response status of reservation deletion: " + res)
                returnStatus = res;
            });
        return returnStatus;
    }

    acceptReservation() {
        console.log(this);
        console.log("accepted")
    }

    async rejectReservation() {
        let returnStatus = await this.deleteReservation();

        if (returnStatus === '"OK"') {
            console.log("return status OK, now making corresponding row disappear");
            document.getElementById("table-row-reservations" + this.id)
                .style.display = "none";
        } else {
            console.log("return status not OK, not OK");
        }
    }

    seeReservation(seeReservationButton) {
        console.log(seeReservationButton.closest(".dropdown").querySelector('div.dropdown-content'));
        let dropdownMenu = seeReservationButton.closest(".dropdown").querySelector('div.dropdown-content');
        let dropdownContents = document.querySelectorAll(".dropdown-content");
        dropdownContents.forEach(dropdownContent => {
            if (dropdownMenu != dropdownContent) {
                dropdownContent.classList.remove("active");
            }
        })
        dropdownMenu.classList.toggle("active");
    }
}
