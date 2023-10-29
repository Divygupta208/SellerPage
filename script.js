var form = document.querySelector('#addForm');

var products = document.querySelector('.productList');

document.addEventListener('DOMContentLoaded', getItems);


form.addEventListener('submit', addItem);


function addItem(e){
    e.preventDefault();
    
    var productName = document.getElementById('productName').value;
    var desc = document.getElementById('productDesc').value;
    var price= document.getElementById('price').value;
     var quantity = document.getElementById('quantity').value;
  
     myobj = {
        productName: productName,
        desc: desc,
        price: price,
        quantity: quantity
     }


   axios
   .post("https://crudcrud.com/api/d9493d3a37be404dbccae41395814311/products" , myobj)
   .then((res)=>{
    showOutput(res.data);
   })
   .catch((err)=>{
    console.log(err);
   })

}

function getItems(){
    axios.get("https://crudcrud.com/api/d9493d3a37be404dbccae41395814311/products")
    .then((response)=>{
      
      for(var i = 0 ; i<response.data.length ; i++){
        showOutput(response.data[i]);
      }
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }


function showOutput(res){
    
    var div = document.createElement('div');
     
    div.innerHTML = `${res.productName} - ${res.desc} - ${res.price} - ${res.quantity}`
    
    
    div.setAttribute("id" , res._id);
    div.setAttribute("productname" , res.productName);
    div.setAttribute("desc", res.desc);
    div.setAttribute("price", res.price);
    div.setAttribute("quantity", res.quantity);

    
    var button1 = document.createElement('button');
    button1.innerHTML = 'BUY-1';
    
    var button2 = document.createElement('button');
    button2.innerHTML = 'BUY-2';

    var button3 = document.createElement('button');
    button3.innerHTML = 'BUY-3';

    var del = document.createElement('button');
    
    del.innerHTML = 'DELETE';

    div.appendChild(button1);
  div.appendChild(button2);
  div.appendChild(button3);
  div.appendChild(del);

  products.appendChild(div);
   
   
  del.addEventListener('click' , deleteProduct);

  button1.addEventListener("click", function(e) {
    handleBuy(e, 1 );
});

button2.addEventListener("click", function(e) {
    handleBuy(e, 2 );
});

button3.addEventListener("click", function(e) {
    handleBuy(e, 3 );
});

}


function handleBuy(e, count ) {
    e.preventDefault();
    
    var productDiv = e.target.parentElement;
     var id = productDiv.getAttribute('id');
    axios.get(`https://crudcrud.com/api/d9493d3a37be404dbccae41395814311/products/${id}`)
    .then(res => {
       
        var updatedQuantity = res.data.quantity - count;
       
        var obj = {
            productName: res.data.productName,
            desc: res.data.desc,
            price: res.data.price,
            quantity: updatedQuantity ,
        }
        
        axios.put(`https://crudcrud.com/api/d9493d3a37be404dbccae41395814311/products/${id}`, obj)
        .then( response => {
           
            productDiv.setAttribute('quantity', updatedQuantity);
            productDiv.setAttribute('productname', res.data.productName);
            productDiv.setAttribute('desc', res.data.desc);
            productDiv.setAttribute('price', res.data.price);

          
            var buttons = productDiv.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    handleBuy(e, parseInt(button.innerHTML.split('-')[1]));
                });
            });
   
            productDiv.innerHTML = `${res.data.productName} - ${res.data.desc} - ${res.data.price} - ${updatedQuantity}`;
            buttons.forEach(button => productDiv.appendChild(button));
            
            
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

function deleteProduct(e){
    e.preventDefault();
    
    var id = e.target.parentElement.getAttribute('id');
     products.removeChild(e.target.parentElement);
    axios.delete(`https://crudcrud.com/api/d9493d3a37be404dbccae41395814311/products/${id}`)
    
}