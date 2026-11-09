import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });
useEffect(() => {
if (taskToEdit) {
setTask(taskToEdit);
} else {
setTask({ name: '', priority: 'Medium', status: 'To Do' });
}
}, [taskToEdit, show]);
const handleChange = (e) => {
setTask({ ...task, [e.target.name]: e.target.value });
};
const handleSubmit = (e) => {
e.preventDefault();
if (!task.name.trim()) return;
taskToEdit ? editTask(task) : addTask(task);
setTask({ name: '', priority: 'Medium', status: 'To Do' });
handleClose();
};
return (
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="taskName">
<Form.Label>Task</Form.Label>
<Form.Control
type="text"
name="name"
placeholder="Masukkan nama kegiatan..."
value={task.name}
onChange={handleChange}
required
/>
</Form.Group>
<Form.Group className="mb-3" controlId="taskPriority">
<Form.Label>Priority</Form.Label>
<Form.Select name="priority" value={task.priority} onChange={handleChange}>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</Form.Select>
</Form.Group>
<Form.Group className="mb-3" controlId="taskStatus">
<Form.Label>Status</Form.Label>
<Form.Select name="status" value={task.status} onChange={handleChange}>
<option value="To Do">To Do</option>
<option value="In Progress">In Progress</option>
<option value="Done">Done</option>
</Form.Select>
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
<Button variant="primary" onClick={handleSubmit}>
{taskToEdit ? 'Update Task' : 'Add Task'}
</Button>
</Modal.Footer>
</Modal>
);
};
export default TaskForm;