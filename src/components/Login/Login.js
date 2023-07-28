import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type==='USER_INPUT'){
    return (
      {value: action.val, isValid:action.val.includes('@')}
    )
  }
  if(action.type==='INPUT_BLUR'){
    return (
      {value: state.value, isValid:state.value.includes('@')}
    )
  }
  return (
    {value: '', isValid:false}
  )
};

const passwordReducer = (state, action) => {
  if(action.type==='USR_PASRD'){
    return  {value: action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid:state.value.trim().length > 6}
  }
  return {value: '', isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClgName, setEntEredClgNme] = useState('');
  const [clgIsValid, setClsIsValid] =useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid:false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid:false})
  useEffect (() => {
    console.log('Effect Running');

    return () => {
      console.log('Effect cleanUp');
    }
  }, []);

  // useEffect(() => {

  //   const identifiers = setTimeout(() => {
  //     console.log('checking validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredClgName.trim().length > 0
  //     );
  //   },500);

  //   return () => {
  //     console.log('clean up');
  //     clearTimeout(identifiers)

  //   }
    
  // }, [enteredEmail, enteredPassword, enteredClgName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val:event.target.value})  
    setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid && enteredClgName.trim().length > 0
          );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USR_PASRD', val:event.target.value})
    setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6 && enteredClgName.trim().length > 0
          );
  };
  
  const clgChangeHandler =(event) => {
    setEntEredClgNme(event.target.value);
    setFormIsValid(
            emailState.isValid && passwordState.isValid && event.target.value.trim().length > 0
          );
  }

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };
  const validClgName = () => {
    setClsIsValid(enteredClgName.trim().length > 0);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,enteredClgName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            clgIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clg">Collage Name</label>
          <input
            type="text"
            id="clg"
            value={enteredClgName}
            onChange={clgChangeHandler}
            onBlur={validClgName}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
