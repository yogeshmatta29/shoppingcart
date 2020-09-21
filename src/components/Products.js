import React, { Component } from 'react'
import Formatcurrency from './util';
import Modal from 'react-modal';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state={
            product:null
        };
    }
    openModal = (product) => {
        this.setState({product});
    }
    closeModal = () => {
        this.setState({product: null});
    }
    render() {
        const {product} = this.state;
        return (
            <>
                <ul className="productsList">
                        {this.props.product.map(product => 
                            <li key={product.id}>
                                <div className="product">
                                    <a href={"#" + product.id} onClick={()=> this.openModal(product)}>
                                        <div className="product-img">
                                            <img src={product.image} alt={product.title} />
                                        </div>
                                        <p>{product.title}</p>
                                    </a>
                                </div>
                                <div className="product-price">
                                    <div className="price">
                                        {Formatcurrency(product.price)}
                                    </div>
                                    <button className="button primary" onClick={()=> this.props.addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </li>
                        )}
                </ul>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <button className="close-modal" onClick={this.closeModal}>&times;</button>
                            <div className="product-details">
                                <div className="product-details-img">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="product-details-desc">
                                    <p><strong>{product.title}</strong></p>
                                    <p>{product.description}</p>
                                    <p>
                                        Available Sizes: {" "}
                                        {product.availableSizes.map((x) =>(
                                            <span>
                                                {" "} 
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{Formatcurrency(product.price)}</div>
                                        <button className="button primary" onClick={(e)=> {
                                                this.props.addToCart(product); 
                                                this.closeModal();
                                            }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </>
        )
    }
}

export default Products