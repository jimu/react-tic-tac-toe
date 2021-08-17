import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

///////////////////////////////////////////////////
// renders one square
class Square0 extends React.Component {

  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}>
      {this.props.value}
      </button>
    );
  }
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

///////////////////////////////////////////////////
// renders 9 Squares
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentToken: 'X',
    };

  }

  handleClick(i) {
    console.log("hi");
    const squares = this.state.squares.slice();
    squares[i] = this.state.currentToken;

    const token = this.state.currentToken === 'X' ? 'O' : 'X';
    this.setState({currentToken: token, squares: squares});
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: ' + this.state.currentToken;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

}




///////////////////////////////////////////////////
// renders Board and placeholder stuff
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

//
///////////////////////////////////////////////////
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
