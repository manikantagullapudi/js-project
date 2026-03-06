let bg=document.getElementById('bg');
let cartlength=document.getElementById('cart-length');

function getCartData(){
    let data=localStorage.getItem("cart")           
    if(data==null){
        return []
    }else{
        let cartData = JSON.parse(data)
        let filteredData=cartData.filter(i=>i.userId==localStorage.getItem("loginUser"))
        return filteredData;
    }
} 
let cart=getCartData();
cartlength.textContent="CART("+cart.length+")";

function createProductCard(product){
    let div=document.createElement('div');
    bg.appendChild(div);

    let img=document.createElement('img');
    img.src=product.image;
    div.appendChild(img);

    let h1=document.createElement('h1');
    h1.textContent=product.title;
    div.appendChild(h1);

    let p=document.createElement('p');
    p.textContent=product.description;
    div.appendChild(p);

    let h2=document.createElement('h2');
    h2.textContent="Price: $"+product.price;
    div.appendChild(h2);

    let h3=document.createElement('h3');
    h3.textContent="Rating:"+product.rating.rate+" ("+product.rating.count+" reviews)";
    div.appendChild(h3);

    let btn=document.createElement('button');
    btn.textContent="Delete from Cart";
    div.appendChild(btn);

    btn.onclick=function(){
       let index=cart.indexOf(product);
       cart.splice(index,1);
       localStorage.setItem("cart",JSON.stringify(cart));
        console.log(cart.length)
       bg.textContent="";
       for(let i of cart){    
        createProductCard(i)
        showTotalFixed();
       }
       if(cart.length==0){
        let h1=document.createElement('h1');
        h1.textContent="Cart is Empty";
        bg.appendChild(h1);

        bg.style.display="flex";
        bg.style.justifyContent="center";
        bg.style.alignItems="center";
        h1.style.fontSize="2rem";
        } 
        if(cart.length==0){
            location.replace("index.html");
        }
    }
}
if(localStorage.getItem("loginUser")==null){
    location.replace("login.html");
}
if(cart.length==0){
        let h1=document.createElement('h1');
        h1.textContent="Cart is Empty";
        bg.appendChild(h1);
        bg.style.display="flex";
        bg.style.justifyContent="center";
        bg.style.alignItems="center";
        h1.style.fontSize="2rem";
}else{
    for(let product of cart){
    createProductCard(product)
    }
}


// ================= TOTAL & PAYMENT FIXED =================
function showTotalFixed(){
    let old = document.getElementById("total-fixed");
    if(old) old.remove();

    if(cart.length === 0) return;

    let total = 0;
    for(let item of cart){
        total += Number(item.price);
    }

    let box = document.createElement("div");
    box.id = "total-fixed";

    box.style.position = "fixed";
    box.style.bottom = "0";
    box.style.left = "0";
    box.style.width = "100%";
    box.style.background = "#111";
    box.style.color = "#fff";
    box.style.display = "flex";
    box.style.justifyContent = "space-between";
    box.style.alignItems = "center";
    box.style.padding = "15px 30px";
    box.style.boxShadow = "0 -2px 10px rgba(0,0,0,0.3)";
    box.style.zIndex = "999";

    let totalText = document.createElement("h2");
    totalText.textContent = "Total: $" + total.toFixed(2);
    totalText.style.margin = "0";

    let payBtn = document.createElement("button");
    payBtn.textContent = "Pay Now 💳";
    payBtn.style.padding = "10px 25px";
    payBtn.style.fontSize = "16px";
    payBtn.style.cursor = "pointer";
    payBtn.style.border = "none";
    payBtn.style.borderRadius = "6px";
    payBtn.style.background = "gold";
    payBtn.style.fontWeight = "bold";

    box.appendChild(totalText);
    box.appendChild(payBtn);
    document.body.appendChild(box);

    payBtn.onclick = function(){
        alert("Payment Successful ✅");
        localStorage.removeItem("cart");
        location.replace("index.html");
    }
}
showTotalFixed();

