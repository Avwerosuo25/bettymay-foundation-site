import React, { createContext, useContext, useState } from "react";

const DonateModalContext = createContext(null);

export function DonateModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DonateModalContext.Provider
      value={{
        isOpen,
        openDonateModal: () => setIsOpen(true),
        closeDonateModal: () => setIsOpen(false),
      }}
    >
      {children}
    </DonateModalContext.Provider>
  );
}

export function useDonateModal() {
  const ctx = useContext(DonateModalContext);
  if (!ctx) {
    throw new Error("useDonateModal must be used within a DonateModalProvider");
  }
  return ctx;
}
