import {Device} from "./device.js";

// bind the greeter to the input name and output element
const device = new Device(
    document.getElementById("products")
);
let amount;
try {
    console.log("Product amount")
    const response = await fetch("/product/count");
    console.log("Product amount: response is ok? " + response.ok + "Status code " + response.status);

    const json = await response.json();
    console.log("Product amount: got a json response; " + JSON.stringify(json));
    amount = json;
}
catch (ex) {
    console.log("Something went wrong retrieving in fetch() amount . Exception message is '" + ex.message + "'");
}

for (let i = 0; i < amount; i++) {
    await device.fetch();
    device.render()
}
