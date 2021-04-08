import { Button } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable) ? 'Add To Cart' : 'Delete';
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const product = {
    id: props.item_id,
    name: props.item_name,
    text: props.description,
    img: props.image,
    price: props.price
  };
  const change = async (e) => {
    e.preventDefault();
    if (!props.isRemovable) {
      if(sessionID!==null){
        const res = await Axios({
          method: "POST",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `http://localhost:4000/cart/product/${product.id}`
        });
      }
      else{
        const prod = {
          item_id: product.id,
          item_name: product.name,
          description: product.text,
          image: product.img,
          price: product.price
        }
        localStorage.setItem(product.id, JSON.stringify(prod));
      }
      props.setNumOfItems(props.numOfItems + 1);
    }
    else if (props.isRemovable) {
      if(sessionID!==null){
        const res = await Axios({
          method: "DELETE",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `http://localhost:4000/cart/product/${product.id}`,
        });
      }
      else{
        localStorage.removeItem(product.id);
      }
      props.setNumOfItems((props.numOfItems) - 1);
    }
  }
  console.log("ın product_card");
  console.log(product);
  return (
    <Card className='my-3 p-3 rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.img} variant='top' style={{ flexShrink: '0', minWidth: '100%', minHeight: '100%' }}></Card.Img>
      </Link>
      <Link to={`/product/${product.id}`}>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      <Card.Body>
        <Card.Text as='h5'>${product.price}</Card.Text>
        <Button variant="success">
          <span onClick={(e) => change(e)}>{addOrDelete}</span>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard