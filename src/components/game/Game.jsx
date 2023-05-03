import React from 'react';
import cls from './game.module.css';

function Square(props) {
    return (
        <button
            className={cls.square}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className={cls['board-row']}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={cls['board-row']}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={cls['board-row']}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                step: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currrent = history[history.length - 1];
        const squares = currrent.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                change: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const currrent = history[this.state.stepNumber];
        const winner = calculateWinner(currrent.squares);

        const moves = history.map((step, move) => {
            const idStep = this.state.history[move].change;
            let location;
            if (idStep <= 2) {
                location = `1 ${idStep + 1}`;
            } else if (idStep <= 5) {
                location = `2 ${idStep + 1 - 3}`;
            } else {
                location = `3 ${idStep + 1 - 6}`;
            }

            const desc = move ?
                'Перейти к ходу #' + move + ' ' +
                history[move].squares[idStep] + ' на ' +
                location :
                'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = 'Выйграл ' + winner;
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className={cls.game}>
                <div className={cls['game-board']}>
                    <Board
                        squares={currrent.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className={cls['game-info']}>
                    <div>{status}</div>
                    <ol className={cls.list}>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}