import React,{useState} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";


function App() {
  const [cartIsShown, setCartIsShown]= useState(false);
  const showCartHandler = () =>{
    setCartIsShown(true)
  }
  const hiddenCartHandler = ()=>{
    setCartIsShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown &&<Cart onClose ={hiddenCartHandler}/>}
      <Header onShowCart = {showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>

  );
}

export default App;
