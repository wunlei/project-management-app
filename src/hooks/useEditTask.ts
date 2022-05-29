import { useState } from 'react';

function useEditTask() {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const handleToggleEditTaskModal = () => {
    setIsEditTaskModalOpen(!isEditTaskModalOpen);
  };

  return {
    isEditTaskModalOpen,
    handleToggleEditTaskModal,
  };
}

export default useEditTask;
