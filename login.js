// let email = document.getElementById("email");
// let password = document.getElementById("password");
// let btn = document.getElementById("btn");
// let msg = document.getElementById("msg");   

//  let user =localStorage.getItem("loginUser"); 
//  if(user!=null){
//         alert("User already logged in");
//         location.replace("index.html");
//     }

// async function login() {
//    let res= fetch("http://localhost:3000/users?email="+email.value+"&password="+password.value);
//    let jsonRes=await (await res).json();
//    if(jsonRes.length==0){
//     msg.textContent="User Not Found";
//     msg.style.color="red";
//    }else{
//     if(jsonRes[0].password==password.value){
//         localStorage.setItem("loginUser",email.value);
//         location.replace("index.html");
//     }else{
//         msg.textContent="Invalid Credentials";
//         msg.style.color="red";
//     }
//    }
// }

// btn.onclick=function(event) {
//     event.preventDefault();
//     console.log(user);
//     login();
// }  

// btn.onclick=function(event) {
//     event.preventDefault();
//     btn.textContent="Logging in...";
//     btn.disabled=true;

//     setTimeout(()=>{
//         login();
//         btn.textContent="LOGIN";
//         btn.disabled=false;
//     },800);
// }

// document.addEventListener("keypress",function(e){
//     if(e.key==="Enter"){
//         btn.click();
//     }
// });




let btn = document.getElementById("btn");
let msg = document.getElementById("msg");

btn.onclick = async function(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "admin@gmail.com" && password === "admin123"){
        localStorage.setItem("loginUser","admin");
        localStorage.setItem("role","admin");
        location.replace("admin.html");
        return;
    }

    let res = await fetch("http://localhost:3000/users?email="+email);
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
