import { useState } from 'react';

function useEditTask() {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const handleTaskEditModalToggle = () => {
    setIsEditTaskModalOpen(!isEditTaskModalOpen);
  };

  return {
    isEditTaskModalOpen,
    handleTaskEditModalToggle,
  };
}

export default useEditTask;
