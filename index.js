let bg=document.getElementById('bg');
let search=document.getElementById('search');

let cartlength=document.getElementById('cart-length');
let logoutbtn=document.getElementById('logoutbtn');
let allProducts;
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
let data=getCartData(); 

cartlength.textContent="CART("+data.length+")";

function createProductCard(products){
    // console.log(products)
    for(let product of products){
        // console.log(product)
        let a=document.createElement('a');
        a.href="oneProduct.html";
        bg.appendChild(a);

        let div=document.createElement('div');
        a.appendChild(div);

        let img=document.createElement('img');
        img.src=product.image;
        div.appendChild(img);

        let h1=document.createElement('h1');
        h1.textContent=product.title;
        div.appendChild(h1);

        let h4=document.createElement('h4');
        h4.textContent="Category: "+product.category;
        div.appendChild(h4);

        let p=document.createElement('p');
        p.textContent=product.description;
        div.appendChild(p);

        let h2=document.createElement('h2');
        h2.textContent="Price: $"+product.price;
        div.appendChild(h2);

        let h3=document.createElement('h3');
        h3.textContent="Rating:"+product.rating.rate+" ("+product.rating.count+" reviews)";
        div.appendChild(h3);

        div.onclick=function(){
        localStorage.setItem("productId",product.id); 
        }
    }
}

async function getData(){
    try {
        if(localStorage.getItem("loginUser")==null){
            location.replace("login.html");
        }
        let res1 = await fetch('https://fakestoreapi.com/products');
        let fakeProducts = await res1.json();

        let res2 = await fetch('http://localhost:3000/products');
        let adminProducts = await res2.json();

        let mergedProducts = [...fakeProducts, ...adminProducts];

        createProductCard(mergedProducts);

        allProducts = mergedProducts;
    } catch (error) {
        console.log(error)  
    }
}
getData()


search.onkeyup=(event)=>{
   let filteredData=[]
   for(let product of allProducts){
    if(product.category.toLowerCase().includes(event.target.value.toLowerCase())){ 
        filteredData.push(product)
    }
}
console.log(filteredData)
bg.textContent=""; 
if(filteredData.length==0){
    let h1=document.createElement('h1');
    h1.textContent="No products found";
    bg.appendChild(h1);
}else{
    createProductCard(filteredData);
}
}


logoutbtn.onclick=function(){
    showLogoutPopup();  

    setTimeout(()=>{
        localStorage.removeItem("loginUser");
        location.replace("login.html");
    },1000);
}    



function showLogoutPopup(){
    let popup = document.createElement("div");
    popup.textContent = "👋 Logged out Successfully";

    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.background = "#ff4d4d";
    popup.style.color = "#fff";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "8px";
    popup.style.fontSize = "16px";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    popup.style.zIndex = "9999";

    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.remove();
    },1500);
}
