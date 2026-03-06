if (localStorage.getItem("loginUser") == null) {
    location.replace("login.html");
}

if (localStorage.getItem("role") !== "admin") {
    alert("Only admin allowed");
    location.replace("login.html");
}

async function addProduct() {
    if (localStorage.getItem("loginUser") == null) {
        location.replace("login.html");
    }

    if (localStorage.getItem("role") !== "admin") {
        alert("Only admin allowed");
        location.replace("login.html");
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
            rate: 4,
            count: 1
        }
    };

    await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    alert("Product Added");
    location.replace("index.html");
}

if(localStorage.getItem("loginUser") == null){
    location.replace("login.html");
}
