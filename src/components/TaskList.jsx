import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // Menentukan warna badge berdasarkan tingkat prioritas
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  // Menentukan warna badge berdasarkan status tugas
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'info';
      case 'To Do': return 'secondary';
      default: return 'light';
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-muted text-center my-4">Belum ada tugas. Silakan klik tombol "+ Add Task" di atas.</p>
      ) : (
        tasks.map((task) => (
          <Card className="mb-3 shadow-sm border-0 rounded-4" key={task.id}>
            <Card.Body className="d-flex justify-content-between align-items-center py-3 px-4">
              {/* Bagian Kiri: Informasi Tugas */}
              <div className="d-flex align-items-center gap-4">
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Task</span>
                  <strong className="fs-6 text-dark">{task.name}</strong>
                </div>
              </div>

              {/* Bagian Tengah-Kanan: Prioritas, Status & Tombol Aksi */}
              <div className="d-flex align-items-center gap-4">
                <div className="text-center">
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Priority</span>
                  <Badge bg={getPriorityVariant(task.priority)} className="px-2 py-1">
                    {task.priority}
                  </Badge>
                </div>

                <div className="text-center">
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Status</span>
                  <Badge bg={getStatusVariant(task.status)} className="px-2 py-1 text-dark">
                    {task.status}
                  </Badge>
                </div>

                <div className="d-flex gap-2 ms-3">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{ width: '35px', height: '35px' }}
                    onClick={() => showEditForm(task)}
                    title="Edit Task"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{ width: '35px', height: '35px' }}
                    onClick={() => deleteTask(task.id)}
                    title="Delete Task"
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskList;