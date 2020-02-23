import React from 'react';
import PropTypes from 'prop-types';

const OfferCard = ({ title, description, image, price, discount, rating }) => {
  return (
    <div style={{ margin: 20 }}>
      {image && <img src={image} alt="offer" />}
      <ul>
        {title && <li>{title}</li>}
        {description && <li>{description}</li>}
        {price && <li>Price: {price}</li>}
        {discount && <li>Discount: {discount}</li>}
        {rating && <li>Rating: {rating}</li>}
      </ul>
    </div>
  )
};

OfferCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  rating: PropTypes.number,
};

export default OfferCard;
