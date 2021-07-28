import React from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isPasswordSuccess: false,
  isWaiting: false,
}

const styles = {
  label: 'block mb-4 p-2 border border-black shadow-card text-sm',
  input: 'block w-full mt-2 text-xl',
  btnSubmit: `
    block w-full mb-4 p-2 text-2xl text-deeppink font-bold
    border-4 border-double border-currentColor rounded-lg
    disabled:border-gray-500 disabled:text-gray-500
    songSubmit
  `,
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
          className={isPasswordSuccess ?
            "relative transition-lg isFlipped h-full" :
            "h-full relative"
          }
          style={{ transformStyle: 'preserve-3d' }}
        >
          <form
            onSubmit={this.handleSubmit}
            className="absolute w-full backface-hidden"
          >
            <h3 className="font-futura text-center font-bold text-2xl mb-1">
              SIGN IN
            </h3>
            <label className={styles.label}>
              email
              <input
                className={styles.input}
                disabled={isWaiting}
                inputmode="email"
                onChange={this.handleChange}
                name="email"
                type="text"
                value={email}
              />
            </label>
            <label className={styles.label}>
              password
              <input
                className={styles.input}
                disabled={isWaiting}
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
            </label>
            <button
              disabled={isInvalid || isWaiting}
              type="submit"
              className={styles.btnSubmit}
            >
              SIGN IN
            </button>

            <button
              className="w-full font-futura text-center disabled:text-gray-500"
              onClick={this.handleForget}
              disabled={!email}
              type="button"
            >
              FORGOT YOUR PASSWORD?
            </button>

            {error && <p>{error.message}</p>}
          </form>
          <div
            className="absolute w-full h-full bg-white"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <h2 className="font-metal text-4xl text-center">SUCCESS</h2>
            <p className="text-center font-futura text-xl">
              You will soon receive instructions to recover your account
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default SignInForm;
