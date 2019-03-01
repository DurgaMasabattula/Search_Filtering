import React from 'react';
import './ProductDetails.component.scss';
import endpoints from '../../api/endpoints.config';

class ProductDetailsComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}
}

export default ProductDetailsComponent;