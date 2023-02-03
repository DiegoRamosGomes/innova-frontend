import { PeopleListItem } from "../PeopleListItem";
import { FormEvent, useContext, useRef, useState } from "react";

import './styles.css'
import ContactsModal from "../ContactsModal";
import PeopleContext from "../../contexts/PeopleContext";
import { CheckSquare, X } from "phosphor-react";


export const PeopleList = () => {
  const { peoples, storePeople } = useContext(PeopleContext)
  const modalRef = useRef<ContactsModal | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')

  const handleOpenModal = (peopleId: number) => modalRef.current?.show(peopleId)
  const handleToggleIsAdding = () => setIsAdding(prevState => !prevState)


  const handleCancel = () => {
    setName('')

    handleToggleIsAdding()
  }

  const handleStorePeople = async (event: FormEvent) => {
    event.preventDefault()

    await storePeople(name)

    setName('')
    handleToggleIsAdding()
  }

  return (
    <>
      <ContactsModal ref={modalRef}/>

      <div className={'people-list-header'}>
        <p>Nome</p>
        <p>Quantos Contatos</p>
        <p>Ver Contatos</p>
      </div>
      <ul className={'people-list'}>
        {peoples?.map(people => <PeopleListItem
          onClick={() => handleOpenModal(people.id ?? -1)}
          key={people.id}
          people={people}
        />)}
        {
          isAdding ?
            <form onSubmit={handleStorePeople} className={'form'}>
              <input type="text" value={name} onChange={v => setName(v.target.value)}/>
              <div className={'buttons-container'}>
                <button type={'submit'} >
                  <CheckSquare size={20} weight="fill" color={'blue'}/>
                </button>
                <button onClick={handleCancel}>
                  <X size={20} weight="regular"/>
                </button>
              </div>
            </form>
            :
            <button className={'add-button'} onClick={handleToggleIsAdding}>Adicionar</button>
        }
      </ul>
    </>

  )
}