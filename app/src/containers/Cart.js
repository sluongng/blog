/**
 * Created by NB on 5/7/2017.
 */

import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup,
  Form,
  PageHeader,
  ListGroup,
  Col,
  Panel,
  Grid,
  Button
} from "react-bootstrap";
import "./Cart.css";
import {invokeLzdApiGateway} from "../libs/awsLib";
import _ from "lodash";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      cartContent: null
    };
  }

  async componentWillMount() {
    this.setState({isLoading: true});

    try {
      const initCart = await this.getCart();

      const results = await this.calCart(initCart);

      this.setState({cartContent: results});
    }
    catch (e) {
      alert(e);
    }

    this.setState({isLoading: false});
  }

  async changeQuantity( iter, event ) {
    this.setState({isLoading: true});

    const newQuantity = event.target.value;

    let newCart = _.cloneDeep(this.state.cartContent);

    newCart.items[iter].quantity = newQuantity;

    try {
      const results = await this.calCart(newCart);

      this.setState({cartContent: results});
    }
    catch (e) {
      alert(e);
    }

    this.setState({isLoading: false});
  }

  async changeDestination(event) {
    this.setState({isLoading: true});

    const newDestination = event.target.value;

    let newCart = _.cloneDeep(this.state.cartContent);

    newCart.destination = newDestination;

    try {
      const results = await this.calCart(newCart);

      this.setState({cartContent: results});
    }
    catch (e) {
      alert(e);
    }

    this.setState({isLoading: false});
  }

  calCart(cart) {
    const result = invokeLzdApiGateway({path: '/lzd/cart/calculate', method: 'POST', body: cart}, this.props.userToken);

    return result;
  }

  getCart() {
    const results = invokeLzdApiGateway({path: '/lzd/cart/cart123'}, this.props.userToken);

    return results;
  }

  renderItemsList(cart) {
    return cart.items.map((item, i) => (
      <Panel header={item.itemDetails.name.trim()} bsStyle="info">
        <Form horizontal>

          <FormGroup controlId="ItemPrice">
            <Col componentClass={ControlLabel} sm={4}>
              Price Each
            </Col>
            <Col sm={8}>
              <InputGroup>
                <FormControl readOnly type="number" value={item.itemDetails.value} />
                <InputGroup.Addon>$</InputGroup.Addon>
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId="ItemWeight">
            <Col componentClass={ControlLabel} sm={4}>
              Weight Each
            </Col>
            <Col sm={8}>
              <InputGroup>
                <FormControl readOnly type="number" value={item.itemDetails.weight} />
                <InputGroup.Addon>kg</InputGroup.Addon>
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId="ItemQuantity">
            <Col componentClass={ControlLabel} sm={4}>
              Quantity
            </Col>
            <Col sm={8}>
              <FormControl type="number" defaultValue={item.quantity} onBlur={this.changeQuantity.bind(this, i)}/>
              {/*<FormControl type="number" defaultValue={item.quantity} />*/}
            </Col>
          </FormGroup>

          <FormGroup controlId="ItemSource">
            <Col componentClass={ControlLabel} sm={4}>
              Shipping From
            </Col>
            <Col sm={8}>
              <FormControl readOnly type="text" defaultValue={item.bestSource} />
            </Col>
          </FormGroup>

        </Form>
      </Panel>
    ));
  }



  renderCartInfo(cart) {
    return (
      <Panel header="Cart Total" bsStyle="success">
        <Form horizontal>
          <FormGroup controlId="CartId">
            <br/>
            <Col componentClass={ControlLabel} sm={4}>
              Cart ID
            </Col>
            <Col sm={8}>
              <FormControl.Static>{cart.cartId}</FormControl.Static>
            </Col>
          </FormGroup>

          <FormGroup controlId="CartDestination">
            <Col componentClass={ControlLabel} sm={4}>
              Destination
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="Postal Code" value={this.state.cartContent.destination} onChange={this.changeDestination.bind(this)}>
                <option value="100001">100001</option>
                <option value="100002">100002</option>
                <option value="100003">100003</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="Total Price">
            <Col componentClass={ControlLabel} sm={4}>
              Total Price
            </Col>
            <Col sm={8}>
              <InputGroup>
                <FormControl readOnly type="number" defaultValue={cart.cartPrice} />
                <InputGroup.Addon>$</InputGroup.Addon>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup controlId="PurchaseBttn" style={{maxWidth: 250, margin: '0 auto 10px'}}>
            <Button bsStyle="danger" bsSize="large" block>Purchase</Button>
          </FormGroup>
        </Form>
      </Panel>
    );
  }

  render() {
    return (
      <div className="Cart">
        <PageHeader>Your Cart</PageHeader>
        <Grid>
          <Col xs={12} md={8}>
            <ListGroup>
              {
                !this.state.isLoading
                && this.renderItemsList(this.state.cartContent)
              }
            </ListGroup>
          </Col>
          <Col xs={6} md={4}>
            {
              !this.state.isLoading
              && this.renderCartInfo(this.state.cartContent)
            }
          </Col>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Cart);