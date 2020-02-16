import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  modalInner: `
    w-10/12 h-10/12
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
  modalBG: `
    fixed top-0 left-0
    w-full h-screen z-100
    bg-black-opaque
    flex items-center justify-center
  `,
}

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList = props.innerStyles || styles.modalInner
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);

    modalRoot.addEventListener('click', this.handleExit);
    modalRoot.classList = styles.modalBG;
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    modalRoot.removeEventListener('click', this.handleExit);
    modalRoot.classList = '';
  }

  handleExit = e => {
    if (e.target.id === 'modal') this.props.exit();
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;
