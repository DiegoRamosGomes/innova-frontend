import { useState, forwardRef, useImperativeHandle, ForwardedRef, useEffect } from 'react'
import './styles.css'
import { X } from "phosphor-react";

export interface BaseModalProps {
  children: JSX.Element
  title?: string
}

type BaseModal = {
  show(): void
}

const BaseModal = forwardRef<BaseModal, BaseModalProps>((props: BaseModalProps, ref: ForwardedRef<BaseModal>) => {
  const [visible, setVisible] = useState(false)

  let element: HTMLElement | null

  useEffect(() => {
    if (visible) {
      element = document.getElementById('modal-base')

      element.addEventListener('click', handleCloseEvent)
    }
  }, [visible])

  useEffect(() => {
    return () => {
      element ?
        element.removeEventListener('click', handleCloseEvent) :
        null
    }
  }, [])

  const handleCloseEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.id === 'modal-base') {
      hide()
    }
  }

  const hide = () => setVisible(false)
  const show = () => setVisible(true)

  useImperativeHandle(ref, () => ({ show, hide }))

  if (!visible) {
    return null
  }

  return (
    <div className={'modal-base'} id={'modal-base'}>
      <div className={'modal-container'}>
        <header className={'header'}>
          <p className={'header__title'}>{props.title}</p>
          <button className={'header__close'} onClick={hide}>
            <X size={15}/>
          </button>
        </header>

        {props.children}
      </div>
    </div>
  )
})

export default BaseModal