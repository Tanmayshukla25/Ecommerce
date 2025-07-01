import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

import { data } from "react-router-dom";
// let ids=[]
let result;

function Cart() {
  let { addtocartid,setAddtocartid ,Cart,setCart} = useContext(UserContext);
  const [data, setData] = useState([]);
  const {Quantity,setQuantity}=useContext(UserContext)
  const [totalamount,setTotalAmount]=useState(0)
  // console.log(Quantity)
  // console.log(addtocartid);
  
  let storequantity = [];

  useEffect(() => {
    async function fetcheddata() {
      if (addtocartid.length === 0) return;

      const result = await Promise.all(
        addtocartid.map(async (x) => {
          const response = await fetch(`https://fakestoreapi.com/products/${x}`);
          return await response.json();
        })
      );
      const newquantities={}
      result.map((item)=>{
        newquantities[item.id]=1
      })
      
      setQuantity((Quantity)=>({...Quantity,newquantities}))
      setData(result)
       
       
    }
    fetcheddata();
  }, [addtocartid]);
function increment(id,item){
  console.log(item)
  setQuantity((prev)=>({...Quantity,[id]:(prev[id]||1)+1}))
  console.log(Quantity[id])
  

  
   
}
function decrement(id){
  setQuantity((prev)=>({...Quantity,[id]:(prev[id]||1)-1}))

}
let value=0
// console.log(value)
useEffect(()=>{
   console.log(totalamount)
},[totalamount])
 function RemoveCart(index){
 const product= data.filter((items,index1)=>(index!=index1))
  console.log(product)
  setData(product)
  
  addtocartid.splice(index,1)
  setCart(Cart-1)
 
  
 }
 useEffect(()=>{

   let total=0;
  data.map((item)=>{
    let values;
  let Quantity2=Quantity[item.id]||1
  // console.log(Quantity2)
 values=Number(Quantity2*item.price)
  total=total+values
})
setTotalAmount(total)
console.log(total)
 },[data,setTotalAmount])
 
if(addtocartid.length==0){
  return(<h1 className="EmptyCard">🛒 Cart is empty</h1>)
}
// console.log(Quantity[item.id]*item.price)
  return (
    <div>

  
    <div>
      {data.map((item, index) => (

    <div>
        <div className="cartflex">
          <div className="cartimg">
            <img src={item.image} alt="" />
          </div>
          <div className="ratelist">
            <h2>{item.title}</h2>
            <h3>Price: ${item.price}</h3>
            <h3>Rating: {item.rating?.rate}</h3>
            <h3>Count: {item.rating?.count}</h3>
            <div className="marginCartquantity">
              <button onClick={() => decrement(item.id,item.price)}>-</button>
              <span>{Quantity[item.id]||1}</span>
              <button onClick={() => increment(item.id,item.price)}>+</button>
            </div>
          
          </div>
             <div>
              <span>Remove:-</span> <button onClick={()=>RemoveCart(index)}>&times;</button>
             </div>
        </div>
        
       
           
           
        </div>
      ))}
      
    </div>
     <hr />
     <span>GRANDTOTAL:- $ {totalamount||0}</span>
</div>
  );
}

export default Cart;





