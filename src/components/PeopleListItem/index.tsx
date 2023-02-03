import { People } from "../../@types";

import './styles.css'
import { FormEvent, useContext, useState } from "react";
import PeopleContext from "../../contexts/PeopleContext";

interface PeopleListItemProps {
  people: People

  onClick(people: People): void
}

export const PeopleListItem = ({ people, onClick }: PeopleListItemProps) => {
  const { deletePeople, editPeople } = useContext(PeopleContext)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(people.name)

  const handleDeletePeople = async () => {
    await deletePeople(people)
  }

  const toggleIsEditing = () => {
    setIsEditing(prevState => !prevState)
  }

  const handleSavePeople = async (event: FormEvent) => {
    event.preventDefault()

    const p = { ...people, name }
    await editPeople(p)
    toggleIsEditing()
  }

  return (
    <li className={'people-list-item'}>
      {
        isEditing ?
          <form className={'form'}>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            <p className={'quantity'}>{people.contacts.length}</p>
            <div className={'show-container'}>
              <button onClick={handleSavePeople} className={'edit-button'}>Confirmar</button>
            </div>
          </form> :
          <>
            <p className={'name'}>{people.name}</p>
            <p className={'quantity'}>{people.contacts.length}</p>
            <div className={'show-container'}>
              <button onClick={() => onClick(people)} className={'show-button'}>Ver</button>
              <button onClick={handleDeletePeople} className={'delete-button'}>Deletar</button>
              <button onClick={toggleIsEditing} className={'edit-button'}>Editar</button>
            </div>
          </>
      }
    </li>
  )
}