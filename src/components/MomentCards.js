import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MomentCard from './MomentCard';

const sortOptions = {
	'min ask price (descending)': (a, b) =>
		b.priceRange.minAsk - a.priceRange.minAsk,
	'min ask price (ascending)': (a, b) => a.priceRange.minAsk - b.priceRange.minAsk,

	'comparable asks price (descending)': (a, b) =>
		b.estimatedValue - a.estimatedValue,
	'comparable asks price (ascending)': (a, b) =>
		a.estimatedValue - b.estimatedValue,
	'serial number (ascending)': (a, b) => a.serialNumber - b.serialNumber,
	'serial number (descending)': (a, b) => b.serialNumber - a.serialNumber,
};

const MomentCards = ({ moments }) => {
	const [selectedSort, setSelectedSort] = useState(Object.keys(sortOptions)[0]);
	const sortedMoments = [...moments].sort(sortOptions[selectedSort]);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '-.5rem',
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
