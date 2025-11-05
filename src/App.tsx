import { useEffect, useState } from "react";
import Card from "./components/Card";
import Talon from "./components/Talon";
import { createContext } from "react";

  export type Enemy = {
    enemyName: string;
    enemyIcon: string;
    level: number;
    reward: string;
    penalty: string
  }

  type FightContextType = {
    currentEnemy: Enemy | null;
    talon: Enemy[] | null;
    rolledNumber: number;
  }


    export const FightContext = createContext<FightContextType | null>(null)

const App = () => {




  const [enemy, setEnemy] = useState<Enemy[]>([])
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null)
  const [health, setHealth] = useState<number>(3)
  const [attackDamage, setAttackDamage] = useState<number>(0)
  const [talon, setTalon] = useState<Enemy[]>([])
  const [rolledNumber, setRolledNumber] = useState<number>(0)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)


const fight = () => {
    const number = Math.floor(Math.random() * 6 + 1);
    console.log("Rolled number:", number);
    setRolledNumber(number);
    setButtonDisabled(true);
}



  useEffect(() => {
    fetch("/cards.json")
    .then(res => res.json())
    .then(data => setEnemy(data))
    .catch(err => console.error("Error fetching data:", err))
  }, [])


const getRandomEnemy = () => {

    if (enemy.length > 1 && !currentEnemy) {
      let randomIndex = 0
      do {
        randomIndex = Math.floor(Math.random() * enemy.length);
      } while (enemy[randomIndex].level === 11);
      setCurrentEnemy(enemy[randomIndex])
    }

    if (enemy.length === 1 && !currentEnemy) {
      setCurrentEnemy(enemy[enemy.length - 1] )
    }
  }



 const handleFight = (level: number) => {
    if (currentEnemy){
      if(currentEnemy.level <= level + attackDamage) {
        console.log("You won!")
        if (currentEnemy.reward === "❤" && health < 5) {
          setHealth(prev => prev + 1)
        }
        else if (currentEnemy.reward === "⚔" && attackDamage < 5) {
          setAttackDamage(prev => prev + 1)
        }
        setEnemy(prev => prev.filter(e => e !== currentEnemy))
        setCurrentEnemy(null)
      }
      else {
        let penalty:string[] = currentEnemy.penalty.split("")
        penalty.forEach((p) => {
          if ( p === "❤") {
            if (health - 1 <= 0) {
              alert("Game Over")
            }
            setHealth(prev => prev - 1)
          }
          else if (p === "⚔") {
            setAttackDamage(prev => (prev > 0 ? prev - 1 : 0))
          }
        })
      }
    }
    else {
      console.log("No current enemy to fight.")
    }
      setButtonDisabled(false);
      setRolledNumber(0);
  }

const flee = () => {
  if (currentEnemy) {
    setTalon(prev => [...prev, currentEnemy])
    setCurrentEnemy(null)
  }
}

  return (
      <div className="page">
          <FightContext.Provider value={{ talon, currentEnemy, rolledNumber }}>
          
          <div className="left">
            <Talon talon={talon ? talon : []} />
          </div>
            <div className="mid">
              <div>
                    {currentEnemy? <Card 
                      icon={currentEnemy ? currentEnemy.enemyIcon : ""}
                      level={currentEnemy ? currentEnemy.level : 0} 
                      reward={currentEnemy ? currentEnemy.reward : ""} 
                      penalty={currentEnemy ? currentEnemy.penalty : ""} 
                      button={false}
                      /> : <p></p>}
                  
              </div>
            <div>
              <button id="cube" onClick={fight} disabled={buttonDisabled}>🎲</button> <br />
              <p id="rolled"> Rolled number: {rolledNumber}</p>
              <button onClick={() => handleFight(rolledNumber)}>Fight</button><br />
              <button onClick={flee}>Flee</button>
            </div>
          </div>
            </FightContext.Provider>
          <div className="right">


        <h3>Health: { "❤".repeat(health) }</h3>
        <h3>Attack Damage: { "⚔".repeat(attackDamage) }</h3>
        <img src="img.png" alt="" onClick={getRandomEnemy} />
          </div>
      </div>

    )
}

export default App