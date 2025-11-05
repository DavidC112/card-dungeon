
import Card from './Card'
import type { Enemy } from '../App'



const Talon = (props: { talon: Enemy[] }) => {


  return (
    <div className="talon">
      {props.talon.map((card) => (
        <Card
          icon={card.enemyIcon}
          level={card.level}
          reward={card.reward}
          penalty={card.penalty}
          button={true}
        />
      ))}
    </div>
  )
}

export default Talon