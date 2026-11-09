import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const initialPatient = {
  name: '',
  clinic: 'Poli Umum',
  doctor: '',
  visitDate: new Date().toLocaleDateString('en-CA'),
  status: 'Menunggu',
};

function PatientForm({ show, onClose, onSave, patientToEdit }) {
  const [patient, setPatient] = useState(() =>
    patientToEdit
      ? {
          name: patientToEdit.name,
          clinic: patientToEdit.clinic,
          doctor: patientToEdit.doctor,
          visitDate: patientToEdit.visitDate,
          status: patientToEdit.status,
        }
      : { ...initialPatient, visitDate: new Date().toLocaleDateString('en-CA') },
  );

  const handleChange = (event) => {
    setPatient((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patient);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{patientToEdit ? 'Edit Data Pasien' : 'Daftarkan Pasien'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="form-helper">
            Isi informasi kunjungan. Jangan masukkan data pasien sungguhan ke demonstrasi ini.
          </p>
          <Form.Group className="mb-3" controlId="patientName">
            <Form.Label>Nama Pasien</Form.Label>
            <Form.Control
              name="name"
              value={patient.name}
              onChange={handleChange}
              placeholder="Contoh: Wisnu Adhitya"
              required
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="patientClinic">
            <Form.Label>Poliklinik Tujuan</Form.Label>
            <Form.Select name="clinic" value={patient.clinic} onChange={handleChange}>
              <option>Poli Umum</option>
              <option>Poli Anak</option>
              <option>Poli Gigi</option>
              <option>Poli Penyakit Dalam</option>
              <option>Poli Kandungan</option>
              <option>Poli Mata</option>
              <option>Lainnya</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="patientDoctor">
            <Form.Label>Dokter Penanggung Jawab</Form.Label>
            <Form.Control
              name="doctor"
              value={patient.doctor}
              onChange={handleChange}
              placeholder="Nama dokter"
              required
              maxLength={100}
            />
          </Form.Group>
          <div className="form-row">
            <Form.Group className="mb-3" controlId="visitDate">
              <Form.Label>Tanggal Kunjungan</Form.Label>
              <Form.Control
                type="date"
                name="visitDate"
                value={patient.visitDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="patientStatus">
              <Form.Label>Status Penanganan</Form.Label>
              <Form.Select name="status" value={patient.status} onChange={handleChange}>
                <option>Menunggu</option>
                <option>Dalam Pemeriksaan</option>
                <option>Selesai</option>
                <option>Dirujuk</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onClose}>Batal</Button>
          <Button className="add-patient-button" type="submit">
            {patientToEdit ? 'Simpan Perubahan' : 'Simpan Pasien'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PatientForm;
