import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { infoCircle } from 'react-icons-kit/fa/infoCircle';
import HoverVideoPlayer from 'react-hover-video-player';
// import get from 'lodash.get';

import { Number } from './Number';

export const Img = (props) => {
	const [hide, setHide] = useState(false);

	return hide ? (
		<p style={{ padding: '1rem 0' }}>error loading image 😢</p>
	) : (
		<div
			style={{
				width: '100%',
				padding: '1rem',
				overflow: 'hidden',
				marginBottom: '.5rem',
				borderRadius: '5px',
			}}
		>
			<img
				{...props}
				style={{ width: '100%', transform: 'scale(1.4)' }}
				onError={() => setHide(true)}
			/>
		</div>
	);
};

const MomentCard = ({ moment }) => {
	const {
		playerName = '',
		playCategory = '',
		setName = '',
		description = '',
		estimatedValue = 0,
		momentUrl = '',
		marketplaceUrl = '',
		priceRange = '',
		serialNumber = '',
		circulationCount = 0,
		image,
		video,
		flowRetired = false,
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
						{setName}
					</Card.Subtitle>
					<Card.Subtitle className="mb-2 text-muted">
						{playCategory}
						{description && (
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
						)}
					</Card.Subtitle>
				</div>
				{/* <Img src={image} /> */}
				<div style={{ display: 'flex' }}>
					<HoverVideoPlayer
						videoSrc={video}
						style={{ borderRadius: '5px', marginBottom: '.5rem' }}
						pausedOverlay={
							<div
								style={{
									width: '100%',
									padding: '1rem',
									overflow: 'hidden',
								}}
							>
								<img
									src={image}
									style={{
										width: '100%',
										transform: 'scale(1.4)',
									}}
								/>
							</div>
						}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Card.Text className="noMargin">
						min ask:{' '}
						<b>
							<Number value={priceRange.minAsk} prefix={'$'} />
						</b>
					</Card.Text>
					{/* <Card.Text className="noMargin">
						max ask:{' '}
						<b>
							<Number value={priceRange.maxAsk} prefix={'$'} />
						</b>
					</Card.Text> */}
					<Card.Text className="noMargin">
						comparable asks<b>*</b>:{' '}
						<b>
							<Number value={estimatedValue} prefix={'$'} />
						</b>
					</Card.Text>
					<Card.Text className="noWrap noMargin">
						<b>
							<Number value={serialNumber} />
						</b>
						{' of '}
						<Number
							value={circulationCount}
							suffix={flowRetired ? '' : '+'}
						/>
					</Card.Text>
					<Card.Link
						href={momentUrl}
						target="_blank"
						className="noWrap noMargin"
					>
						moment page
					</Card.Link>
					{priceRange.minAsk === 0 && priceRange.maxAsk === 0 ? (
						<br />
					) : (
						<Card.Link
							href={marketplaceUrl}
							target="_blank"
							className="noWrap noMargin"
						>
							marketplace page
						</Card.Link>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default MomentCard;
