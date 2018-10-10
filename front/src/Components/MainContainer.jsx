import React from 'react';
import axios from 'axios';
import ProductsContainer from './ProductsContainer';
import FormContainer from './FormContainer';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col } from 'react-bootstrap';
import update from 'immutability-helper';


class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://watarun54.com/api/chat')
            .then((results) => {
                console.log(results);
                this.setState({products: results.data.posts});
                console.log(this.state.products)
            })
            .catch((data) => {
                console.log(data);
        })
    }

    createProduct = (product) => {
        axios.post('http://watarun54.com/api/chat', {name: "created", text: product})
            .then((response) => {
                console.log(response);
                const newData = update(this.state.products, {$push:[response.data.data]})
                this.setState({products: newData});
            })
            .catch((data) => {
                console.log(data);
            })
    }

    deleteProduct = (id) => {
        axios.delete(`http://watarun54.com/api/chat/${id}`)
            .then((response) => {
                const productIndex = this.state.products.findIndex(x => x.id ===id)
                const deletedProducts = update(this.state.products, {$splice: [[productIndex, 1, ]]})
                this.setState({products: deletedProducts});
                console.log("delete and set");
            })
            .catch((data) => {
                console.log(data);
            })
    }

    updateProduct = (id, product) => {
        axios.put(`http://watarun54.com/api/chat/${id}`,{name: "updated", text: product})
            .then((response) => {
                console.log(response);
                const productIndex = this.state.products.findIndex(x => x.id ===id)
                const updatedProducts = update(this.state.products, {[productIndex]: {$set: response.data.data}})
                this.setState({products: updatedProducts});
                console.log("update and set")
            })
            .catch((data) => {
                console.log(data);
            })
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <div className='app-main'>
                    <Col xs={12} md={6}>
                        <FormContainer createProduct={this.createProduct}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <ProductsContainer productData={ this.state.products } deleteProduct={this.deleteProduct} updateProduct={this.updateProduct}/>
                    </Col>
                    </div>
                </Row>
            </Grid>
        );
    }
}


export default MainContainer