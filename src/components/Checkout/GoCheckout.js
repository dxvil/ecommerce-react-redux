import React, { useState } from "react";
import "./GoCheckout.css";
import { DeliveryUser } from "./DeliveryUser";
import { DeliveryInfo } from "./DeliveryInfo";
import { Segment, Checkbox } from "semantic-ui-react";
import {connect} from "react-redux";
import {createPurchaseMiddleware} from "../../redux/midllewares/createPurchase";
const GoCheckout = (props) => {
  const [date, setDate] = useState(new Date());

    const onHandleCheckout = () => {
        const delivery = props.info.deliveryInfo.values;
        const user = props.info.deliveryUser.values;
        if(delivery.street && delivery.apartment && delivery.floor && user.name && user.telNumber) {
            const information = {
                street: delivery.street,
                apartment: delivery.apartment,
                floor: delivery.floor,
                name: user.name,
                telNumber: user.telNumber
            }
            props.dispatch(createPurchaseMiddleware('purchases', props.login, information))
        }
    }

  return (
    <div className="delivery">
      <DeliveryInfo />
      <DeliveryUser />
      <div className="save-settings">
        <Segment compact className="sg-custom">
          <Checkbox toggle />
          <p>Сохранить информацию для следующих заказов</p>
        </Segment>
      </div>
      <div className="delivery__time">
        <label for="delivery-date">Дата доставки: </label>
        <input type="date" id="delivery-date" name="delivery-date" />
      </div>
      <button onClick={onHandleCheckout} className="delivery__confirm">Перейти к оплате</button>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        info: state.form
    }
}

export default connect(mapStateToProps, null)(GoCheckout);