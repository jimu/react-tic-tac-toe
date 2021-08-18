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

function CheckWinner(squares) {

  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0; i < wins.length; ++i) {
    const [a,b,c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  for (let i = 0; i < squares.length; ++i) {
    if (squares[i] == null)
      return null;
  }

  return 0;
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
      winner: null,
    };

  }

  handleClick(i) {

    if (this.state.winner === null) {
      console.log("hi");
      const squares = this.state.squares.slice();
      squares[i] = this.state.currentToken;

      const token = this.state.currentToken === 'X' ? 'O' : 'X';

      const winner = CheckWinner(squares);

      this.setState({currentToken: token, squares: squares, winner: winner});
    }
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {

    const winner = this.state.winner;
    const status =
      winner === null ?  'Next player: ' + this.state.currentToken :
      winner === 0    ?  'Stalemate' :
      'Winner: ' + winner;
      
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
