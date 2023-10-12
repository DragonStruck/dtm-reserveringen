import {Cart} from "../classes/cart.js";

const cart = new Cart(document.getElementById("cart"));

//loads the cartPage page html lines
//TODO: if there are no items make a nice display
cart.generateCartDisplay();
document.getElementById('loader').style.display = "none";
setReservationButtonFunctionality();


function setReservationButtonFunctionality() {
    const reservationButton = document.getElementById("reservation-button");
    reservationButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateReservation()) {
            placeReservation()
                .then(cart.emptyCart())
                .catch(rej => console.log("reservation failed" + rej));
        }
    });
}


const json2 =
    {
        "itemReservationDTOS": [
            {
                "reservationDate": "2023-10-15",
                "reservationPeriod": 120,
                "itemDTO": {
                    "id": 1
                }
            },
            {
                "reservationDate": "2023-10-16",
                "reservationPeriod": 90,
                "itemDTO": {
                    "id": 2
                }
            }
        ],
        "accountDTO": {
            "id": 1
        }
    }


function createReservation() {
    // const reservationTemplate = {
    //     itemReservationDTOS: [],
    //     accountDTO: sessionStorage.getItem(StorageKeys.ACCOUNT).id
    // }
    //
    // for (let i = cartPage)
    // const itemReservationDTO = {
    //     reservationDate:
    // }
    //
    // return reservationTemplate;
}


async function placeReservation() {
    //const reservationTemplate = createReservation();
    const reservationTemplate = json2;
    console.log(reservationTemplate);

    await fetch('reservation/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationTemplate)
    }).then(response => console.log(response))
        .catch(error => console.error('Error:', error));
}

function validateReservation() {
    //reserveringsperiode opgegeven

    //items in cartPage

    //moet ingelogd zijn
}