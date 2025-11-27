"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export const Modal = ({ children }: { children: ReactNode }) => <ModalProvider>{children}</ModalProvider>;

export const ModalTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn("px-4 py-2 rounded-md text-black dark:text-white relative overflow-hidden", className)}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { open, setOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Overlay />
          <motion.div
            ref={modalRef}
            className={cn(
              "max-h-[90vh] w-full md:max-w-4xl bg-black/90 rounded-lg relative z-50 flex flex-col overflow-hidden",
              className
            )}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col flex-1 p-4 md:p-6 overflow-y-auto", className)}>{children}</div>;
};

export const ModalFooter = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn("flex justify-end p-4 bg-black/80", className)}>{children}</div>;
};

const Overlay = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.5 }}
    exit={{ opacity: 0 }}
    className={`fixed inset-0 bg-black z-40 ${className}`}
  />
);

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute z-50 text-2xl font-bold text-white transition top-4 right-4 hover:text-red-400"
    >
      ×
    </button>
  );
};

// Hook untuk klik di luar modal
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      callback();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

// Export default object
export default { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter, useModal };
