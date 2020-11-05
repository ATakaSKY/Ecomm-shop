import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let content = products?.map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4}>
      <Product product={product} />
    </Col>
  ));
  if (loading) {
    content = <Loader />;
  }

  if (error) {
    content = <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <h1>Latest Products</h1>

      <Row>{content}</Row>
    </>
  );
};

export default HomeScreen;
