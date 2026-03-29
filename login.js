let btn = document.getElementById("btn");
let msg = document.getElementById("msg");

// Check if already logged in
let user = localStorage.getItem("loginUser"); 
if(user != null){
    alert("User already logged in");
    location.replace("index.html");
}

btn.onclick = async function(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Admin login
    if(email === "admin@gmail.com" && password === "admin123"){
        localStorage.setItem("loginUser","admin");
        localStorage.setItem("role","admin");
        location.replace("admin.html");
        return;
    }

    // Use relative API path (works locally and on server)
    let res = await fetch("/api/users?email="+email);
    let data = await res.json();

    if(data.length>0 && data[0].password === password){
        localStorage.setItem("loginUser",data[0].id);
        localStorage.setItem("role","user");
        location.replace("index.html");
    }else{
        msg.textContent = "Invalid Credentials";
        msg.style.color = "red";
    }
}