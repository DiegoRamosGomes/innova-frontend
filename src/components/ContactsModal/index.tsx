import BaseModal from "../BaseModal";
import { People } from "../../@types";
import { ForwardedRef, forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { ContactsList } from "../ContactsList";
import PeopleContext from "../../contexts/PeopleContext";

type ContactsModal = {
  show(peopleId: number)
}

const ContactsModal = forwardRef<ContactsModal>((_, ref: ForwardedRef<ContactsModal>) => {
  const { peoples } = useContext(PeopleContext)
  const modalRef = useRef<BaseModal | null>(null)
  const [people, setPeople] = useState<People | null>(null)

  const show = (peopleId: number) => {
    setPeople(peoples.find((p) => p.id === peopleId))
    modalRef.current?.show()
  }

  useImperativeHandle(ref, () => ({ show }))

  return (
    <BaseModal ref={modalRef} title={`Contatos de ${people?.name}`}>
      {
        people ?
          <ContactsList contacts={people.contacts} peopleId={people.id ?? -1}/> :
          <></>
      }
    </BaseModal>
  )
})

export default ContactsModal