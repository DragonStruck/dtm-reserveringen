import {Device} from "./device.js";

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    console.log(location.search);
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) {
                result = decodeURIComponent(tmp[1]);
            }
        });
    return result;
}

const device = new Device(
    document.getElementById('product')
);

const product = findGetParameter('id')


await device.fetch(product);
device.renderInfo();