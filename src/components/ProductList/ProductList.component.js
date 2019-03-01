import React from 'react';
import './ProductList.component.scss';
import endpoints from '../../api/endpoints.config';
import RatingStarsComponent from '../RatingStars/RatingStars.component';

class ProductListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		this.getData(1, 30);
	}

	getData = (number, pagesize) => {
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const url = `${proxyUrl}${endpoints.baseurl}${endpoints.productsList}${number}/${pagesize}`;
		const self = this;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				self.setState({
					products: data.products
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		let rendercomponent = this.state.products.map((product, ind) => {
			return(
				<div className="col-12 col-md-4 col-lg-3 mt-5" key={'prod' + ind}>
					<div className="col-12 shadow h-100">
						<ul className="list-unstyled text-center">
							<li><img height="200" width="auto" src={endpoints.baseurl + product.productImage} /></li>
							<li>{product.productName}</li>
							<li className="font-weight-bold text-center mt-3">{product.price}</li>
							<li><RatingStarsComponent  rating={product.reviewRating} count={product.reviewCount} /></li>
						</ul>
					</div>
				</div>
			)
		});
		return (
			<div className="row mx-0">
				{rendercomponent}
			</div>
		)
	}

}

export default ProductListComponent;