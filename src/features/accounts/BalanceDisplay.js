import { connect } from 'react-redux';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
//Deprecated way of doing this
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
//Connect is deprecated
export default connect(mapStateToProps)(BalanceDisplay);
