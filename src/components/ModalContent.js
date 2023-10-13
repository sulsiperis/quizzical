export default function ModalContent({ onClose, msg }) {
    return (
        <>
            <div className="modal-background"></div>
            <div className="modal">        
                <div>{ msg }</div>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    );
  }