import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

///////////////////////////////////////////////////
// renders one square

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

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {

    return (
      <div>
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

  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        currentToken: 'X',
        winner: null,
        }],
      stepNumber: 0,
    };
  }


  jumpTo(step) {
    console.log("Step: " + step);
    this.setState({stepNumber: step});
  }




  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];


    const winner = current.winner;
    const status =
      winner === null ?  'Next player: ' + current.currentToken :
      winner === 0    ?  'Stalemate' :
      'Winner: ' + winner;

    // step is the history record
    // move is the turn number (0...n)
    const moves = history.map((step, move) => {
      const x = step.cell % 3 + 1;
      const y = Math.floor(step.cell / 3) + 1;
      const isCurrent = move == stepNumber;
      var desc = move ?
        'Go to move #' + move + "(" + y + "," + x + ')':
        'Go to game start';

      if (isCurrent) {
        desc = <b>{desc}</b>;
      }
      return <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>;
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {

    console.log("Click(" + i + ")");

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    if (current.winner === null) {
      const squares = current.squares.slice();
      squares[i] = current.currentToken;

      const token = current.currentToken === 'X' ? 'O' : 'X';

      const winner = CheckWinner(squares);

      this.setState({
        history: history.concat([{
          squares: squares,
          winner: winner,
          currentToken: token,
          cell: i,
        }]),
        stepNumber: history.length,
      });
    }
  }

}

// ========================================

//
///////////////////////////////////////////////////
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
