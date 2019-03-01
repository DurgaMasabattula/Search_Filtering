import React from 'react';
import './RatingStars.component.scss';
class RatingStarsComponent extends React.Component {
	render(){
		let rating = Math.round(this.props.rating/5*100/10) * 10 + '%';
		return(
			<div>
				<span className="stars">
					<span className="inner-stars" style={{width: rating}}></span> 
				</span> 
				<span className="ml-2">({this.props.count})</span>
			</div>
		)
	}
}

export default RatingStarsComponent;