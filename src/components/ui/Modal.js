const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] flex items-center justify-center">
      <div className="bg-primary p-4 rounded border ">{children}</div>
    </div>
  );
};

export default Modal;
