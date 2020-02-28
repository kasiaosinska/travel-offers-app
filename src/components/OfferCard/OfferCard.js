import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styled';

const OfferCard = ({ title, description, image, price, discount, rating }) => {
  return (
    <Wrapper>
      {image && <img src={image} alt="offer" />}
      <ul>
        {title && <li>{title}</li>}
        {description && <li>{description}</li>}
        {price && <li>Price: {price}</li>}
        {discount && <li>Discount: {discount}</li>}
        {rating && <li>Rating: {rating}</li>}
      </ul>
    </Wrapper>
  );
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
