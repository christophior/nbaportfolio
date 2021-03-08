import React from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import SearchInput from './SearchInput';

const Search = () => {
	const [favoritedUsers = []] = useLocalStorage('favoritedUsers');

	return (
		<>
			<h2 style={{ padding: '1rem 0' }}>search for an NBA TopShot user</h2>

			<SearchInput />

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
							<a
								key={u}
								className="savedUserLink"
								href={`/?username=${u}`}
							>
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
