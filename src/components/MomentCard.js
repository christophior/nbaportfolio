import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

export default MomentCard;
