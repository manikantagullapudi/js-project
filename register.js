let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let msg = document.getElementById("msg");

let user =localStorage.getItem("loginUser"); 
 if(user!=null){
        alert("User already logged in");
        location.replace("index.html");
    }

async function registerUser() {

    let data= await fetch("http://localhost:3000/users?email="+email.value)
    let json=await data.json()
    if(json.length>0){
        msg.textContent="User Already Exists";
        msg.style.color="red";
        return;
    }

    let res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    });
    location.replace("login.html");
}

btn.onclick = function(event) {
    event.preventDefault();   
    if(username.value=="" || email.value=="" || password.value==""){
        alert("Please fill all the fields");
        return;
    }
    registerUser();
    showAddedPopup();
}

function showAddedPopup(){
    let popup = document.createElement("div");
    popup.textContent = "Registered Successfully✅";

    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.background = "#28a745";
    popup.style.color = "#fff";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "8px";
    popup.style.fontSize = "16px";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    popup.style.zIndex = "9999";

    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.remove();
    },2000);
}

