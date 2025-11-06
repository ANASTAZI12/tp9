import React from 'react';
import { createCompte } from '../services/api';

export default function CompteForm() {
  const [solde, setSolde] = React.useState('');
  const [dateCreation, setDateCreation] = React.useState('');
  const [type, setType] = React.useState('COURANT');
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    try {
      const payload = {
        solde: Number(solde),
        dateCreation: dateCreation || null,
        type
      };
      await createCompte(payload);
      setMessage('Compte created');
      setSolde('');
      setDateCreation('');
      setType('COURANT');
    } catch (e) {
      setError(e.message || 'Failed to create compte');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h5 className="card-title mb-3">Créer un compte</h5>
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-3">
          <label className="form-label">Solde</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Date de création</label>
          <input
            className="form-control"
            type="date"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-primary w-100" type="submit" disabled={submitting}>
            {submitting ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
      {message ? <div className="alert alert-success mt-3 mb-0" role="alert">{message}</div> : null}
      {error ? <div className="alert alert-danger mt-3 mb-0" role="alert">Erreur: {error}</div> : null}
    </form>
  );
}

