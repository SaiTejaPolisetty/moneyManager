import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteFunc} = props
  const {title, amount, type, id} = transactionDetails
  const deleteTransaction = () => {
    deleteFunc(id)
  }
  const displayType = type === 'INCOME' ? 'Income' : 'Expenses'
  return (
    <li className="transaction-item">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{displayType}</p>
      <button
        className="delete-btn"
        type="button"
        onClick={deleteTransaction}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-btn"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
