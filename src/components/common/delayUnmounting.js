import React from 'react';

function delayUnmounting(Component) {
  return class extends React.Component {
    state = {
      shouldRender: this.props.isMounted,
      isUnmounting: false
    };

    componentDidUpdate(prevProps) {
      if (prevProps.isMounted && !this.props.isMounted) {
        this.setState({ isUnmounting: true });
        setTimeout(
          () => this.setState({ shouldRender: false }),
          this.props.delayTime
        );
      } else if (!prevProps.isMounted && this.props.isMounted) {
        this.setState({ shouldRender: true, isUnmounting: false });
      }
    }

    render() {
      return this.state.shouldRender ?
        <Component isUnmounting={this.state.isUnmounting} {...this.props} />
        : null;
    }
  };
}

export default delayUnmounting;
