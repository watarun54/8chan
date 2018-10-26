import React from 'react';
import DropdownBtn from './DropdownBtn';
import { Card, CardBody, CardText, FormGroup, Input, Button } from 'reactstrap';


class Emergency extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateText: '',
            selectedPriority: this.props.item.priority
        }
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.item.id);
    }

    handleUpdate = () => {
        let selectedPriorityChanged = 1;
        if (this.state.selectedPriority === this.props.item.priority) {
            selectedPriorityChanged = 0;
        }
        let updateTextChanged = 1;
        if (this.state.updateText.length === 0) {
            updateTextChanged = 0;
            this.props.handleUpdate(this.props.item.id, this.props.item.text, this.state.selectedPriority, updateTextChanged, selectedPriorityChanged);
        } else {
            this.props.handleUpdate(this.props.item.id, this.state.updateText, this.state.selectedPriority, updateTextChanged, selectedPriorityChanged);
        }
        this.setState({ updateText: '', selectedPriority: this.props.item.priority });
    }

    handleSetPriority = (selectedPriority) => {
        this.setState({ selectedPriority: selectedPriority});
    }

    render() {
        return (
            <div>
                <Card className="eme-card">
                    <CardBody>
                        <CardText>{this.props.item.text}</CardText>
                        <FormGroup>
                            <Input value={this.state.updateText} placeholder="Update task" onChange={e => this.setState({ updateText: e.target.value })}/>
                        </FormGroup>
                        <div>
                            <DropdownBtn selectedPriority={this.state.selectedPriority} handleSetPriority={this.handleSetPriority}/>{' '}
                            <Button onClick={this.handleUpdate} size="sm">更新</Button>{' '}
                            <Button onClick={this.handleDelete} size="sm">削除</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
      }
}


export default Emergency