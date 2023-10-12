export class Reservation {

    constructor(json) {
        //values of product
        this.id = -1;
        this.itemReservations = [];
        this.accountId = "";
    }

    setValues(json) {
        this.id = json.id;
        this.itemReservations = [];
        for (let i = 0; i < json.itemReservations.length; i++) {
            this.itemReservations[i] = json.itemReservations[i];
        }
        this.accountId = json.account.id;
        this.email = this.account.email;
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
            this.seeReservation();
        });
    }

    getTableRow() {
        let tableRow = document.createElement("tr")
        tableRow.setAttribute("id", "table-row-reservations" + this.id)
        tableRow.innerHTML = `
            <td>${this.email}</td>
            <td>${this.itemReservations.length}</td>
            <td>
                <button id="accept-button">accepteer</button>
                <button id="reject-button">wijger</button>
                <button id="see-reservation-button">zie reservering</button>
            </td>
        `;

        this.setButtons(tableRow);

        return tableRow;
    }


    async deleteReservation() {
        let returnStatus = "";
        await fetch('reservation/delete' + this.id, {
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
        let returnStatus = await this.deleteReservation()

        if (returnStatus === '"OK"') {
            console.log("return status OK, now making corresponding row disappear");
            document.getElementById("table-row-reservations" + this.id)
                .style.display = "none";
        } else {
            console.log("return status not OK, not OK");
        }
    }

    seeReservation() {
        this.itemReservations.forEach(itemReservation => {
            console.log(itemReservation);
        })
    }
}
