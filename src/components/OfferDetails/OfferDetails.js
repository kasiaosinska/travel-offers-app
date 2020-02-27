import React from 'react';
import { fetchSingleOffer } from '../../api';
import OfferCard from '../OfferCard';
import Loader from '../../common/Loader';

class OfferDetails extends React.Component{
  state = {
    offer: {},
    error: false,
    isLoading: false,
  };

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { match } = this.props;

    this.setState({ isLoading: true });
    fetchSingleOffer(match.params.id)
      .then((results) => {
        this.setState({offer: results, isLoading: false})
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false
        })
      })
  };

  render() {
    const { offer, error, isLoading } = this.state;
    const { match } = this.props;

    if (error) {
      return <p>Something went wrong :(</p>
    }

    return(
      <>
        {/*I used match.params.id to have proper id, with working BE it need to be change to order.id*/}
        <button onClick={() => this.props.history.push(`/?id=${match.params.id}`)}>Back</button>
        {isLoading ? <Loader color="black"  size={20} /> : <OfferCard {...offer} />}
      </>
    )
  }
}

export default OfferDetails;
