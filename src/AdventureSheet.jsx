import React from 'react'
import { useGameContext } from './GameContext'
import { calculateStat, getRankTitle } from './helpers'
import SheetItem from './SheetItem'
import SheetStat from './SheetStat'
import StatLabel from './StatLabel'

export default function AdventureSheet() {

    const { character } = useGameContext()

    return (
        <div className='sheet'>
            <div><StatLabel>Name:</StatLabel>{character.name}</div>
            <div><StatLabel>Profession:</StatLabel>{character.profession}</div>
            {/* <div><StatLabel>Rank:</StatLabel>{character.rank.value} ({character.rank.title})</div> */}
            <div><StatLabel>Rank:</StatLabel>{character.rank} ({getRankTitle(character.rank)})</div>
            <div><StatLabel>Bio:</StatLabel>{character.bio}...</div>
            <div><StatLabel>Stamina:</StatLabel>{character.stamina.current}/{character.stamina.max}</div>
            <SheetStat statName={'defense'} />
            <SheetStat statName={'charisma'} />
            <SheetStat statName={'combat'} />
            <SheetStat statName={'magic'} />
            <SheetStat statName={'sanctity'} />
            <SheetStat statName={'scouting'} />
            <SheetStat statName={'thievery'} />
            <div><StatLabel>Money:</StatLabel>{character.money} Shards</div>
            <div><StatLabel>Possessions:</StatLabel>({character.inventory.items.length}/{character.inventory.max})
                {/* <ul> {character.inventory.items.map((item, i) => <li key={i}>{item.name}{item.brief && <> ({item.brief})</>}{item.equipped && <> - equipped -</>}</li>)} </ul> */}
                <ul> {character.inventory.items.map((item, i) => <li key={i}><SheetItem item={item} /></li>)} </ul>
            </div>
            <div><StatLabel>Special Actions:</StatLabel>
                <ul> {character.actions.map((action, i) => <li key={i}>{action}</li>)} </ul>
            </div>
            <div><StatLabel>Titles and Honors:</StatLabel>
                <ul> {character.titles.map((title, i) => <li key={i}>{title}</li>)} </ul>
            </div>
            <div><StatLabel>God:</StatLabel>{character.god}</div>
            <div><StatLabel>Blessings:</StatLabel>
                <ul> {character.blessings.map((blessing, i) => <li key={i}>{blessing}</li>)} </ul>
            </div>
            <div><StatLabel>Curses:</StatLabel>
                <ul> {character.curses.map((curse, i) => <li key={i}>{curse}</li>)} </ul>
            </div>
            <div><StatLabel>Resurrection Arrangements:</StatLabel>
                <ul> {character.revives.map((revive, i) => <li key={i}>{revive}</li>)} </ul>
            </div>
            <div><StatLabel>Codewords:</StatLabel>
                <ul> {character.codewords.map((codeword, i) => <li key={i}>{codeword}</li>)} </ul>
            </div>
            <div><StatLabel>Variables:</StatLabel>{JSON.stringify(character.variables)}</div>
        </div>
    )
}
