import React from 'react';
import OfferCard from '../OfferCard';
import debounce from "lodash.debounce";
import { fetchListOfOffers } from '../../api';
import { Link } from 'react-router-dom';

class OffersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      perPage: 3,
      hasMore: false,
      error: false,
    };

    window.onscroll = debounce(() => {
      const {
        getData,
        state: {
          error,
          hasMore,
        },
      } = this;

      if (error || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        getData();
      }
    }, 100);
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { perPage, offers } = this.state;

    fetchListOfOffers(perPage)
      .then((results) => {
        this.setState({
          offers: [...offers, ...results],
          perPage: perPage + 3,
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
        {offers && offers.map(offer =>
          <Link key={offer.id} to={{ pathname: `/offer/${offer.id}`}}>
            <OfferCard {...offer} />
          </Link>
        )}
        {hasMore && <p>No more offers</p>}
      </div>
    )
  }
}

export default OffersList;

