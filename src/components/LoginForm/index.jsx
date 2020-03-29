import React, { useGlobal } from 'reactn';
import { useForm } from 'react-hook-form';
import fetch from 'node-fetch';
import './styles.scss';
import { useStateWithLocalStorage, now } from '../../hooks';

const LoginForm = () => {
  const [, setApiSession] = useStateWithLocalStorage('apiSession');
  const { register, handleSubmit, errors, reset } = useForm();
  const [responseError, setResponseError] = useGlobal(false);
  const [message, setMessage] = useGlobal('');
  const [loading, setLoading] = useGlobal(false);
  const onSubmit = formData => {
    if (responseError) setResponseError(false);
    const doLogin = async (url, options) => {
      setLoading(true);
      try {
        const resp = await fetch(url, options)
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            console.log(error);
          });
        const data = await resp.json();

        if (!data.current_user) {
          if (data.message) {
            // Wrong credentials, etc.
            reset();
            setResponseError(true);
            setLoading(false);
            setMessage(data.message);
          } else {
            setResponseError(true);
            setMessage('Login response not recognized.');
          }
        } else if (!resp.ok) {
          // Response error.
          setResponseError(true);
          setMessage('Some Error.');
          setLoading(false);
          throw Error(resp.statusText);
        } else {
          // Success
          setLoading(false);
          setResponseError(false);
          const string = JSON.stringify({
            start_time: now(),
            ...data
          });
          setApiSession(string);
          location.replace('user');
          setMessage(`Success!${string}`);
        }
      } catch (error) {
        setResponseError(true);
        setLoading(false);
        setMessage(`Error caught: ${error}`);
      }
    };
    doLogin(`${process.env.GATSBY_API_LOGIN_URL}/user/login?_format=json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
      // body: getLocalStorage('sessionToken')
    });
  };
  return (
    <>
      {message ? <h3>{message}</h3> : ''}
      {loading ? <h4>Loading...</h4> : ''}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          User name
          <input
            name="name"
            id="name"
            placeholder="yourName"
            type="text"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="error-name-required"
            ref={register({ required: 'This field is required' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label htmlFor="pass">
          First Name
          <input
            name="pass"
            placeholder="enter your password"
            type="password"
            aria-invalid={errors.pass ? 'true' : 'false'}
            aria-describedby="error-pass-required"
            ref={register({ required: 'This field is required' })}
          />
          {errors.pass && <p>{errors.pass.message}</p>}
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
