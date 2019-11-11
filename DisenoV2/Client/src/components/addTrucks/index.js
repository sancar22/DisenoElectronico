// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Components
import TextFieldGroup from "../main/common/textFieldGroup";

// Assets

// Import actions
import { addTrucks } from "../../actions/profileActions";

class AddTrucks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			truckname: ""
		};
		this.onChange = this.onChange.bind(this);
		this.newTruck = this.newTruck.bind(this);
	}
	componentDidMount() {}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	newTruck() {
		const truck = {
			truckname: this.state.truckname
		};
		this.props.addTrucks(truck, this.props.history);
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-6'>Register new trucks</h1>
							<p>{user.user} register your new truck with an unique ID</p>
							<TextFieldGroup
								placeholder='New Truck Name'
								name='truckname'
								type='text'
								value={this.state.truckname}
								onChange={this.onChange}
							/>
							<div
								className='btn btn-info btn-block mt-4'
								onClick={() => {
									this.newTruck();
								}}
							>
								Register Truck
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddTrucks.propTypes = {
	addTrucks: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addTrucks }
)(withRouter(AddTrucks));
