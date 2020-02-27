import React from 'react';
import { connect } from 'react-redux'
import OfferCard from '../OfferCard';
import { fetchListOfOffers } from '../../api';
import { Link } from 'react-router-dom';
import { addOffers } from '../../store/action';
import debounce from 'lodash.debounce';
import Loader from '../../common/Loader';

class OffersList extends React.Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.state = {
      perPage: 3,
      showHasMore: false,
      error: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.search);

    if (this[`${params.get('id')}_ref`]) {
      this[`${params.get('id')}_ref`].current.scrollIntoView()
    }

    if (this.props.offers.length === 0) {
      this.getData()
    }

    this.myRef.current.addEventListener('scroll', debounce(() => this.onScroll(), 200))
  }

  componentWillUnmount() {
    this.myRef.current.removeEventListener('scroll', this.onScroll())
  }

  onScroll = () => {
    if (this.myRef.current.scrollTop + this.myRef.current.clientHeight >= this.myRef.current.scrollHeight) {
      this.getData()
    }
  };

  getData = () => {
    const { perPage } = this.state;
    const { addOffers } = this.props;
    this.setState({ isLoading: true });
    fetchListOfOffers(perPage)
      .then((results) => {
        if (results.length === 0) {
          this.myRef.current.removeEventListener('scroll', this.onScroll());
          this.setState({ showHasMore: true, isLoading: false })
        } else {
          addOffers(results);
          this.setState({
            perPage: perPage + 3,
            showHasMore: false,
            isLoading: false
          })
        }
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false
        })
      })
  };

  render () {
    const { error, showHasMore, isLoading } = this.state;
    const { offers } = this.props;

    if (error) {
      return <p>Something went wrong :(</p>
    }

    return (
      <div ref={this.myRef} style={{ height: '200px', overflow: 'auto', backgroundColor: 'lightGray', padding: 10 }}>
        {offers && offers.map(offer => {
          this[`${offer.id}_ref`] = React.createRef();
          return (
            <Link
              ref={this[`${offer.id}_ref`]}
              key={offer.id}
              to={{ pathname: `/offer/${offer.id}`}}
            >
              <OfferCard{...offer}/>
            </Link>
          )}
        )}
        {showHasMore && <p>No more offers</p>}
        {isLoading && <Loader color="black"  size={20} />}
      </div>
    )
  }
}

const mapStateToProps = offers => offers;

const mapDispatchToProps = dispatch => ({
  addOffers: payload => dispatch(addOffers(payload)),
});

export default connect(mapStateToProps ,mapDispatchToProps)(OffersList);

