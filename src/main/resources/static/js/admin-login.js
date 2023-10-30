const adminPasswordField = document.getElementById("admin-password");
const adminPasswordButton = document.getElementById("admin-password-button");

adminPasswordButton.addEventListener("click", e => {
    e.preventDefault();
    if (passwordCheck(adminPasswordField.textContent)) {
        window.location.href = "/admin";
    }
});

adminPasswordField.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        adminPasswordButton.click();
    }
});

function passwordCheck(password) {
    return true;
}


