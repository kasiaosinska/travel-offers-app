import React from 'react';
import { fetchSingleOffer } from '../../api';
import OfferCard from "../OfferCard";

class OfferDetails extends React.Component{
  state = {
    offer: {},
    error: false,
  };

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { match } = this.props;

    fetchSingleOffer(match.params.id)
      .then((results) => {
        this.setState({offer: results})
      })
      .catch(() => {
        this.setState({
          error: true
        })
      })
  };

  render() {
    const { offer, error } = this.state;

    if (error) {
      return <p>Something went wrong :(</p>
    }

    return(
      <OfferCard {...offer} />
    )
  }
}

export default OfferDetails;
