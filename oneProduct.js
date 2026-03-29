let productbg=document.getElementById('oneProduct');
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
count=cart.length;
cartlength.textContent="CART("+count+")";

function oneProductInterface(product){
    let img=document.createElement('img');
    img.src=product.image;
    productbg.appendChild(img);

    let div=document.createElement('div');
    productbg.appendChild(div); 

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
    btn.textContent="Add to Cart";
    div.appendChild(btn); 

    btn.onclick=function(){
        product.userId=localStorage.getItem("loginUser");
        cart.push(product); 
        localStorage.setItem("cart",JSON.stringify(cart));
        count++
        cartlength.textContent="CART("+count+")";
        showAddedPopup();

    }
}

async function getOneProduct(){
    try {
        if(localStorage.getItem("loginUser")==null){
            location.replace("login.html");
        }
        let id = localStorage.getItem("productId");
        
        // First try to get from your API
        let res = await fetch('/api/products/' + id);
        let product = await res.json();
        
        // If not found in your API, try FakeStoreAPI
        if (!product || Object.keys(product).length === 0) {
            res = await fetch('https://fakestoreapi.com/products/' + id);
            product = await res.json();
        }
        
        oneProductInterface(product);
    } catch (error) {
        console.log(error) 
    }
}
getOneProduct();




function showAddedPopup(){
    let popup = document.createElement("div");
    popup.textContent = "✅ Added to cart successfully";

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


