import React, { useState, useEffect } from 'react';
import './style.css'

const FormInput = ({type, refetch, setVisible, formEdited}) => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (type === "detail") {
      setName(formEdited.name)
      setDescription(formEdited.description)
      setQuantity(formEdited.quantity)
      setPrice(formEdited.price)
    }
  }, [formEdited, type])

  console.log("formedited: ", formEdited)

  return (
      <div className='detail_page'>
          <p> Hurry Up!! Only {quantity} remaining {name}. Get <b>10% discount</b> on purchases today. </p>
      </div>
  )

}

export default FormInput