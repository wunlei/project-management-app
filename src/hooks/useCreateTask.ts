import { useState } from 'react';

function useCreateTask() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleTaskCreateModalToggle = () => {
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };

  return {
    isCreateTaskModalOpen,
    handleTaskCreateModalToggle,
  };
}

export default useCreateTask;
