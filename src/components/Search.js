import React from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import ReactGA from 'react-ga';

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
							margin: '0 auto',
							flexWrap: 'wrap',
						}}
					>
						{favoritedUsers.map((u) => (
							<span
								key={u}
								className="savedUserLink"
								onClick={() => {
									ReactGA.event({
										category: 'interaction',
										action: 'visit favorited user',
										value: u,
									});
									window.location = `/?username=${u}`;
								}}
							>
								{u}
							</span>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Search;
