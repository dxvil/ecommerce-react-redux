import { Field, FormSection } from "redux-form";
import { Input } from "semantic-ui-react";
import React from "react";
import { reduxForm } from "redux-form";

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
    };
  }

  render() {
    return (
      <FormSection>
        <form className="delivery__data">
          <i className="icon home" />
          <label>Город доставки: </label>
          <select onChange={(e) => this.setState({ city: e.target.value })}>
            <option>Москва</option>
            <option>Питер</option>
          </select>
          <label>Улица: </label>
          <Field component={Input} name="street" type="text" required />
          <label>Квартира: </label>
          <Field name="apartment" type="number" component={Input} required />
          <label>Этаж: </label>
          <Field
            name="floor"
            type="number"
            max="93"
            required
            component={Input}
          />
        </form>
      </FormSection>
    );
  }
}

DeliveryInfo = reduxForm({ form: "deliveryInfo" })(DeliveryInfo);

export { DeliveryInfo };
