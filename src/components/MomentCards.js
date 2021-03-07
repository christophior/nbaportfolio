import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { infoCircle } from 'react-icons-kit/fa/infoCircle';
import NumberFormat from 'react-number-format';

const Img = (props) => {
	const [hide, setHide] = useState(false);
	const { style = {} } = props;

	return hide ? (
		<p style={{ padding: '1rem 0' }}>error loading image 😢</p>
	) : (
		<img {...props} styles={style} onError={() => setHide(true)} />
	);
};

const sortOptions = {
	'min asking price (descending)': (a, b) =>
		b.priceRange.minAsk - a.priceRange.minAsk,
	'min asking price (ascending)': (a, b) =>
		a.priceRange.minAsk - b.priceRange.minAsk,

	'max asking price (descending)': (a, b) =>
		b.priceRange.maxAsk - a.priceRange.maxAsk,
	'max asking price (ascending)': (a, b) =>
		a.priceRange.maxAsk - b.priceRange.maxAsk,
	'serial number (ascending)': (a, b) => a.serialNumber - b.serialNumber,
	'serial number (descending)': (a, b) => b.serialNumber - a.serialNumber,
};

const MomentCard = ({ moment }) => {
	const {
		playerName,
		playCategory,
		description,
		momentUrl,
		marketplaceUrl,
		priceRange,
		serialNumber,
		circulationCount,
		videos,
		images,
	} = moment;

	return (
		<Card
			key={momentUrl}
			style={{
				maxWidth: '300px',
				margin: '5px',
				flexBasis: '100%',
			}}
		>
			<Card.Body>
				<div>
					<Card.Title>{playerName}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						{playCategory}
						<OverlayTrigger
							placement="auto"
							overlay={<Tooltip>{description}</Tooltip>}
						>
							<Icon
								icon={infoCircle}
								style={{
									paddingLeft: '5px',
									color: '#969696',
									cursor: 'pointer',
								}}
							/>
						</OverlayTrigger>
					</Card.Subtitle>
				</div>
				<Img
					src={images[0].url}
					style={{
						width: '100%',
						padding: '1rem',
					}}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Card.Text className="noMargin">
						min ask:{' '}
						<b>
							<NumberFormat
								value={priceRange.minAsk}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'$'}
							/>
						</b>{' '}
						-{' '}
						<span className="break">
							max ask:{' '}
							<b>
								<NumberFormat
									value={priceRange.maxAsk}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
							</b>
						</span>
					</Card.Text>
					<Card.Text className="noWrap noMargin">
						<NumberFormat
							value={serialNumber}
							displayType={'text'}
							thousandSeparator={true}
						/>
						{' of '}
						<NumberFormat
							value={circulationCount}
							displayType={'text'}
							thousandSeparator={true}
						/>
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
	);
};

const MomentCards = ({ moments }) => {
	const [selectedSort, setSelectedSort] = useState(Object.keys(sortOptions)[0]);
	const sortedMoments = [...moments].sort(sortOptions[selectedSort]);
	console.log(sortedMoments);
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '-1rem',
				}}
			>
				<Form style={{ width: '300px' }}>
					<Form.Group controlId="sortBySelector">
						<Form.Label style={{ color: '#ffffff' }}>sort by</Form.Label>
						<Form.Control
							as="select"
							size="sm"
							custom
							onChange={(e) => setSelectedSort(e.target.value)}
						>
							{Object.keys(sortOptions).map((o) => (
								<option key={o}>{o}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Form>
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				{sortedMoments.map((moment) => (
					<MomentCard key={moment.momentUrl} moment={moment} />
				))}
			</div>
		</div>
	);
};

export default MomentCards;
