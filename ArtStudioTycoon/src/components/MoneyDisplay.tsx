/* eslint-disable prettier/prettier */
import React from "react"

interface MoneyDisplayProps {
  money: number
}

const MoneyDisplay: React.FC<MoneyDisplayProps> = ({ money }) => {
  return <div className="money-display">Money: ${money}</div>
}

export default MoneyDisplay
