if (localStorage.getItem("loginUser") == null) {
    alert("Please login first");
    location.replace("login.html");
}

if (localStorage.getItem("role") !== "admin") {
    alert("Only admin allowed");
    location.replace("login.html");
}

async function addProduct() {
    if (localStorage.getItem("loginUser") == null) {
        alert("Please login first");
        location.replace("login.html");
        return;
    }

    if (localStorage.getItem("role") !== "admin") {
        alert("Only admin allowed");
        location.replace("login.html");
        return;
    }

    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let category = document.getElementById("category");
    let image = document.getElementById("image");
    let description = document.getElementById("description");
    let rating = document.getElementById("rating");
    let count = document.getElementById("count");

    if (!title.value || !price.value || !category.value || !image.value || !description.value || !rating.value || !count.value) {
        alert("Please fill all fields");
        return;
    }

    let product = {
        id: Date.now(),
        title: title.value,
        price: price.value,
        category: category.value,
        image: image.value,
        description: description.value,
        rating: {
            rate: parseFloat(rating.value),
            count: parseInt(count.value)
        }
    };

    try {
        await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        
        alert("Product Added Successfully✔️");
        
        title.value = "";
        price.value = "";
        category.value = "";
        image.value = "";
        description.value = "";
        rating.value = "";
        count.value = "";
        
    } catch (error) {
        alert("Error adding product: " + error.message);
    }
}

function addLogoutButton() {
    let logoutBtn = document.createElement("button");
    logoutBtn.textContent = "LOGOUT";
    logoutBtn.style.marginTop = "20px";
    logoutBtn.style.background = "linear-gradient(135deg, #ff4e50, #f9d423)";
    logoutBtn.onclick = function() {
        localStorage.removeItem("loginUser");
        localStorage.removeItem("role");
        alert("Logged out successfully");
        location.replace("login.html");
    };
    document.body.appendChild(logoutBtn);
}
addLogoutButton();