import React from 'react';
import { Button } from 'react-bootstrap';


class ViewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateText: '',
        }
    }

    handleDelete = () => {
        this.props.onDelete(this.props.data.id)
    }

    handleUpdate = () => {
        this.props.onUpdate(this.props.data.id, this.state.updateText)
        this.setState({updateText: ""})
    }

    handleInput = (e) => {
        this.setState({updateText: e.target.value})
    }

    render() {
        return(
            <div>
                <span>{ this.props.data.id } : { this.props.data.text }</span>
                <span className="deleteButton" onClick={this.handleDelete}>X</span>
                <span>
                    <input type="text" className="update-input" value={this.state.updateText} onChange={e => this.handleInput(e)} />
                </span>
                <span>
                    <Button type="submit" onClick={this.handleUpdate}>更新</Button>
                </span>
            </div>
        )
    }
}


export default ViewProduct