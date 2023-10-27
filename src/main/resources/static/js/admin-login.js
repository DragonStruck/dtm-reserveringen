const adminPasswordField = document.getElementById("admin-password");
const adminPasswordButton = document.getElementById("admin-password-button");

adminPasswordButton.addEventListener("click", e => {
    e.preventDefault();
    console.log("a");
    if (passwordCheck(adminPasswordField.textContent)) {
        console.log("refer");
        window.location.href = "/admin";
    }
});

adminPasswordField.addEventListener("keypress", e => {
    console.log(e, "key pressed");
    if (e.key === "Enter") {
        console.log("is enter");
        e.preventDefault();
        adminPasswordButton.click();
    }
});

function passwordCheck(password) {
    return true;
}


