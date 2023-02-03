import { createContext, useEffect, useState } from "react"
import { Contact, People } from "../@types"
import api from "../services/api"

type PeopleContextProps = {
  peoples: People[]
  storePeople(name: string): Promise<void>
  editPeople(people: People): Promise<void>
  deletePeople(people: People): Promise<void>
  createContact(contact: Contact): Promise<void>
  saveContact(contact: Contact): Promise<void>
  deleteContact(contact: Contact): Promise<void>
}

const PeopleContext = createContext<PeopleContextProps>({} as PeopleContextProps)

export const PeopleProvider = ({ children }) => {
  const [peoples, setPeoples] = useState<People[]>([])

  useEffect(() => {
    api.get('/peoples').then(res => {
      const { data: response } = res
      setPeoples(response.data)
    })
  }, [])

  const createContact = async (contact: Contact) => {
    const { data: response } = await api.post('/contacts', contact)

    const newContact: Contact = response.data

    const peopleIndex = peoples.findIndex((people) => people.id === newContact.people_id)
    if (peopleIndex > -1) {
      peoples[peopleIndex].contacts.push(newContact)
    }

    setPeoples([...peoples])
  }

  const saveContact = async (contact: Contact) => {
    let newContact: Contact
    try {
      if (contact.id > -1) {
        const { data: response } = await api.put('/contacts/' + contact.id, {
          type: contact.type,
          value: contact.value
        })

        newContact = response.data
      } else {
        const { data: response } = await api.post('/contacts/', {
          type: contact.type,
          value: contact.value,
          people_id: contact.people_id
        })

        newContact = response.data
      }
    } catch (e) {
      console.log(e)
    }

    const peopleIndex = peoples.findIndex((people) => people.id === contact.people_id)
    if (peopleIndex > -1) {
      const contactIndex = peoples[peopleIndex].contacts.findIndex((contact) => contact.id === newContact.id)
      if (contactIndex > -1) {
        peoples[peopleIndex].contacts[contactIndex] = newContact
      }
    }
    setPeoples([...peoples])
  }

  const deleteContact = async (contact: Contact) => {
    await api.delete('/contacts/' + contact.id)

    const peopleIndex = peoples.findIndex((people) => people.id === contact.people_id)
    if (peopleIndex > -1) {
      peoples[peopleIndex].contacts = peoples[peopleIndex].contacts.filter((c) => c.id !== contact.id)
    }
    setPeoples([...peoples])
  }

  const storePeople = async (name: string) => {
    const { data: response } = await api.post('/peoples', { name })

    setPeoples([...peoples, response.data])
  }

  const deletePeople = async (people: People) => {
    await api.delete('/peoples/' + people.id)

    const data = peoples.filter((p) => p.id !== people.id)
    setPeoples([...data])
  }

  const editPeople = async (people: People) => {
    const { data: response } = await api.put('/peoples/' + people.id, {
      name: people.name
    })

    const data = peoples.map((p) => {
      if (p.id === people.id) {
        return response.data
      }

      return p
    })

    setPeoples([...data])
  }

  return (
    <PeopleContext.Provider value={{
      peoples,
      createContact,
      saveContact,
      deleteContact,
      deletePeople,
      storePeople,
      editPeople,
    }}>
      {children}
    </PeopleContext.Provider>
  )
}

export default PeopleContext