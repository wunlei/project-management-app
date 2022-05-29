import { useState } from 'react';

function useCreateTask() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState('');

  const handleTaskCreateModalToggle = () => {
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };

  const handleSelectColumnId = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };

  return {
    isCreateTaskModalOpen,
    handleTaskCreateModalToggle,
    selectedColumnId,
    handleSelectColumnId,
  };
}

export default useCreateTask;
