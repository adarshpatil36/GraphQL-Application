import React from "react";

export default function PastOrderCard({ selectedRestaurant }) {
  return (
    <div className="row PastOrderCard">
      <span>Restaurant Name: {selectedRestaurant.name}</span>
      <div className="col-lg-10 offset-lg-1">
        <div className="cart_container">
          <div className="cart_items">
            <ul className="cart_list">
              <li className="cart_item clearfix">
                <div className="cart_item_image">
                  <img src={selectedRestaurant.restaurantPic} alt="" />
                </div>
                <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                  <div className="cart_item_name cart_info_col">
                    <div className="cart_item_title">Name</div>
                    <div className="cart_item_text">
                      {selectedRestaurant?.orderItems.map((item) => (
                        <div className="cart_item_text">{item.name}</div>
                      ))}
                    </div>
                  </div>

                  <div className="cart_item_quantity cart_info_col">
                    <div className="cart_item_title">Quantity</div>
                    <div className="cart_item_text">
                      {selectedRestaurant?.orderItems.map((item) => (
                        <div className="cart_item_text">{item.quantity}</div>
                      ))}
                    </div>
                  </div>
                  <div className="cart_item_price cart_info_col">
                    <div className="cart_item_title">Price</div>
                    <div className="cart_item_text">
                      {selectedRestaurant?.orderItems.map((item) => (
                        <div className="cart_item_text">{`$${item.price}`}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="order_total">
            <div className="order_total_content text-md-right">
              <div className="order_total_title">Order Total:</div>
              <div className="order_total_amount">
                ${selectedRestaurant.totalAmount?.$numberDecimal}
              </div>
            </div>
          </div>

          <div>
            <span className="cart_item_text">Delivered Address: </span>
            <span>{selectedRestaurant.deliveryAddress}</span>
          </div>
          <div>
            <span className="cart_item_text">Additional Instructions: </span>
            <span>{selectedRestaurant.additionalInstructions}</span>
          </div>
          <div>
            <span className="cart_item_text">Order Status: </span>
            <span>{selectedRestaurant.orderStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
