import React from 'react';
import { listComptes } from '../services/api';

export default function CompteList() {
  const [comptes, setComptes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await listComptes();
        if (!cancelled) {
          setComptes(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Failed to load comptes');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-muted">Chargement des comptes...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Erreur: {error}</div>;
  }

  if (!comptes.length) {
    return <div className="alert alert-info mb-0">Aucun compte pour le moment.</div>;
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="card-title mb-0">Comptes</h5>
        <span className="badge text-bg-secondary">{comptes.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{width: '80px'}}>ID</th>
              <th>Type</th>
              <th className="text-end">Solde</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {comptes.map((c) => (
              <tr key={c.id || Math.random()}>
                <td>#{c.id}</td>
                <td>
                  <span className={`badge ${c.type === 'EPARGNE' ? 'text-bg-success' : 'text-bg-primary'}`}>
                    {c.type}
                  </span>
                </td>
                <td className="text-end">
                  {typeof c.solde === 'number' ? c.solde.toFixed(2) : c.solde}
                </td>
                <td>{c.dateCreation || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

