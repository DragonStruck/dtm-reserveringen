const adminPasswordField = document.getElementById("admin-password");
const adminPasswordButton = document.getElementById("admin-password-button");

adminPasswordButton.addEventListener("click", async e => {
    e.preventDefault();
    if (await passwordCheck(adminPasswordField.value)) {
        window.location.href = "/admin";
    }
});

adminPasswordField.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        adminPasswordButton.click();
    }
});

async function passwordCheck(password) {
    const response = await fetch('admin/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password),
    });

    if (!response.ok) {
        console.log("All reservations: response is error; Status code: " + response.status);
        return false;
    } else {
        return await response.json();
    }
}


