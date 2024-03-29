import React from "react";
import {
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
export default function OrderRow({
  quantityCount,
  selectedRestaurant,
  selectedDishes,
  totalAmount,
  placeOrder,
  address,
  setselectedAddress,
  selectedAddress,
  cancelOrder,
  handleChange,
}) {
  const onChangeDropdown = (item) => {
    setselectedAddress(item);
  };
  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div className="cart_container">
          <div className="cart_title">
            Your Items<small> ({quantityCount} item in your cart) </small>
          </div>
          <div className="cart_items">
            <ul className="cart_list">
              <li className="cart_item clearfix">
                <div className="cart_item_image">
                  <img src={selectedRestaurant.restaurantPic} alt="" />
                </div>
                <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                  <div className="cart_item_name cart_info_col">
                    <div className="cart_item_title">Name</div>
                    {selectedDishes.map((item) => (
                      <div className="cart_item_text">{item.name}</div>
                    ))}
                  </div>

                  <div className="cart_item_quantity cart_info_col">
                    <div className="cart_item_title">Quantity</div>
                    {selectedDishes.map((item) => (
                      <div className="cart_item_text">{item.quantity}</div>
                    ))}
                  </div>
                  <div className="cart_item_price cart_info_col">
                    <div className="cart_item_title">Price</div>
                    {selectedDishes.map((item) => (
                      <div className="cart_item_text">
                        ${item.price?.$numberDecimal}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="order_total">
            <div className="order_total_content text-md-right">
              <div className="order_total_title">Order Total:</div>
              <div className="order_total_amount">${totalAmount}</div>
            </div>
          </div>

          <div>
            <div className="cart_item_text">Address</div>
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedAddress.type}
            >
              {address.length > 0 &&
                address.map((item) => (
                  <Dropdown.Item
                    id={item.id}
                    onClick={() => onChangeDropdown(item)}
                  >
                    {item.type}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
            <p>{selectedAddress?.address}</p>
          </div>
          <div className="additionalInfo">
            <InputGroup>
              <InputGroup.Text>Additional Instructions</InputGroup.Text>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                onChange={handleChange}
              />
            </InputGroup>
          </div>

          <div className="buttongroups">
            <span className="cart_buttons">
              <button
                type="button"
                className="button cart_button_checkout"
                onClick={cancelOrder}
              >
                Cancel Order
              </button>
            </span>
            <span className="cart_buttons">
              <button
                type="button"
                className="button cart_button_checkout"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
