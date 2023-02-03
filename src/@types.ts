export type People = {
  id?: number
  name: string
  contacts: Contact[]
}

export type Contact = {
  id?: number
  type: 'whatsapp' | 'phone' | 'email'
  value: string
  people_id: number
}