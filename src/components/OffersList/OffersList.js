import React from 'react';
import { connect } from 'react-redux';
import OfferCard from '../OfferCard';
import { fetchListOfOffers } from '../../api';
import { Link } from 'react-router-dom';
import { loadOffers } from '../../store/action';
import debounce from 'lodash.debounce';
import Loader from '../../common/Loader';
import Error from '../../common/Error';
import { Wrapper } from './styled';

class OffersList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();
    this.state = {
      perPage: 3,
      noMoreOffers: false,
      error: false,
      isLoading: false,
    };
  }

  removeScrollEvent = () =>
    this.scrollRef.current.removeEventListener('scroll', this.onScroll());

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const offerRef = this[`${params.get('id')}_ref`];

    if (offerRef) {
      offerRef.current.scrollIntoView();
    }

    if (this.props.offers.length === 0) {
      this.getData();
    }

    this.scrollRef.current.addEventListener(
      'scroll',
      debounce(() => this.onScroll(), 200),
    );
  }

  componentWillUnmount() {
    this.removeScrollEvent();
  }

  onScroll = () => {
    if (
      this.scrollRef.current.scrollTop + this.scrollRef.current.clientHeight >=
      this.scrollRef.current.scrollHeight
    ) {
      this.getData();
    }
  };

  getData = () => {
    const { perPage } = this.state;
    const { loadOffers } = this.props;

    this.setState({ isLoading: true }, () => {
      fetchListOfOffers(perPage)
        .then(results => {
          if (results.length === 0) {
            this.removeScrollEvent();
            this.setState({ noMoreOffers: true, isLoading: false });
          } else {
            loadOffers(results);

            this.setState({
              perPage: perPage + 3,
              noMoreOffers: false,
              isLoading: false,
            });
          }
        })
        .catch(() => {
          this.setState({
            error: true,
            isLoading: false,
          });
        });
    });
  };

  render() {
    const { error, noMoreOffers, isLoading } = this.state;
    const { offers } = this.props;

    if (error) {
      return <Error />;
    }

    return (
      <Wrapper ref={this.scrollRef}>
        {offers &&
          offers.map(offer => {
            this[`${offer.id}_ref`] = React.createRef();
            return (
              <Link
                ref={this[`${offer.id}_ref`]}
                key={offer.id}
                to={{ pathname: `/offer/${offer.id}` }}
              >
                <OfferCard {...offer} />
              </Link>
            );
          })}
        {noMoreOffers && <p>No more offers</p>}
        {isLoading && <Loader color="black" size={20} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = offers => offers;

const mapDispatchToProps = dispatch => ({
  loadOffers: payload => dispatch(loadOffers(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
