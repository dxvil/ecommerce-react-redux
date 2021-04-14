import React from "react";
import { Field, FormSection } from "redux-form";
import { Input } from "semantic-ui-react";
import { reduxForm } from "redux-form";

class DeliveryUser extends React.Component {
  render() {
    return (
      <FormSection>
        <form className="delivery__user">
          <i className="icon user" />
          <label>Имя: </label>
          <Field name="name" type="text" component={Input} required />
          <label>Телефон: </label>
          <Field
            component={Input}
            required
            type="tel"
            text="+7"
            placeholder="+7 (000) 000 00 00"
            name="telNumber"
          />
        </form>
      </FormSection>
    );
  }
}

DeliveryUser = reduxForm({ form: "deliveryUser" })(DeliveryUser);

export { DeliveryUser };
