import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchInput = ({ style = {} }) => {
	const [username, setUsername] = useState('');

	return (
		<Form style={style}>
			<Form.Group
				style={{ display: 'flex', justifyContent: 'center', margin: '0' }}
			>
				<Form.Control
					type="text"
					placeholder="username"
					value={username}
					style={{
						maxWidth: '400px',
						borderTopRightRadius: '0',
						borderBottomRightRadius: '0',
					}}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							if (username) {
								window.location = `/?username=${username}`;
								return;
							}
						}
					}}
				/>
				<Button
					variant="primary"
					disabled={!username}
					style={{
						borderTopLeftRadius: '0',
						borderBottomLeftRadius: '0',
					}}
					onClick={() => {
						window.location = `/?username=${username}`;
					}}
				>
					Search
				</Button>
			</Form.Group>
		</Form>
	);
};

export default SearchInput;
