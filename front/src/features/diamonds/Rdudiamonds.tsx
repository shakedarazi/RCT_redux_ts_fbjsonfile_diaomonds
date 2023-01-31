import React, { useEffect, useState } from 'react'
import { } from 'react-redux'
import { getDiamondsAsync, selectdiamonds, selectUpdate, delDiamondAsync, updDiamondAsync } from './diamondsSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Diamond from '../../models/Diamond';

const Rdudiamonds = () => {


  // את החיפוש ואת הדיאמונדס עצמם עם מתודת גט 
  const [search, setsearch] = useState("")
  const diamonds = useAppSelector(selectdiamonds);
  const dispatch = useAppDispatch();
  const updateFlag = useAppSelector(selectUpdate);
  const [newprice, setnewprice] = useState(0)



  useEffect(() => {
    dispatch(getDiamondsAsync())
  }, [updateFlag])



  const upd_diamond = (
    oldID: number,
    oldcarat: number,
    oldclarity: string,
    oldcolor: string,
    oldcut: string,
    olddepth: number,
    oldtable: number,
    oldx: number,
    oldy: number,
    oldz: number) => {

    const temp_diamond: Diamond = {
      ID: oldID,
      clarity: oldclarity,
      color: oldcolor,
      carat: oldcarat,
      cut: oldcut,
      depth: olddepth,
      table: oldtable,
      x: oldx,
      y: oldy,
      z: oldz,
      price: newprice
    }
    dispatch(updDiamondAsync(temp_diamond))

  }

  return (
    <div>

      <hr></hr> <h3>Diamonds <br></br> Show all, Show by specific color, Delete, change price</h3>

      Search for spec diamonds by color: <input onChange={(e) => setsearch(e.target.value)} />
      <br></br>
      Update the price: <input onChange={(e) => setnewprice(+ e.target.value)}></input>
      <br></br>
      <br></br>


      {diamonds.filter(d => d.color.includes(search)).map((d, i) => <div key={i}>
        <button onClick={() => dispatch(delDiamondAsync(d.ID || -1))}>Delete</button>
        <button onClick={() => upd_diamond(
          d.ID || -1,
          d.carat,
          d.clarity,
          d.color,
          d.cut,
          d.depth,
          d.table,
          d.x,
          d.y,
          d.z)}>Update</button>

        id : {d.ID}
        carat: {d.carat},
        clarity:  {d.clarity},
        color : {d.color},
        cut :{d.cut},
        depth :{d.depth},
        price :{d.price},
        table :{d.table},
        x :{d.x},
        y :{d.y},
        z :{d.z}
        <hr></hr>
        

      </div>)}
    </div>
  )
}

export default Rdudiamonds