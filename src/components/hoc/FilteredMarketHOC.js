import { connect } from 'react-redux';
import MarketHOC from './MarketHOC';
import { fetchToken } from '../../redux/actions/TokenAction';
import { getAllOffers, getAllRequirements, gotoMarket } from '../../redux/actions/MarketAction';
import Cookies from 'js-cookie';

const mapStateToProps = (state) => ({
  offers: state.market.offers,
  categories: ['All', ...state.categories],
  requirements: ['All', ...state.market.requirements],
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: ($address) => {
  	//TO REMOVE
    let address = Cookies.get('market_address', $address) || $address;
    dispatch(getAllOffers(address));
    dispatch(getAllRequirements(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketHOC);
