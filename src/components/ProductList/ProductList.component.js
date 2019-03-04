import React from 'react';
import './ProductList.component.scss';
import endpoints from '../../api/endpoints.config';
import RatingStarsComponent from '../RatingStars/RatingStars.component';
import ProductDetailsComponent from '../ProductDetails/ProductDetails.component';
import LoaderComponent from '../Loader/Loader.component';
import PropTypes from 'prop-types';

class ProductListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.currentPage = props.currentPage;
		this.totalPages = props.totalPages;
		this.state = {
			products: [],
			viewProduct: null,
			loader: false,
		}
	}


	componentDidMount() {
		window.addEventListener('scroll', this.handleOnScroll);
		this.getData(this.currentPage);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleOnScroll);
	}

	handleOnScroll = () => {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		var clientHeight = document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1000;
		if (scrolledToBottom && this.currentPage <= this.totalPages) {
			this.getData(this.currentPage);
			return;
		}
	}

	getData = (number) => {
		if(this.state.loader) { return; }
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const url = `${proxyUrl}${endpoints.baseurl}${endpoints.productsList}${number}/${this.props.pagesize}`;
		this.setState({loader : true});
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({
					products: this.state.products.concat(data.products),
					loader : false,
				});
				this.totalPages = Math.ceil(data.totalProducts/this.props.pagesize);
				this.currentPage += 1;
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

	emptyProductOnClose = () => {
		this.setState({
			viewProduct: null
		})
	}

	render() {
		let rendercomponent = this.state.products.map((product, ind) => {
					return(
						<div className="col-12 col-md-4 col-lg-3 mt-5" key={'prod' + ind}>
							<div className="col-12 shadow h-100">
								<ul className="list-unstyled text-center h-100">
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
			<div className="row mx-0" id="maincontent">
				{ this.state.loader ? <LoaderComponent/> : '' }
				{rendercomponent} 
				{ this.state.viewProduct ? <ProductDetailsComponent product={this.state.viewProduct} close={this.emptyProductOnClose}/> : '' }
			</div>
		)
	}

}

ProductListComponent.defaultProps  = {
	pagesize: 30,
	currentPage: 1,
	totalPages: null
};

ProductListComponent.propTypes = {
	currentPage: PropTypes.number
};

export default ProductListComponent;