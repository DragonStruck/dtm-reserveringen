import {Device} from "./device.js";

// bind the greeter to the input name and output element
const device = new Device(
    document.getElementById('products')
);

await device.fetch(38);
device.render();
