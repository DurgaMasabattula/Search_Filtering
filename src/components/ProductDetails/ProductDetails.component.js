import React from 'react';
import './ProductDetails.component.scss';
import endpoints from '../../api/endpoints.config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

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
		let lgClose = () => this.setState({ lgShow: false });
		return(
			<Modal
			size="lg"
			show={this.state.lgShow}
			onHide={lgClose}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
					Large Modal
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>...</Modal.Body>
			</Modal>
		)
	}
}

export default ProductDetailsComponent;