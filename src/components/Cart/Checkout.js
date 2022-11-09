import classes from "./Checkout.module.css";
import React,{useRef,useState} from "react";

const isEmpty = value => value.trim() ===''
const isFiveChars = (value) => value.trim().length ===5;

const Checkout = (props) => {

  const [formInputValitidy, setFormInputValidity]= useState({
    name:true,
    street: true,
    city: true,
    postalCode : true
  })

  const nameInputRef  = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postcodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postcodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);


    setFormInputValidity({
      name: enteredCityIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;
    if(!formIsValid)
      return;
    // submit cart data
    props.onConfirm(
    {name:enteredName,
    street: enteredStreet,
    city: enteredCity,
    postalCode : enteredPostalCode}
    );
  };
  const nameControlClasses = `${classes.control} ${formInputValitidy.name ? '' : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValitidy.postalCode ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValitidy.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValitidy.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValitidy.name && <p>please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValitidy.street && <p>please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postcodeInputRef} />
        {!formInputValitidy.postalCode && (
          <p>please enter a valid postal code</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValitidy.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
