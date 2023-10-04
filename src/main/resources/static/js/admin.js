import {Reservation} from "../classes/reservation.js";

let reservations = [];
try {
    console.log("Product amount")
    const response = await fetch("/reservation/all");
    console.log("Product amount: response is ok? " + response.ok + " Status code " + response.status);

    const json = await response.json();
    console.log("Reservations: got a json response; " + JSON.stringify(json));

    let jsonValues = Object.values(json);
    for (let i = 0; i < jsonValues.length; i++) {
        reservations[i] = new Reservation(jsonValues[i]);
    }
} catch (ex) {
    console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
}

getTable();

function getTableHeader() {
    let tableHeader = document.createElement("tr");

    tableHeader.innerHTML = `
        <th>Name</th>
        <th>Amount of products</th>
        `;

    return tableHeader;
}

function getTable() {
    let table = document.getElementById("reservation-table");
    table.appendChild(getTableHeader());

    reservations.forEach(reservation => {
        const tableRow = reservation.getTableRow();
        table.appendChild(tableRow)
    });

    console.log(table);
}





