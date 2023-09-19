import {Device} from "./device.js";

// bind the greeter to the input name and output element
const device = new Device(
    document.getElementById('tileDisplay')
);

//using i = 1 bc the database start at index 1
for (let i = 1; i <= 38; i++) {
    await device.fetch();
    device.render()
}
