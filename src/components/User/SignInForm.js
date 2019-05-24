import React from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isPasswordSuccess: false,
  isWaiting: false,
}

class SignInForm extends React.Component {

  state = { ...INITIAL_STATE };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isWaiting: true });
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error, isWaiting: false });
      });
  }

  handleForget = () => {
    this.setState({ isWaiting: true });
    this.props.firebase
      .doPasswordReset(this.state.email)
      .then(() => this.setState({ isPasswordSuccess: true, isWaiting: false }))
      .catch(error => this.setState({ error, isWaiting: false }))
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: null,
    });
  }
  render() {
    const {
      email,
      password,
      error,
      isPasswordSuccess,
      isWaiting
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className={this.props.className}>
        <div
          className={isPasswordSuccess ? "modalBoxInner isFlipped" : "modalBoxInner"}
        >
          <form onSubmit={this.handleSubmit} className="faceSignIn">
            <h3>Sign in</h3>
            <label className={isWaiting ? "greyDisabled label" : "label"}>
              email
              <input
                name="email"
                value={email}
                disabled={isWaiting}
                className="input"
                onChange={this.handleChange}
                type="text"
                placeholder="Email Address"
              />
            </label>
            <label className={isWaiting ? "greyDisabled label" : "label"}>
              password
              <input
                disabled={isWaiting}
                name="password"
                className="input"
                value={password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </label>
            <button
              disabled={isInvalid || isWaiting}
              type="submit"
              className="submit"
            >
              Sign In
            </button>

            <button
              className="passwordForget"
              onClick={this.handleForget}
              disabled={!email}
              type="button"
            >
              forgot your password?
            </button>

            {error && <p>{error.message}</p>}
          </form>
          <div className="facePasswordSuccess">
            <h2>SUCCESS</h2>
            <p>You will soon receive instructions to recover your account</p>
          </div>
        </div>
      </div>
    );
  }
}


export default SignInForm;
