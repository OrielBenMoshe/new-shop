class SimpleElement extends React.Component {
  state = {
    count: 5,
  };
  resetCount = () => {
    this.setState({ count: 0 });
  };
  incrementCount = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };
  render() {
    return (
      <div>
        <div>Count: {this.state.count}</div>
        <div>
          <button onClick={this.incrementCount}>Increment Count</button>
          <button onClick={this.resetCount}>Reset Count</button>
        </div>
      </div>
    );
  }
}
