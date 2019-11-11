// Dependecies
import React, { Component } from "react";

// Components
import CarouselItem from "./carouselItem";

// Assets
import "./carousel.scss";
import img1 from "../../../images/img1.png";
import syrus from "../../../images/syrus.png";
import gpstrack from "../../../images/gpstrack.png";

export class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [
				{
					url: img1,
					title: "Image 1",
					text: "This is the first image",
					index: 0
				},
				{
					url: syrus,
					title: "Image 2",
					text: "This is the second image",
					index: 1
				},
				{
					url: gpstrack,
					title: "Image 3",
					text: "This is the third image",
					index: 2
				}
			],
			image: {
				url: img1,
				title: "Image 1",
				text: "This is the first image",
				index: 0
			}
		};
		this.nextImage = this.nextImage.bind(this);
		this.prevImage = this.prevImage.bind(this);
	}
	nextImage() {
		let newIndex = this.state.image.index + 1;
		if (newIndex === 3) {
			newIndex = 0;
		}
		if (newIndex === -1) {
			newIndex = 2;
		}
		this.setState({
			image: this.state.images[newIndex]
		});
	}
	prevImage() {
		let newIndex = this.state.image.index - 1;
		if (newIndex === 3) {
			newIndex = 0;
		}
		if (newIndex === -1) {
			newIndex = 2;
		}
		this.setState({
			image: this.state.images[newIndex]
		});
	}

	render() {
		return (
			<div className="carouselBox">
				<CarouselItem
					image={this.state.image.url}
					title={this.state.image.title}
					text={this.state.image.text}
				/>
				<div className="carouselControlLeft" onClick={this.prevImage}>
					<i className="fas fa-angle-double-left" />
				</div>
				<div className="carouselControlRight" onClick={this.nextImage}>
					<i className="fas fa-angle-double-right" />
				</div>
			</div>
		);
	}
}

export default Carousel;
