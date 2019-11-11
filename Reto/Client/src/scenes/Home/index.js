// Dependencies
import React from "react";

// Components
import useFormInput from "../../components/CustomHooks/useFormInput";

// Assets
import "./home.scss";
import logo from "../../Assets/whitelogo.png";

function Home(props) {
	const username = useFormInput("");
	const password = useFormInput("");
	return (
		<div className='home container-fluid'>
			<div className='row'>
				<img src={logo} alt='logo' className='col-4 Home--Image' />
				<div className='col-4 Home--Form'>
					<h1 className='Home--Title'>
						{" "}
						Welcome! Please login to your account.{" "}
					</h1>
					<form className='Home--FormBox'>
						<div className='form-group'>
							<input
								className='Home--Input'
								placeholder='Username'
								{...username}
							/>
						</div>
						<div className='form-group'>
							<input
								className='Home--Input'
								placeholder='Password'
								type='password'
								{...password}
							/>
						</div>
						<div
							className='btn btn1 text-light Home--Btn'
							onClick={() => {
								props.history.push("/map");
							}}
						>
							Login
						</div>
						<div
							className='btn btn2 Home--Btn'
							onClick={() => {
								props.history.push("/SignUp");
							}}
						>
							Sign Up
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Home;
