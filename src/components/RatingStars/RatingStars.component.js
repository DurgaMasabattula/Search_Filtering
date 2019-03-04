import React from 'react';
import './RatingStars.component.scss';
import PropTypes from 'prop-types';

function RatingStarsComponent(props) {
	let rating = Math.round(props.rating/5*100/10) * 10 + '%';
	return(
		<div>
			<span className="stars">
				<span className="inner-stars" style={{width: rating}}></span> 
			</span> 
			<span className="ml-2">({props.count})</span>
		</div>
	)
}

RatingStarsComponent.propTypes = {
	rating: PropTypes.number,
	count: PropTypes.number
}

export default RatingStarsComponent;