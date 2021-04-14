import React, { useState } from "react";
import "./GoCheckout.css";
import { DeliveryUser } from "./DeliveryUser";
import { DeliveryInfo } from "./DeliveryInfo";
import { Segment, Checkbox } from "semantic-ui-react";
export const GoCheckout = (props) => {
  const [date, setDate] = useState(new Date());

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
      <button className="delivery__confirm">Перейти к оплате</button>
    </div>
  );
};
