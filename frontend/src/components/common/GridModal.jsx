import { X } from "lucide-react";
import React from "react";
import { useModal } from "../../context/ModalContext";

function GridModal({ children, modalName }) {
  const { activeModal, closeModal } = useModal();

  if (activeModal !== modalName) {
    return null;
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 backdrop-blur-md"></div>
        {/* Main content */}
        <div className="grid w-full grid-cols-3 gap-5 p-5 overflow-y-auto">
          <div className="relative z-10 flex flex-col p-5 overflow-y-auto bg-white rounded-lg shadow-2xl h-[40vh]">
            <div className="flex items-center justify-end">
              <X
                className="p-2 bg-gray-200 rounded-full"
                size={40}
                onClick={closeModal}
              />
            </div>

            {/* childrens comes after this */}
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridModal;
