import React from 'react';
import { Button, Table } from 'react-bootstrap';

const statusClassNames = {
  Menunggu: 'status-waiting',
  'Dalam Pemeriksaan': 'status-examining',
  Selesai: 'status-completed',
  Dirujuk: 'status-referred',
};

const displayDate = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};

function PatientTable({ patients, onEdit, onDelete }) {
  if (patients.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon" aria-hidden="true">?</span>
        <h3>Data pasien tidak ditemukan</h3>
        <p>Coba ubah kata kunci atau filter status yang dipilih.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="patient-table align-middle mb-0">
        <thead>
          <tr>
            <th>No. Rekam Medis</th>
            <th>Nama Pasien</th>
            <th>Poliklinik</th>
            <th>Dokter</th>
            <th>Tanggal Kunjungan</th>
            <th>Status Penanganan</th>
            <th className="text-end">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td><span className="medical-record-number">{patient.medicalRecordNumber}</span></td>
              <td><span className="patient-name">{patient.name}</span></td>
              <td>{patient.clinic}</td>
              <td>{patient.doctor}</td>
              <td>{displayDate(patient.visitDate)}</td>
              <td>
                <span className={`status-pill ${statusClassNames[patient.status] || ''}`}>
                  <span className="status-dot" />
                  {patient.status}
                </span>
              </td>
              <td>
                <div className="patient-actions">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(patient)}
                    aria-label={`Edit data ${patient.name}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(patient.id)}
                    aria-label={`Hapus data ${patient.name}`}
                  >
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PatientTable;
