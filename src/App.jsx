import React, { useMemo, useState } from 'react';
import { Badge, Button, Container, Form, InputGroup, Navbar } from 'react-bootstrap';
import PatientForm from './components/PatientForm';
import PatientTable from './components/PatientTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

function App() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [showForm, setShowForm] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [today] = useState(() => new Date());
  const [nextId, setNextId] = useState(1);
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('id-ID');
    return patients.filter((patient) => {
      const matchesSearch = [
        patient.name,
        patient.medicalRecordNumber,
        patient.clinic,
        patient.doctor,
      ].some((value) => value.toLocaleLowerCase('id-ID').includes(query));
      const matchesStatus =
        statusFilter === 'Semua Status' || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const todayPatients = patients.filter((patient) => patient.visitDate === todayKey);
  const openForm = (patient = null) => {
    setPatientToEdit(patient);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setPatientToEdit(null);
  };

  const savePatient = (patientData) => {
    if (patientToEdit) {
      setPatients((current) =>
        current.map((patient) =>
          patient.id === patientToEdit.id ? { ...patient, ...patientData } : patient,
        ),
      );
      return;
    }

    const newId = nextId;
    setNextId((current) => current + 1);
    setPatients((current) => [
      {
        ...patientData,
        id: newId,
        medicalRecordNumber: `RM-${today.getFullYear()}-${String(newId).padStart(5, '0')}`,
      },
      ...current,
    ]);
  };

  const deletePatient = (id) => {
    setPatients((current) => current.filter((patient) => patient.id !== id));
  };

  return (
    <div className="app-shell">
      <Navbar className="clinic-navbar">
        <Container fluid="xl">
          <Navbar.Brand href="#" className="clinic-brand">
            <span className="clinic-brand-mark" aria-hidden="true">+</span>
            <span>Klinik<span className="brand-highlight">Sehat</span></span>
          </Navbar.Brand>
          <div className="clinic-navbar-right">
            <span className="clinic-open-indicator" />
            <span>Dashboard Klinik</span>
          </div>
        </Container>
      </Navbar>

      <main className="dashboard-main">
        <Container fluid="xl">
          <section className="dashboard-heading">
            <div>
              <p className="eyebrow">LAYANAN / REKAM MEDIS</p>
              <h1>Rekam Medis Pasien</h1>
              <p className="heading-description">
                Kelola kunjungan pasien dan pantau status penanganan.
              </p>
            </div>
            <Button className="add-patient-button" onClick={() => openForm()}>
              <span aria-hidden="true">+</span> Daftarkan Pasien
            </Button>
          </section>

          <section className="overview-grid" aria-label="Ringkasan kunjungan">
            <article className="overview-card">
              <span className="overview-icon icon-blue" aria-hidden="true">P</span>
              <div>
                <p>Total Pasien Terdaftar</p>
                <strong>{patients.length}</strong>
              </div>
              <span className="overview-note">Data pasien</span>
            </article>
            <article className="overview-card">
              <span className="overview-icon icon-teal" aria-hidden="true">H</span>
              <div>
                <p>Kunjungan Hari Ini</p>
                <strong>{todayPatients.length}</strong>
              </div>
              <span className="overview-note">{formatDate(today)}</span>
            </article>
            <article className="overview-card">
              <span className="overview-icon icon-orange" aria-hidden="true">!</span>
              <div>
                <p>Menunggu</p>
                <strong>{todayPatients.filter((patient) => patient.status === 'Menunggu').length}</strong>
              </div>
              <span className="overview-note">Perlu ditangani</span>
            </article>
            <article className="overview-card">
              <span className="overview-icon icon-green" aria-hidden="true">✓</span>
              <div>
                <p>Selesai Hari Ini</p>
                <strong>{todayPatients.filter((patient) => patient.status === 'Selesai').length}</strong>
              </div>
              <span className="overview-note">Sudah ditangani</span>
            </article>
          </section>

          <section className="records-panel">
            <div className="records-heading">
              <div>
                <h2>Daftar Kunjungan</h2>
                <p>Informasi pasien dan status penanganan</p>
              </div>
              <Badge bg="light" text="dark" className="record-total">
                {filteredPatients.length} pasien
              </Badge>
            </div>

            <div className="records-toolbar">
              <InputGroup className="patient-search">
                <InputGroup.Text aria-hidden="true">⌕</InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Cari nama, no. rekam medis, poli, atau dokter..."
                  aria-label="Cari data pasien"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </InputGroup>
              <Form.Select
                className="status-filter"
                aria-label="Filter status penanganan"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option>Semua Status</option>
                <option>Menunggu</option>
                <option>Dalam Pemeriksaan</option>
                <option>Selesai</option>
                <option>Dirujuk</option>
              </Form.Select>
            </div>

            <PatientTable
              patients={filteredPatients}
              onEdit={openForm}
              onDelete={deletePatient}
            />
          </section>

        </Container>
      </main>

      {showForm && (
        <PatientForm
          key={patientToEdit?.id ?? 'new-patient'}
          show={showForm}
          onClose={closeForm}
          onSave={savePatient}
          patientToEdit={patientToEdit}
        />
      )}
    </div>
  );
}

export default App;
