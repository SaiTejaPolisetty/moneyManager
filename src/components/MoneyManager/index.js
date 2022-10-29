import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'INCOME',
    transactionList: [],
    balance: 0,
    income: 0,
    expense: 0,
  }

  setTitle = event => {
    this.setState({title: event.target.value})
  }

  setAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  setType = event => {
    this.setState({type: event.target.value})
  }

  addTrasaction = event => {
    event.preventDefault()
    const {title, amount, type, balance, income, expense} = this.state
    if (title !== '' && amount !== '' && type !== '') {
      const newTransaction = {
        title,
        amount,
        type,
        id: uuidv4(),
      }
      console.log(uuidv4())
      let newBalance = amount
      let newIncome = income
      let newExpense = expense
      if (type === 'INCOME') {
        newBalance = balance + parseInt(amount)
        newIncome = income + parseInt(amount)
      } else {
        newBalance = balance - parseInt(amount)
        newExpense = expense + parseInt(amount)
      }
      this.setState(prevState => ({
        title: '',
        amount: '',
        type: 'INCOME',
        transactionList: [...prevState.transactionList, newTransaction],
        balance: newBalance,
        income: newIncome,
        expense: newExpense,
      }))
    }
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    let sumOfIncome = 0
    transactionList.forEach(obj => {
      if (obj.type === 'INCOME' && obj.id !== id) {
        sumOfIncome += obj.amount
        console.log(sumOfIncome, typeof sumOfIncome)
      }
    })

    console.log(sumOfIncome, typeof sumOfIncome)

    let sumOfExpense = 0
    transactionList.forEach(obj => {
      if (obj.type === 'EXPENSES' && obj.id !== id) {
        sumOfExpense += obj.amount
      }
    })

    const newBalance = sumOfIncome - sumOfExpense

    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(obj => obj.id !== id),
      balance: newBalance,
      income: sumOfIncome,
      expense: sumOfExpense,
    }))
  }

  render() {
    const {
      title,
      amount,
      type,
      transactionList,
      balance,
      income,
      expense,
    } = this.state

    const renderTransactionItem = () => {
      const renderedTransaction = transactionList.map(obj => (
        <TransactionItem
          transactionDetails={obj}
          key={obj.id}
          deleteFunc={this.deleteTransaction}
        />
      ))
      return renderedTransaction
    }

    const RenderOptions = props => {
      const {optionDetails} = props
      const {displayText, optionId} = optionDetails
      return <option value={optionId}>{displayText}</option>
    }

    return (
      <div className="bg-container">
        <div className="card">
          <div className="header">
            <h1 className="main-heading">Hi, Richard</h1>
            <p className="main-caption">
              Welcome back to your{' '}
              <span className="highlet-money">Money Manager</span>
            </p>
          </div>
          <div className="money-details-container">
            <MoneyDetails transactionDashBoard={{balance, income, expense}} />
          </div>
          <div className="transaction-details-container">
            <div className="add-transaction-container">
              <form className="transaction-form">
                <h2 className="form-heading">Add Transaction</h2>
                <label className="labels" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  className="input"
                  type="text"
                  placeholder="TITLE"
                  onChange={this.setTitle}
                  value={title}
                  id="title"
                />
                <br />
                <label className="labels" htmlFor="amount">
                  AMOUNT
                </label>
                <br />
                <input
                  className="input"
                  type="number"
                  placeholder="AMOUNT"
                  onChange={this.setAmount}
                  value={amount}
                  id="amount"
                />
                <br />
                <label className="labels" htmlFor="type">
                  TYPE
                </label>
                <br />
                <select
                  className="input"
                  value={type}
                  onChange={this.setType}
                  id="type"
                >
                  {transactionTypeOptions.map(obj => (
                    <RenderOptions optionDetails={obj} key={obj.optionId} />
                  ))}
                </select>
                <br />
                <br />

                <button
                  className="add-btn"
                  type="submit"
                  onClick={this.addTrasaction}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="income-list-container">
              <h2 className="history">History</h2>
              <div className="transaction-list-header">
                <p className="list-heading">Title</p>
                <p className="list-heading">Amount</p>
                <p className="list-heading">Type</p>
                <button className="invisible-btn" type="button">
                  delete
                </button>
              </div>
              <ul className="income-list">{renderTransactionItem()}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
