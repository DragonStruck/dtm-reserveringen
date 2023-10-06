import {Reservation} from "../classes/reservation.js";

let reservations = [];

console.log("Get all reservations")
try {
    const response = await fetch("/reservation/all");
    if (!response.ok) {
        console.log("All reservations: response is error; Status code: " + response.status);
    }

    const json = await response.json();
    console.log("All reservations: got a json response");

    JSON.stringify(json);
    const jsonValues = Object.values(json);
    jsonValues.forEach(data => {
        const reservation = new Reservation();
        reservation.setValues(data);
        reservations.push(reservation);
    });
} catch (error) {
    console.error("Something went wrong retrieving all reservations:", error);
}

getTable();

function getTable() {
    let table = document.getElementById("reservation-table");
    table.appendChild(getTableHeader());

    reservations.forEach(reservation => {
        const tableRow = reservation.getTableRow();
        table.appendChild(tableRow)
    });

    console.log(table);
}

function getTableHeader() {
    let tableHeader = document.createElement("tr");

    tableHeader.innerHTML = `
        <th>Name</th>
        <th>Amount of products</th>
        `;

    return tableHeader;
}







