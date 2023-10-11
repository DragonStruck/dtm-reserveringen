import {Product} from "../classes/product.js";
import {Reservation} from "../classes/reservation.js";
import {StorageKeys} from "../ENUM/storageKeys.js";

const cartContainer = document.getElementById("cart");
let cartLocalStorage;
let cart = [];

try {
    cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cartLocalStorage.items.length; i++) {
        //TODO: make this take one fetch request by grouping the id's together
        let product = new Product();
        await product.setValuesUsingFetchRequest(cartLocalStorage.items[i]);
        cart.push(product);
    }

    console.log(cart);
} catch (ex) {
    console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
}

// Show Cart

let generateCart = () => {
    return (cartContainer.innerHTML = cart.map((product) => {
        return `
        <div class="product">
            <img src="${product.imagePaths[0]}" alt="${product.imageAltTexts[0]}">
            <div class="about">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
            </div>
            <div class="actions">
                <button onclick="removeFromCart(${product.id})"><img src="./icons/trash-outline-white.svg" alt="Delete Icon">Verwijder</button>
            </div>
        </div>
        `;
    }).join(""));

}


if (cart.length > 0) {
    generateCart();
    document.getElementById('loader').style.display = "none";

    const reservationButton = document.getElementById("reservation-button");
    reservationButton.addEventListener("click", (e) => {
        e.preventDefault();
        placeReservation()
            .then(res => console.log("reservation placed" + res))
            .catch(rej => console.log("reservation failed" + rej));
    });
} else {
    // alert("No products in cart");
    document.getElementById('loader').style.display = "none";
    console.log("No products found");
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
    // for (let i = cart)
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