var form = document.querySelector('#addForm');

var products = document.querySelector('.productList');

var foodItem = document.querySelector('.Food');
var electronics = document.querySelector('.Electronics');
var SkinCare = document.querySelector('.SkinCare'); 

document.addEventListener('DOMContentLoaded', getItems);

form.addEventListener('submit', addItem);


function addItem(e){
    e.preventDefault();
    
    var productName = document.getElementById('productName').value;
    var sellingPrice = document.getElementById('amount').value;
    var category = document.getElementById('category').value;

   var  myobj = {
    productName: productName,
    sellingPrice: sellingPrice,
    category: category
   }

   axios
   .post("https://crudcrud.com/api/4dfef5f978e64ede8f0384fda5cd5576/products" , myobj)
   .then((res)=>{
    showOutput(res.data);
   })
   .catch((err)=>{
    console.log(err);
   })

}

function getItems(){
    axios.get("https://crudcrud.com/api/4dfef5f978e64ede8f0384fda5cd5576/products")
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
    var span1 = document.createElement('span');
    span1.textContent = "Name" +":"+ res.productName;
    
    var span2 = document.createElement('span');
    span2.textContent = "Price" +":"+ res.sellingPrice;

    var span3 = document.createElement('span');
    span3.textContent = "Type" +":"+ res.category;
    
    
    div.setAttribute("id" , res._id);
    div.setAttribute("productName" , res.productName);
    div.setAttribute("sellingPrice", res.sellingPrice);
    div.setAttribute("category", res.category);

    
    var button = document.createElement('i');
    button.className = 'fa-solid fa-trash'

    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(button);

    if(res.category == 'Food'){
        foodItem.appendChild(div);
    }
    else if(res.category == 'Electronics'){
        electronics.appendChild(div);
    }else{
       SkinCare.appendChild(div);
    }
    
     button.addEventListener('click', deleteItem);

}

function deleteItem(e){
    e.preventDefault();
    var id = e.target.parentElement.getAttribute('id');
    var cate = e.target.parentElement.getAttribute('category');
    if(  cate == 'Food'){
        foodItem.removeChild(e.target.parentElement);
    }else if(cate == 'Electronics'){
        electronics.removeChild(e.target.parentElement);
    }else{
        SkinCare.removeChild(e.target.parentElement);
    }

    axios
    .delete(`https://crudcrud.com/api/4dfef5f978e64ede8f0384fda5cd5576/products/${id}`)
    .then((res)=>{

    })
    .catch((err)=>{

        console.log(err);
    })
}