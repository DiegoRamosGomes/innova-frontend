import { Contact } from "../../@types";

import './styles.css'
import { CheckSquare, NotePencil, Trash, X } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import PeopleContext from "../../contexts/PeopleContext";

type ContactsListItemProps = {
  contact: Contact
}

export const ContactsListItem = ({ contact }: ContactsListItemProps) => {
  const { saveContact, deleteContact } = useContext(PeopleContext)

  const [editingMode, setEditingMode] = useState(false)
  const [value, setValue] = useState(contact.value)
  const [type, setType] = useState(contact.type)

  const humanityType: {[key: string]: string} = {
    'phone': 'Telefone',
    'whatsapp': 'Whatsapp',
    'email': 'E-Mail'
  }

  const toggleEditingMode = () => setEditingMode(prevState => !prevState)

  const handleSaveContact = async (event: FormEvent) => {
    event.preventDefault()

    const newContact: Contact = {
      value,
      type,
      id: contact.id,
      people_id: contact.people_id
    }

    await saveContact(newContact)

    toggleEditingMode()
  }

  const handleChangeType = (e) => {
    const type: 'phone' | 'email' | 'whatsapp' = e.target.value

    setType(type)
  }

  const handleDeleteContact = async () => {
    await deleteContact(contact)
  }

  const handleCancel = () => {
    setValue(contact.value)
    setType(contact.type)

    toggleEditingMode()
  }

  return (
    <div className={'contacts-list-item'}>
      {
        editingMode ?
          <form onSubmit={handleSaveContact} className={'form'}>
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
          <>
            <p>{humanityType[type]}</p>
            <p>{value}</p>
            <div className={'buttons-container'}>
              <button onClick={toggleEditingMode}>
                <NotePencil size={20} weight="regular" color={'blue'}/>
              </button>
              <button onClick={handleDeleteContact}>
                <Trash size={20} weight="regular"/>
              </button>
            </div>
          </>
      }
    </div>
  )
}