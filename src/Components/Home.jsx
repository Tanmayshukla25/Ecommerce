import { useContext, useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";



let data = [];
let filterd;
// let value=[]
function Home(e) {
  // e.prevantDefault()
  const [products, setproducts] = useState([]);

  let { input } = useContext(UserContext);
  console.log(input);

  useEffect(() => {
    let result;
    async function fetchdata() {
      let response = await fetch("https://fakestoreapi.com/products");
      console.log(response)
      result = await response.json();
      console.log(result);
      setproducts(result);

      filterd = result.filter((item) =>
        item.category.toLowerCase().includes(input.toLowerCase())
      );
      console.log(filterd);
    }

    fetchdata();
  }, [input]);

  
  return (
    <>
    { products.length==0 ? (
 <div className="mainloader">

 <div className="loader-container">
  <div className="loader"></div>
  </div>
  </div>

   ):(<div className="maindiv" style={{marginTop:"8%"}}> 
        {input
          ? filterd.map((item) => {
            return ( <div className="div">
                <Link to={`/product/${item.id}`}>
                  {" "}
                  <img src={item.image} alt="" className="images" />
                </Link>
                <h1>{item.title.slice(0, 20) + "..."}</h1>
                <p className="para">
                  Price:
                  <PiCurrencyDollarBold className="icon" />
                  {item.price}
                </p>
              </div>)
            })
          : products.map((ele) => (
              <div className="div">
                <Link to={`/product/${ele.id}`}>
                  {" "}
                  <img src={ele.image} alt="" className="images" />
                </Link>
                <h1>{ele.title.slice(0, 20) + "..."}</h1>
                <p className="para">
                  Price:
                  <PiCurrencyDollarBold className="icon" />
                  {ele.price}
                </p>
              </div>
            ))}
      </div>)


    }
      
    </>
  );
}

export default Home;
