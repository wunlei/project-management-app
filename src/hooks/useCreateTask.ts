import { useState } from 'react';

function useCreateTask() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState('');
  const handleToggleCreateTaskModal = () => {
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };
  const handleSelectColumnId = (columnId: string) => {
    setSelectedColumnId(columnId);
  };
  return {
    isCreateTaskModalOpen,
    handleToggleCreateTaskModal,
    selectedColumnId,
    handleSelectColumnId,
  };
}

export default useCreateTask;
