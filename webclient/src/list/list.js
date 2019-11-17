import React from 'react';
import {notes} from 'tensorhackfetchapi';

function getList() {
    return notes.getNotes();
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

class TodoList extends React.Component {
    list: [11,22]

    constructor(props) {
        super(props);
        this.state = {
            goods: [{
                _id: 1,
                name: 'молоко'
            }, {
                _id: 2,
                name: 'хлеб'
            }, {
                _id: 3,
                name: 'патроны'
            }, {
                _id: 4,
                name: 'грибы'
            }],
            newValue: ''
        };
        this.onAddHandler = this.onAddHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        getList().then((data) => {
            this.setState({
                goods: data
            })
        })
    }

    onAddHandler() {
        let good = {
            name: this.state.newValue,
            user: 'user1',
            date: 'data'
        }
        notes.createNote(good)
            .then((good) => {
                this.setState({
                    goods: [...this.state.goods, good],
                    newValue: ''
                })
            });
    }

    onRemoveHandler(_id) {
        notes.deleteNote(_id)
            .then(() => {
                this.setState({
                    goods: this.state.goods.filter(good => {
                        return good._id != _id;
                    })
                })
            });
    }

    onKeyDownHandler(e) {
        if (e.keyCode == 13) {
            this.onAddHandler();
        }
    }

    handleChange(event) {
        this.setState({newValue: event.target.value});
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.goods.map((good) =>
                        <div key={good._id}>{good.name}
                            <button onClick={this.onRemoveHandler.bind(this, good._id)}>delete</button>
                        </div>
                    )}
                </ul>
                <input type="text" value={this.state.newValue} onChange={this.handleChange} onKeyDown={e => {
                    this.onKeyDownHandler(e)
                }}/>
                <button onClick={this.onAddHandler}>Добавить</button>
            </div>
        );
    }
}

export default TodoList;