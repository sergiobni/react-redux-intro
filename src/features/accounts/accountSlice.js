const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      else
        return {
          ...state,
          loan: action.payload.amount,
          loanPurpose: action.payload.purpose,
          balance: state.balance + action.payload.amount,
        };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount, currrency) {
  if (currrency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    //API call
    const host = 'api.frankfurter.app';
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currrency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return action
    dispatch({ type: 'account/deposit', payload: converted });
  };
}
export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount: amount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}
