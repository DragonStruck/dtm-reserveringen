import {StorageManager} from "../classes/storageManager.js";

const reservations = await StorageManager.getReservations();
console.log(reservations);
await setReservationTable();

async function setReservationTable() {
    const products = await StorageManager.getAllProducts();
    let table = document.getElementById("reservation-table");
    table.appendChild(getTableHeader());

    reservations.forEach(reservation => {
        const tableRow = reservation.getTableRow(products);
        table.appendChild(tableRow)
    });
}

function getTableHeader() {
    let tableHeader = document.createElement("tr");

    tableHeader.innerHTML = `
        <th>Email</th>
        <th>Hoeveelheid producten</th>
        <th>Datum(s)</th>
        <th>Acties</th>
        `;
    return tableHeader;
}







