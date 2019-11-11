// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";

export class CarouselItem extends Component {
	render() {
		return (
			<div className="carouselItem">
				<img src={this.props.image} alt="" className="carouselImage" />
				<div className="carouselTextCover" />
				<h1 className="titleImage">{this.props.title}</h1>
				<p className="textImage">{this.props.text}</p>
			</div>
		);
	}
}

CarouselItem.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string
};

export default CarouselItem;
