import { Modal } from "./Modal";

const DisplayModal = ({ modal }) => {
  return (
    <Modal
      className="flex items-start justify-center"
      modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      <p>Open Display Modal</p>
    </Modal>
  );
};

export default DisplayModal;
