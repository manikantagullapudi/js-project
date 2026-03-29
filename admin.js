if (localStorage.getItem("loginUser") == null) {
    location.replace("login.html");
}

if (localStorage.getItem("role") !== "admin") {
    alert("Only admin allowed");
    location.replace("login.html");
}

// Get element references
let title = document.getElementById("title");
let price = document.getElementById("price");
let category = document.getElementById("category");
let image = document.getElementById("image");
let description = document.getElementById("description");

async function addProduct() {
    if (localStorage.getItem("loginUser") == null) {
        location.replace("login.html");
    }

    if (localStorage.getItem("role") !== "admin") {
        alert("Only admin allowed");
        location.replace("login.html");
        return;
    }

    // Validate fields
    if (!title.value || !price.value || !category.value || !image.value || !description.value) {
        alert("Please fill all fields");
        return;
    }

    let product = {
        id: "admin-" + Date.now(),
        title: title.value,
        price: price.value,
        category: category.value,
        image: image.value,
        description: description.value,
        rating: {
            rate: 4,
            count: 1
        }
    };

    try {
        let response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        
        if (response.ok) {
            alert("Product Added Successfully!");
            location.replace("index.html");
        } else {
            alert("Failed to add product");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error adding product");
    }
}