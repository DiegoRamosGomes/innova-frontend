import { Contact } from "../../@types";

import './styles.css'
import { ContactsListItem } from "../ContactsListItem";
import { FormEvent, useContext, useState } from "react";
import { CheckSquare, X } from "phosphor-react";
import PeopleContext from "../../contexts/PeopleContext";

type ContactsListProps = {
  contacts: Contact[]
  peopleId: number
}

export const ContactsList = ({ contacts, peopleId }: ContactsListProps) => {
  const humanityType: {[key: string]: string} = {
    'phone': 'Telefone',
    'whatsapp': 'Whatsapp',
    'email': 'E-Mail'
  }

  const { createContact } = useContext(PeopleContext)

  const [isAdding, setIsAdding] = useState(false)
  const [value, setValue] = useState('')
  const [type, setType] = useState<'phone' | 'email' | 'whatsapp'>('phone')

  const handleToggleIsAdding = () => setIsAdding(prevState => !prevState)

  const handleStoreContact = async (event: FormEvent) => {
    event.preventDefault()

    const newContact: Contact = {
      people_id: peopleId,
      type,
      value,
    }

    await createContact(newContact)

    setValue('')
    setType('phone')
    handleToggleIsAdding()
  }

  const handleChangeType = (e) => {
    const type: 'phone' | 'email' | 'whatsapp' = e.target.value

    setType(type)
  }

  const handleCancel = () => {
    setValue('')
    setType('phone')

    handleToggleIsAdding()
  }

  return (
    <>
      <ul className={'contacts-list'}>
        {contacts.map((contact) => {
          return <ContactsListItem key={contact.id} contact={contact} />
        })}
        {
          isAdding ?
            <form onSubmit={handleStoreContact} className={'form'}>
              <select name="type" onChange={handleChangeType}>
                <option value="phone">{humanityType['phone']}</option>
                <option value="whatsapp">{humanityType['whatsapp']}</option>
                <option value="email">{humanityType['email']}</option>
              </select>
              <input type="text" value={value} onChange={v => setValue(v.target.value)}/>
              <div className={'buttons-container'}>
                <button type={'submit'}>
                  <CheckSquare size={20} weight="fill" color={'blue'}/>
                </button>
                <button onClick={handleCancel}>
                  <X size={20} weight="regular"/>
                </button>
              </div>
            </form>
            :
            <button onClick={handleToggleIsAdding}>Adicionar</button>
        }
      </ul>
    </>
  )
}