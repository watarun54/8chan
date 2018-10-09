import React from 'react';
import { Button, FormGroup, FormControl} from 'react-bootstrap';


class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: ''
        }
    }

    onChangetext(e) {
        this.setState({product: e.target.value});
    }

    handleSubmit = () => {
        this.props.createProduct(this.state.product);
        this.setState({product: ''});
    }

    render() {
        return(
            <div className="form-area">
                <form>
                    <FormGroup controlId="formBasicText">
                        <FormControl
                            type="text"
                            value={this.state.product}
                            placeholder="Enter text"
                            onChange={ e => this.onChangetext(e)}
                        />
                    </FormGroup>
                </form>
                <Button type="submit" onClick={this.handleSubmit}>つぶやく</Button>
            </div>
        )
    }
}


export default FormContainer