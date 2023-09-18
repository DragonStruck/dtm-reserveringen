const Status = Object.freeze({
    INITIAL: { alertStyle: "alert-light" },
    SUCCESS: { alertStyle: "alert-success" },
    ERROR: { alertStyle: "alert-danger" }
});
export class Device {

    constructor(outputElement) {
        // initialize
        this.name = "";
        this.details = "";
        this.type = "";

        this.status = Status.INITIAL;
        this.index = 0;

        // bind html elements
        this.outputElement = outputElement;
    }
    async fetch() {
        try {
            const response = await fetch("/product/variables?index=" + this.index);
            this.index += 1;
            console.log("Response is ok? " + response.ok + "Status code " + response.status);

            const json = await response.json();
            console.log("Got a json response: " + JSON.stringify(json));

            if (response.ok) {
                this.text = json.text;
                this.status = Status.SUCCESS;
            } else {
                this.text = "Something went wrong. Got a status " + response.status + " from the server.";
                this.status = Status.ERROR;
            }
        } catch (ex) {
            this.text = "Something went wrong. Exception message is '" + ex.message + "'";
            this.status = Status.ERROR;
        }
    }


    render() {
        const tile = document.createElement("div");
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");

        h1.textContent = "1";
        h2.textContent = "2";
        h3.textContent = "3";
        tile.appendChild(h1);
        tile.appendChild(h2);
        tile.appendChild(h3);
        this.outputElement.appendChild(tile);
    }
}
