import React from 'react';
import { Number } from './Number';

const MomentChart = ({ moment }) => {
	console.log(moment);
	const { chartUUID } = moment;

	if (!chartUUID) return null;

	return (
		<div style={{ paddingBottom: '2rem' }}>
			<h3>{moment.playerName}</h3>
			<p className="text-muted">
				{moment.playCategory} - {moment.setName}
			</p>
			<p className="text-muted">
				current lowest ask:{' '}
				<Number value={moment.priceRange.minAsk} prefix="$" />
			</p>
			<div
				style={{
					width: '100%',
					height: '650px',
					border: '2px solid #333',
					overflow: 'hidden',
				}}
			>
				<iframe
					id="chart"
					style={{
						position: 'relative',
						width: '100%',
						height: '2800px',
						top: '-1365px',
						border: 'none',
					}}
					scrolling="no"
					src={`https://evaluate.market/editions?editionGuid=${chartUUID}`}
				/>
			</div>
		</div>
	);
};

const MomentCharts = ({ moments }) => {
	return (
		<>
			{moments
				.sort((a, b) => b.priceRange.minAsk - a.priceRange.minAsk)
				.map((m) => (
					<MomentChart moment={m} key={m.momentUrl} />
				))}
		</>
	);
};

export default MomentCharts;
