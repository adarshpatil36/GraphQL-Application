import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { dishes } from "../constants/static data/dishes";
import IncDecCounter from "./IncDecCounter";
import { ACTION_TYPE } from "../actions/ActionTypes";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ENV } from "../config";
import CheckoutModal from "./CheckoutModal";

const Restaurant = ({
  addDishes,
  restDishes,
  selectedRestaurant,
  decreaseQuantity,
  increaseQuantity,
}) => {
  let history = useHistory();
  useEffect(() => {
    getDishes();
  }, []);

  const [showCart, setShowCart] = useState(false);

  const closeCheckoutModal = () => {
    setShowCart(false);
  };

  const getDishes = () => {
    const restaurantId = selectedRestaurant._id;
    fetch(`${ENV.LOCAL_HOST}/dishes/getDishes/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        addDishes(data);
        console.log(">>", data);
      });
  };

  const backgroundImgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.6)), url('https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC85Y2VmYjIzYy00ODk5LTQ5ZGYtYjE0ZC1lOWMwZjdhMjRmMmIuanBlZw==')`,
  };
  const quantityCount = restDishes.reduce(function (acc = 0, obj) {
    let quan = obj["quantity"] > 0 ? obj["quantity"] : 0;
    return acc + quan;
  }, 0);

  const proceedToCheckout = () => {
    history.push("/orders");
  };
  const redirectToOrders = () => {
    setShowCart(true);
  };
  return (
    <div className="Restaurant">
      <NavBar />
      <div className="backgroundImg" style={backgroundImgStyle}>
        <div>{selectedRestaurant.title}</div>
      </div>
      <div className="info">
        <div>
          <h6>Delivery Fee: {selectedRestaurant.deliveryFee}</h6>
          <h6>Delivery Time: {selectedRestaurant.deliveryTime}</h6>
        </div>
        <div onClick={redirectToOrders}>
          <FontAwesomeIcon icon={faShoppingCart} className="shoppigCart" />
          {quantityCount} Items
        </div>
      </div>
      <h3>Dishes:</h3>
      <div className="dishCard">
        {restDishes.length > 0
          ? restDishes.map((item) => {
              return (
                <div className="card" id={item._id}>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <img
                      className="card-img-top"
                      src={item.imageURL}
                      alt="Dishes"
                    />
                    <p className="card-text">{item.description}</p>
                    <span className="card-subtitle mb-2 text-muted">
                      ${item.price?.$numberDecimal}
                      <IncDecCounter
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                      />
                    </span>
                  </div>
                </div>
              );
            })
          : "No dishes found for the selected restaurant"}
      </div>
      <CheckoutModal
        show={showCart}
        handleClose={closeCheckoutModal}
        handleNewDish={() => {}}
        newDish={() => {}}
        checkoutListener={proceedToCheckout}
        restDishes={restDishes}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
};

Restaurant.propTypes = {
  props: PropTypes,
};

const mapStateToProps = (state) => {
  return {
    restDishes: state.selectedRestaurant.dishes || [],
    selectedRestaurant: state.selectedRestaurant || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearRestaurantData: () =>
      dispatch({ type: ACTION_TYPE.CLEAR_RESTAURANT_DATA }),
    addDishes: (val) => dispatch({ type: ACTION_TYPE.ADD_DISHES, value: val }),
    increaseQuantity: (val) => {
      dispatch({ type: ACTION_TYPE.INCREASE_QUANTITY, value: val });
    },
    decreaseQuantity: (val) => {
      dispatch({ type: ACTION_TYPE.DECREASE_QUANTITY, value: val });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
