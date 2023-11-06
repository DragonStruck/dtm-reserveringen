export class ItemReservation {

    constructor(reservationDate, reservationPeriod, itemId) {
        this.reservationDate = reservationDate || "";
        this.reservationPeriod = reservationPeriod || 0;
        this.itemId = itemId || 0;
    }

    setValuesFromDbJson(dbJson) {
        this.reservationDate = new Date(dbJson.reservationDate);
        this.reservationPeriod = dbJson.reservationPeriod;
        this.itemId = dbJson.item.id;
    }

    setValuesFromObject(data) {
        this.reservationDate = new Date(data.reservationDate);
        this.reservationPeriod = data.reservationPeriod;
        this.itemId = data.itemId;
    }
}