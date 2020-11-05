import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { productDetail, productReviewCreate } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { CREATE_PRODUCT_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const {
    success: productReviewSuccess,
    error: productReviewError,
  } = useSelector((state) => state.productReview);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    debugger;
    if (productReviewSuccess) {
      alert("Reviewed");
      setRating(0);
      setComment("");
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
    dispatch(productDetail(match.params.productId));
  }, [match, dispatch, productReviewSuccess]);

  const addCartHandler = () => {
    dispatch(addToCart(product, qty));
    history.push(`/cart/${match.params.productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productReviewCreate(match.params.productId, rating, comment));
  };

  console.log(userInfo);
  let content = product && (
    <>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {!!product.countInStock && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && (
            <Message>No product reviews</Message>
          )}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a customer review</h2>
              {productReviewError && (
                <Message variant="danger">{productReviewError}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <FormGroup controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </FormGroup>
                  <FormGroup controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </FormGroup>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );

  if (loading) {
    content = <Loader />;
  }

  if (error) {
    content = <Message variant="danger">{error}</Message>;
  }

  return (
    <Row>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {content}
    </Row>
  );
};

export default ProductScreen;
