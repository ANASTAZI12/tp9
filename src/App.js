import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">Banque - Comptes</a>
        </div>
      </nav>
      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <CompteForm />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <CompteList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;