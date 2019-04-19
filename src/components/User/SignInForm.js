import React from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends React.Component {

  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className={this.props.className}>
        <h3>Sign in</h3>
        <label className="label">
          email
          <input
            name="email"
            value={email}
            className="input"
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </label>
        <label className="label">
          password
          <input
            name="password"
            className="input"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </label>
        <button
          disabled={isInvalid}
          type="submit"
          className="submit"
        >
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


export default SignInForm;
