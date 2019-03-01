import React from 'react';
import './ProductList.component.scss';
import endpoints from '../../api/endpoints.config';
import RatingStarsComponent from '../RatingStars/RatingStars.component';
import ProductDetailsComponent from '../ProductDetails/ProductDetails.component';
import LoaderComponent from '../Loader/Loader.component';

class ProductListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			viewProduct: null,
			loader: false
		}
	}

	componentDidMount() {
		this.getData(1, 30);
	}

	getData = (number, pagesize) => {
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const url = `${proxyUrl}${endpoints.baseurl}${endpoints.productsList}${number}/${pagesize}`;
		const self = this;
		this.setState({loader : true});
		fetch(url)
			.then(response => response.json())
			.then(data => {
				self.setState({
					products: data.products,
					loader : false
				});
			})
			.catch(error => {
				this.setState({loader : false});
				console.log(error);
			});
	}

	viewDetails(product) {
		this.setState({
			viewProduct: product
		})
	}

	render() {
		let rendercomponent = this.state.products.map((product, ind) => {
					return(
						<div className="col-12 col-md-4 col-lg-3 mt-5" key={'prod' + ind}>
							<div className="col-12 shadow h-100">
								<ul className="list-unstyled text-center h-100 m-0">
									<li><img height="200" width="auto" src={endpoints.baseurl + product.productImage} /></li>
									<li>{product.productName}</li>
									<li className="mt-3 w-100 move-bottom">
										<div className="font-weight-bold">{product.price}</div>
										<div><RatingStarsComponent  rating={product.reviewRating} count={product.reviewCount} /></div>
										<div className="mt-3"><button className="btn btn-primary btn-sm" onClick={() => this.viewDetails(product)}>View Details</button></div>
									</li>
								</ul>
							</div>
						</div>
					)
				})
		return (
			<div className="row mx-0">
				{ this.state.loader ? <LoaderComponent/> : '' }
				{rendercomponent}
				{ this.state.viewProduct ? <ProductDetailsComponent product={this.state.viewProduct} /> : '' }
			</div>
		)
	}

}

export default ProductListComponent;