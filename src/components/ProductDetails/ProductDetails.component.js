import React from 'react';
import './ProductDetails.component.scss';
import endpoints from '../../api/endpoints.config';
import { Modal } from 'react-bootstrap';
import RatingStarsComponent from '../RatingStars/RatingStars.component';

function ProductDetailsComponent(props) {
	let lgShow = props.lgShow;
	let lgClose = () => {
		lgShow = false;
		props.close();
	};
	return(
		<Modal
		size="lg"
		show={lgShow}
		onHide={lgClose}>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">
					{props.product.productName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row mx-0">
					<div className="col-6">
						<img  className="w-100" src={endpoints.baseurl + props.product.productImage} />
					</div>
					<div className="col-6 pl-3 mt-4">
						<div className="font-weight-bold">Product Details:</div>
						<div dangerouslySetInnerHTML={{__html: props.product.shortDescription}}></div>
						<div className="mt-3 font-weight-bold">{props.product.price}</div>
						<div className="mt-2">
							<div className="font-weight-bold">{props.product.inStock ? 'Available in stock' : 'Sold out'}</div>
							<div className="mt-2">
								<RatingStarsComponent  rating={props.product.reviewRating} count={props.product.reviewCount} />
							</div>
						</div>
					</div>

					<div className="col-12 mt-3">
						<div dangerouslySetInnerHTML={{__html: props.product.longDescription}}></div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

ProductDetailsComponent.defaultProps = {
	lgShow: true
}

export default ProductDetailsComponent;