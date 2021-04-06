import DropDown from './DropDown';
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useRef } from 'react';
import Axios from 'axios';

const NavLeft = (props) => {
  const ref = useRef(false);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 
  var Cart = 'Cart';

  const getProducts = async() => {
    const res = await Axios({
      method: "POST",
      data:{
        sessionID: sessionID
      },
      withCredentials: true,
      url: `http://localhost:4000/getCartItems`,
    });
    const products = res.data;
    
    if(typeof products != typeof '') props.setNumOfItems(products.length)
  };

  useEffect(()=>{
    if(sessionID!==null)getProducts();
  },[]);
  
  useEffect(()=>{
    if(ref.current){
      let text = document.getElementById('cart').innerHTML;
      if(props.numOfItems===0) text=`Cart`;
      else if(!text.includes('(')) text += ` (${props.numOfItems})`;
      else text = text.split('(')[0] + '(' + props.numOfItems + ')';
      document.getElementById('cart').innerHTML = text;
    } else ref.current = true;
  },[props.numOfItems]);
  
  return (
    <Nav className="mr-auto">
      <Nav.Link href="/cart" id="cart">{`${Cart}`}</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <DropDown/>
    </Nav>
  )
}

export default NavLeft
