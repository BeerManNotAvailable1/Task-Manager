/**
 * Получает projectId как строку из задачи
 * Работает как со строками, так и с объектами (после populate)
 */
export const getProjectId = (task: { projectId: string | { _id?: string; id?: string } }): string => {
  if (typeof task.projectId === 'string') return task.projectId;
  if (task.projectId && typeof task.projectId === 'object') {
    return (task.projectId as any)._id || (task.projectId as any).id || String(task.projectId);
  }
  return String(task.projectId);
};

