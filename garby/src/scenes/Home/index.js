// Dependencies
import React from "react";

// Assets
import "./home.scss";

// Hooks
import useFormInput from "../../components/CustomHooks/useFormInput";

function Home(props) {
	const UserName = useFormInput("");
	const Email = useFormInput("");
	const Password = useFormInput("");
	const ConfPassword = useFormInput("");
	return (
		<div className='container-fluid'>
			<div className='Box1'>
				<h1 className='Box1--Title'>GARBY</h1>
				<p className='Box1--Paragraph'>
					Tired of garbage in the front of your house or in the street of your
					neighborhood?. Use our app and solve your problems by requesting a
					truck to clean your problems.
				</p>
			</div>
			<div className='Box2'>
				<div className='Box2--Title'>Register</div>
				<div className='Box2--Text'>Create a new account</div>
				<input
					className='Box2--Input'
					type='text'
					placeholder='Username'
					{...UserName}
				/>
				<input
					className='Box2--Input'
					type='email'
					placeholder='Email'
					{...Email}
				/>
				<input
					className='Box2--Input'
					type='password'
					placeholder='Password'
					{...Password}
				/>
				<input
					className='Box2--Input'
					type='password'
					placeholder='Confirm Password'
					{...ConfPassword}
				/>
				<p className='Box2--Terms'>
					Submitting your info you are accepting all our terms and conditions.
				</p>
				<div className='Box2--BtnContainer'>
					<div
						className='Box2--Btn'
						onClick={() => {
							props.history.push("/request");
						}}
					>
						Register
					</div>
					<div
						className='Box2--Btn'
						onClick={() => {
							props.history.push("/request");
						}}
					>
						Log In
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
