import { FightContext } from "../App"
import { useContext } from "react"
const Card = (props: {icon:string, level:number, reward:string, penalty:string, button:boolean}) => {


  return (
    <div className="Card">
      <div>
        <p>{props.icon}</p>
        <h3>Level {props.level}</h3>
      </div>

      <h3>Reward: {props.reward}</h3>
      <h3>Penalty: {props.penalty}</h3>
      <button hidden={!props.button} >Fight</button>
    </div>
  )
}

export default Card