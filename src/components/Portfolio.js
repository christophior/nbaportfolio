import React from 'react';
import { Card } from 'react-bootstrap';

const Portfolio = ({ username, data }) => {
	if (!data || data.error) {
		return <h1>{`${username} not found`} </h1>;
	}

	return (
		<div>
			<h1>{username}'s portfolio</h1>
			<div
				style={{
					// textAlign: 'left',
					background: '#1a8a1a',
					display: 'inline-block',
					padding: '.5rem 2.5rem',
					borderRadius: '5px',
				}}
			>
				<p style={{ color: 'white' }}>estimate portfolio value</p>
				<p style={{ color: 'white', fontSize: '2rem' }}>
					${data.portfolio.minValue}
				</p>
			</div>

			<div style={{ padding: '1rem' }}>
				<h2>{username}'s moments</h2>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{data.usersMoments.map(
						({
							playerName,
							playCategory,
							description,
							momentUrl,
							marketplaceUrl,
							priceRange,
						}) => (
							<Card
								style={{
									width: '18rem',
									margin: '5px',
									flexBasis: '100%',
								}}
							>
								<Card.Body>
									<Card.Title>{playerName}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										{playCategory}
									</Card.Subtitle>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Card.Text className="noWrap noMargin">
											min ask: <b>${priceRange.minAsk}</b> -
											max ask: <b>${priceRange.maxAsk}</b>
										</Card.Text>
										<Card.Link
											href={momentUrl}
											target="_blank"
											className="noWrap noMargin"
										>
											moment page
										</Card.Link>
										<Card.Link
											href={marketplaceUrl}
											target="_blank"
											className="noWrap noMargin"
										>
											marketplace page
										</Card.Link>
									</div>
								</Card.Body>
							</Card>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
