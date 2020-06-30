import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../../redux/actions/index';
const Payments = ({ handleStripeToken }) => {
  const onToken = (token) => {
    handleStripeToken(token);
  };
  return (
    // ...
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStripeToken: (token) => dispatch(handleStripeToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(Payments);
