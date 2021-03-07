import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Search = () => {
	const [username, setUsername] = useState('');

	return (
		<>
			<h2 style={{ padding: '1rem 0' }}>search for an NBA TopShot user</h2>

			<Form>
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								window.location = `/?username=${username}`;
								return;
							}
						}}
					/>
				</Form.Group>

				<Button
					variant="primary"
					onClick={() => {
						window.location = `/?username=${username}`;
					}}
				>
					Search
				</Button>
			</Form>
		</>
	);
};

export default Search;
