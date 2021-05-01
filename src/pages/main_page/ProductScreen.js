import React, { useEffect, useState } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios';
import '../css/bootstrap.min.css';

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/product/${id}`,
    });
    setProduct(res.data);
    console.log(res.data);
  };
  
  const getComments = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/getComments/${id}`,
    });
    
  }

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getComments();
  }, [product])

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row style={{ margin: '2rem' }}>
        <Col md={6}>
          <Image src={product.image} alt={product.item_name} style={{ position: 'relative', maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col md={3} >
          <ListGroup variant='flush' >
            <ListGroup.Item><h3>{product.item_name}</h3> </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: {product.description} </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card style={{ margin: '2rem' }}>
            <ListGroup variant='flush' >
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col><srong> $ {product.price} </srong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col> <srong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </srong> </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* <Button className='btn-block'
                type='button'
                disabled={product.countInStock == 0} >
              Add To Cart
              </Button> */}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div>
        <h3 style={{textAlign: "center"}}>Comments</h3>
        {/* {(product.rate === 0) ? <p style={{textAlign: "center"}}>No comments</p> : <p>Some comment</p>}  */}
      </div>
    </div>
  )
}

export default ProductScreen
