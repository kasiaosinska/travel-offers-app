import React from 'react';
import { connect } from 'react-redux'
import OfferCard from '../OfferCard';
import { fetchListOfOffers } from '../../api';
import { Link } from 'react-router-dom';
import { addOffers } from "../../store/action";

class OffersList extends React.Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.state = {
      perPage: 3,
      hasMore: false,
      error: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.myRef.current.addEventListener("scroll", () => {
      if (this.myRef.current.scrollTop + this.myRef.current.clientHeight >= this.myRef.current.scrollHeight - 20){
        this.getData()
      }
    });
  }

  getData = () => {
    const { perPage } = this.state;
    const { addOffers } = this.props;
    fetchListOfOffers(perPage)
      .then((results) => {
        addOffers(results);
        this.setState({
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
    const { error, hasMore } = this.state;
    const { offers } = this.props;

    if (error) {
      return <p>Something went wrong :(</p>
    }

    return (
      <div ref={this.myRef} style={{ height: "200px", overflow: "auto", backgroundColor: 'lightGray' }}>
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


const mapStateToProps = offers => offers;

const mapDispatchToProps = dispatch => ({
  addOffers: payload => dispatch(addOffers(payload)),
});

export default connect(mapStateToProps ,mapDispatchToProps)(OffersList);

