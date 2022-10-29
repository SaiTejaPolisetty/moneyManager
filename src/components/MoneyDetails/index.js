import './index.css'

const MoneyDetails = props => {
  const {transactionDashBoard} = props
  const {balance, income, expense} = transactionDashBoard

  return (
    <div className="dash-board">
      <div className="db-item balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="balance"
          className="db-item-img"
        />
        <div className="db-item-text">
          <p className="db-item-title">Your Balance </p>
          <p className="db-item-amount" testid="balanceAmount">
            Rs{balance}
          </p>
        </div>
      </div>
      <div className="db-item income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="db-item-img"
        />
        <div className="db-item-text">
          <p className="db-item-title">Your Income </p>
          <p className="db-item-amount" testid="incomeAmount">
            Rs{income}
          </p>
        </div>
      </div>
      <div className="db-item expense">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="expenses"
          className="db-item-img"
        />
        <div className="db-item-text">
          <p className="db-item-title">Your Expenses </p>
          <p className="db-item-amount" testid="expensesAmount">
            Rs{expense}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
