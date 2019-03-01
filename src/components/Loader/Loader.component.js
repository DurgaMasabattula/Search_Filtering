import React from 'react';
import './Loader.component.scss';

class LoaderComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="col-12 text-center">
				<div className="icon"><span className="fa fa-spinner fa-spin"></span> Loading...</div>
				<div className="col-12 text-center modal-backdrop loader"></div>
			</div>
		)
	}
}

export default LoaderComponent