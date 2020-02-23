import React from 'react';
import OfferCard from '../OfferCard';
import {fetchListOfOffers} from '../../api';

class OffersList extends React.Component {
  state = {
    offers: [],
    page: 1,
    perPage: 20,
    hasMore: false,
    error: false,
  };

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { page, perPage, offers } = this.state;

    fetchListOfOffers(perPage)
      .then((results) => {
        this.setState({
          offers: [...offers, ...results],
          page: page + 1,
          hasMore: results.length === perPage
        })
      })
      .catch(() => {
        this.setState({
          error: true
        })
      })
  };


  render () {
    const { offers, error, hasMore } = this.state;

    if (error) {
      return <p>Something went wrong :(</p>
    }

    return (
      <div>
        {offers && offers.map(offer => <OfferCard {...offer} key={offer.id}/>)}
        {hasMore && <p>No more offers</p>}
      </div>
    )
  }
}

export default OffersList;

