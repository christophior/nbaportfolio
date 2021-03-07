import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocalStorage } from '@rehooks/local-storage';

const Search = () => {
	const [username, setUsername] = useState('');
	const [favoritedUsers = []] = useLocalStorage('favoritedUsers');

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

			{favoritedUsers.length > 0 && (
				<>
					<div style={{ padding: '1rem 0' }}>
						<hr />
					</div>

					<h2 style={{ padding: '1rem 0', fontSize: '28px' }}>
						favorited users
					</h2>

					<div
						style={{
							display: 'flex',
							maxWidth: '400px',
							justifyContent: 'center',
							margin: 'auto',
							flexWrap: 'wrap',
						}}
					>
						{favoritedUsers.map((u) => (
							<a className="savedUserLink" href={`/?username=${u}`}>
								{u}
							</a>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Search;
