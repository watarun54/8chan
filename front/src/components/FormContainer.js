import React from 'react';
import DropdownBtn from './card-components/DropdownBtn';
import { InputGroup, InputGroupAddon, Button, Input} from 'reactstrap'; 


class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            selectedPriority: 0
        }
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.item, this.state.selectedPriority);
        this.setState({ item: '' });
    }

    handleSetPriority = (selectedPriority) => {
        this.setState({ selectedPriority: selectedPriority});
    }

    render() {
        return(
            <div className="new-task-container">
                <InputGroup>
                    <Input value={this.state.item} placeholder="New task" onChange={(e) => this.setState({ item: e.target.value })}/>
                    <DropdownBtn selectedPriority={this.state.selectedPriority} handleSetPriority={this.handleSetPriority}/>
                    <InputGroupAddon addonType="prepend"><Button onClick={this.handleSubmit}>追加</Button></InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

export default FormContainer