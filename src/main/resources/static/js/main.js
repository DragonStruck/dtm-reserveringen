
import {Device} from "./device.js";

// bind the greeter to the input name and output element
const device = new Device(
    document.getElementById('products')
);

for (let i = 0; i < 1; i++) {
    await device.fetch();
    device.render()
}



document.getElementById("testbutton").addEventListener('click', () => {
    alert("test");
})
