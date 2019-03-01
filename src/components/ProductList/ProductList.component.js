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
			loader: false,
			totalPages: null,
			currentPage: 1,
			pagesize: 30
		}
	}

	self = this;

	componentDidMount() {
		window.addEventListener('scroll', this.handleOnScroll);
		this.getData(this.state.currentPage);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleOnScroll);
	}

	handleOnScroll = () => {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		var clientHeight = document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1000;
		if (scrolledToBottom && this.state.currentPage <= this.state.totalPages) {
			this.getData(this.state.currentPage);
			return;
		}
	}

	getData = (number) => {
		if(this.state.loader) { return; }
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const url = `${proxyUrl}${endpoints.baseurl}${endpoints.productsList}${number}/${this.state.pagesize}`;
		// const self = this;
		this.setState({loader : true});
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({
					products: this.state.products.concat(data.products),
					loader : false,
					currentPage: this.state.currentPage + 1,
					totalPages: Math.ceil(data.totalProducts/this.state.pagesize)
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
			<div className="row mx-0 main-content">
				{ this.state.loader ? <LoaderComponent/> : '' }
				{rendercomponent} 
				{ this.state.viewProduct ? <ProductDetailsComponent product={this.state.viewProduct} close={this.emptyProductOnClose}/> : '' }
			</div>
		)
	}

}

export default ProductListComponent;