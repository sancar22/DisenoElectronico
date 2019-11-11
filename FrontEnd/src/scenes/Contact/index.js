// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import actions

// Assets
import "./contact.scss";

export class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			phone: "",
			message: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const message = {
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone,
			message: this.state.message
		};
		console.log(message);
	}

	render() {
		return (
			<>
				<div className={"Contact"}>
					<span className={"Contact--Title"}>Contáctanos</span>
					<p className={"Contact--Desc"}>
						Siempre atentos para brindarte el mejor servicio de localización en
						tiempo real.
					</p>
					<div className={"Contact--Holder"}>
						<div className={"Contact--Holder--Info"}>
							<input
								className={"Contact--Holder--Info--Input"}
								type="text"
								name="name"
								value={this.state.name}
								placeholder="Nombre"
								onChange={this.onChange}
							/>
							<input
								className={"Contact--Holder--Info--Input"}
								type="text"
								name="email"
								value={this.state.email}
								placeholder="Correo"
								onChange={this.onChange}
							/>
							<input
								className={"Contact--Holder--Info--Input"}
								type="text"
								name="phone"
								value={this.state.phone}
								placeholder="Teléfono / Celular"
								onChange={this.onChange}
							/>
							<textarea
								className={"Contact--Holder--Info--InputArea"}
								type="text"
								name="message"
								value={this.state.message}
								placeholder="Dejanos tus dudas, comentarios o solicitudes aqui."
								onChange={this.onChange}
							/>
							<div
								onClick={this.onSubmit}
								className={"Contact--Holder--Info--Send"}
							>
								Enviar
							</div>
						</div>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7039637248868!2d-74.79069723548722!3d10.985702992179752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d64f7e57309%3A0x5150b0e3785b60da!2sParque+Central%2C+Barranquilla%2C+Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1545494967466"
							frameBorder="0"
							className={"Contact--Holder--Map"}
							title="Map Location"
							allowFullScreen
							style={{ borderRadius: "5px" }}
						/>
					</div>
				</div>
			</>
		);
	}
}

Contact.propTypes = {
	message: PropTypes.object
};

const mapStateToProps = state => ({
	message: state.message
});

export default connect(mapStateToProps)(Contact);
