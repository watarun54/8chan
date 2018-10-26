import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class DropdownBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            selectedPriority: this.props.selectedPriority,
            selectedColor: {},
        }
    }

    onChangeColor = (selectedPriority) => {
        if (selectedPriority === 0) {
            return {
                "backgroundColor": "red"
            }
        }
        if (selectedPriority === 1) {
            return {
                "backgroundColor": "#ffa500"
            }
        }
        if (selectedPriority === 2) {
            return {
                "backgroundColor": "green"
            }
        }
    }

    componentWillMount() {
        let selectedColor = this.onChangeColor(this.state.selectedPriority);
        this.setState({selectedColor: selectedColor});
    }

    toggleDropDown = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }

    onRadioBtnClick = (selected) => {
        this.props.handleSetPriority(selected);
        let selectedColor = this.onChangeColor(selected);
        this.setState({selectedColor: selectedColor});
    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown} size="sm">
                <DropdownToggle caret style={this.state.selectedColor}>
                    
                </DropdownToggle>
                <DropdownMenu className="priority-menu">
                    <DropdownItem className="eme-imp-button" onClick={() => this.onRadioBtnClick(0)}></DropdownItem>
                    <DropdownItem className="eme-button" onClick={() => this.onRadioBtnClick(1)}></DropdownItem>
                    <DropdownItem className="imp-button" onClick={() => this.onRadioBtnClick(2)}></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}


export default DropdownBtn