import React from "react";
import { useCallback, useEffect, useState } from 'react';
import  Axios from 'axios';
import AOS from "aos"; 

function Products() {

    const [ClothData, setClothData] = useState(null)
    const [shoeData, setShoeData] = useState(null)
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [category, setCategory] = useState("clothes");
    const [showModal, setShowModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmit = (product, price) => {
      if (!customerName || !phoneNumber || !location || !quantity) {
        alert("Please fill all the fields");
        return;
      }
      if (isSubmitting) return;
      setIsSubmitting(true);
        //send the order to the backend to initiate payment
        Axios.post(`http://127.0.0.1:8000/initiate_payment/`, {
            customer_name: customerName, 
            phone_number: phoneNumber,
            product_id: product.id,
            quantity: quantity,
            amount: price * quantity, 
            location: location
        })
        .then((res) =>{
            if (res.data.success){
                alert("payment initiated successfully");
            }
            else {
                alert("payment failed: " + res.data.message);
            }
        })
        .catch((error) => {
            console.error("Error initiating payment: ", error);
        });
        setIsSubmitting(false)
        setShowModal(false);
    };


    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        console.log("added to cart");
    }

    //fetch clothes data from the backend
    //const getData = () => {
        useEffect(() => {
            Axios.get(`http://127.0.0.1:8000/products-clothes/`).then((res) =>{
                setClothData(res.data)
    
            })
            .catch((error) => {
                console.error("Error fetching the data:", error)
            })
        }, []);
        //}

        //fetch shoes data from the backend
        useEffect(() => {
            Axios.get(`http://127.0.0.1:8000/products-shoes/`).then((res) =>{
                setShoeData(res.data)
    
            })
            .catch((error) => {
                console.error("Error fetching the data:", error)
            })
        }, []);

        // Function to remove product from cart
        const removeFromCart = (product) => {
            setCart((prevCart) => prevCart.filter((item) => item.name !== product.name)); // Remove product by filtering
            console.log("Removed from cart:", product);
        };

        // Function to check if a product is in the cart
        const isInCart = (product) => {
            return cart.some((item) => item.name === product.name); // Check if product exists in cart
        };

        //function to toggle the cart
        const toggleCart = () => {
            setShowCart(!showCart)
        }
    return(
        <div>

          <div className="flex justify-between items-center mb-4 bg-sky-200 p-3">  
              <button   
                  onClick={toggleCart}   
                  className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">  
                  {showCart ? "Hide Cart" : "View Cart"}  
              </button>  
              
              <div className="flex">  
                  <button  
                      className={`px-4 py-2 mx-2 ${  
                          category === "clothes"  
                          ? "bg-blue-500 text-white"  
                          : "bg-gray-300 text-black"  
                      } rounded shadow hover:bg-blue-600 transition`}  
                      onClick={() => setCategory("clothes")}>  
                      Clothes  
                  </button>  

                  <button  
                      className={`px-4 py-2 mx-2 ${  
                          category === "shoes"  
                          ? "bg-blue-500 text-white"  
                          : "bg-gray-300 text-black"  
                      } rounded shadow hover:bg-blue-600 transition`}  
                      onClick={() => setCategory("shoes")}>  
                      Shoes  
                  </button>  
              </div>  
          </div>  
            
            {/* Conditionally Display Cart if showCart is true */}
      {showCart && (
        <div className="m-4">
          <h2 className="text-xl font-bold">Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((product, index) => (
                <li key={index} className="p-2 border-b">
                  {product.name} - Ksh. {product.price}
                  <button
                    className="ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                    onClick={() => removeFromCart(product)} // Remove directly from the cart display
                  >
                    Remove
                  </button>
                  <button
                    className="ml-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
                    disabled = {isSubmitting}
                    onClick={() => {setShowModal(true); setSelectedProduct(product);}} // Buy directly from the cart display
                  >
                    Buy
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
 
      
      {/* Conditional rendering of Clothes or Shoes based on category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {category === "clothes"
          ? ClothData?.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden max-w-xs" data-aos="fade-up" data-aos-duration="3000">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain bg-gray-100"
              />
              <div className="p-4 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500 mt-1">{item.description}</p>
                <span className="text-xl font-bold text-gray-900 mt-2">Ksh. {item.price}</span>
                <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                {/* Conditionally render "Add to Cart" or "Remove" */}
                {isInCart(item) ? (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSelectedProduct(item);
                  }}
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  disabled={isSubmitting}
                >
                  Buy
                </button>
              </div>
            </div>
          
              
            ))
          : shoeData?.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden max-w-xs" data-aos="fade-up" data-aos-duration="3000">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain bg-gray-100"
              />
              <div className="p-4 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500 mt-1">{item.description}</p>
                <span className="text-xl font-bold text-gray-900 mt-2">${item.price}</span>
                <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                {/* Conditionally render "Add to Cart" or "Remove" */}
                {isInCart(item) ? (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSelectedProduct(item);
                  }}
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  disabled={isSubmitting}
                >
                  Buy
                </button>
              </div>
            </div>
            
                
              ))}
        </div>


      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>

            <div className="mb-2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={customerName}
                name="customer_name"
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="border border-gray-300 p-2 w-full"
                value={phoneNumber}
                name="phone_number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                className="border border-gray-300 p-2 w-full"
                value={quantity}
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={location}
                name="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              onClick={() =>handleSubmit(selectedProduct, selectedProduct?.price)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4"
            >
              Proceed to Pay
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-red-500 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

        </div>
    )
}

export default Products;