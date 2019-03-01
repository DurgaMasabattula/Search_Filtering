import React from 'react';
import './ProductDetails.component.scss';
import endpoints from '../../api/endpoints.config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import RatingStarsComponent from '../RatingStars/RatingStars.component';

class ProductDetailsComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lgShow: true
		};
	}

	componentDidMount() {
		this.setState({
			lgShow: true
		});
	}

	componentWillUnmount() {
		this.setState({
			lgShow: false
		});
	}

	render() {
		let lgClose = () => {
			this.setState({ lgShow: false })
			this.props.close();
		};
		return(
			<Modal
			size="lg"
			show={this.state.lgShow}
			onHide={lgClose}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						{this.props.product.productName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row mx-0">
						<div className="col-6">
							<img  className="w-100" src={endpoints.baseurl + this.props.product.productImage} />
						</div>
						<div className="col-6 pl-3 mt-4">
							<div className="font-weight-bold">Product Details:</div>
							<div dangerouslySetInnerHTML={{__html: this.props.product.shortDescription}}></div>
							<div className="mt-3 font-weight-bold">{this.props.product.price}</div>
							<div className="mt-2">
								<div className="font-weight-bold">{this.props.product.inStock ? 'Available in stock' : 'Sold out'}</div>
								<div className="mt-2">
									<RatingStarsComponent  rating={this.props.product.reviewRating} count={this.props.product.reviewCount} />
								</div>
							</div>
						</div>

						<div className="col-12 mt-3">
							<div dangerouslySetInnerHTML={{__html: this.props.product.longDescription}}></div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}

export default ProductDetailsComponent;