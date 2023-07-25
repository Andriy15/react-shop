import React, { createContext, useState } from 'react';

interface IModal {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const ModalContext = createContext<IModal>({
  modal: false,
  setModal: () => {},
});

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false)

  const setModalState = (newState: boolean) => {
    setModal(newState)
  }

    return (
        <ModalContext.Provider value={{ modal, setModal: setModalState }}>
            {children}
        </ModalContext.Provider>
    )
}
