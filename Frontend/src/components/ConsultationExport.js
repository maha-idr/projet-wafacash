import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { styled } from '@mui/material/styles';

// Composants stylisés avec le thème Wafacash amélioré
const WafaContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  minHeight: '100vh',
  padding: theme.spacing(3),
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
}));

const WafaPaper = styled(Paper)(({ theme }) => ({
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const WafaButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  fontWeight: '600',
  textTransform: 'none',
  padding: '10px 20px',
  fontSize: '14px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  }
}));

const PrimaryButton = styled(WafaButton)(({ theme }) => ({
  backgroundColor: '#0055a5', // Bleu Wafacash
  color: 'white',
  '&:hover': {
    backgroundColor: '#004080',
  },
  '&:disabled': {
    backgroundColor: '#b3cde0',
  }
}));

const SecondaryButton = styled(WafaButton)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  color: '#0055a5',
  border: '2px solid #0055a5',
  '&:hover': {
    backgroundColor: '#e6f0ff',
    border: '2px solid #004080',
    color: '#004080',
  }
}));

const SuccessButton = styled(WafaButton)(({ theme }) => ({
  backgroundColor: '#28a745', // Vert Wafacash
  color: 'white',
  '&:hover': {
    backgroundColor: '#218838',
    boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)',
  }
}));

const WafaTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#0055a5',
  '& .MuiTableCell-head': {
    color: 'Black',
    fontWeight: '700',
    fontSize: '14px',
    padding: '16px',
    borderBottom: '2px solid #003366',
  }
}));

const WafaTableCell = styled(TableCell)(({ theme }) => ({
  color: '#000000', // Noir pour une meilleure lisibilité
  fontWeight: '400',
  fontSize: '14px',
  padding: '14px 16px',
  borderBottom: '1px solid #eaeaea',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
}));

const HighlightedTableCell = styled(WafaTableCell)(({ theme }) => ({
  color: '#0055a5', // Bleu Wafacash pour les champs importants
  fontWeight: '600',
  fontSize: '14px',
}));

const StatusBadge = styled('span')(({ status, theme }) => ({
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '600',
  backgroundColor: status === 0 ? '#fff3cd' : '#d4edda',
  color: status === 0 ? '#856404' : '#155724',
  border: `1px solid ${status === 0 ? '#ffeaa7' : '#c3e6cb'}`,
  display: 'inline-block',
  textAlign: 'center',
  minWidth: '120px',
}));

const BooleanBadge = styled(Box)(({ value, theme }) => ({
  display: 'inline-block',
  padding: '6px 12px',
  borderRadius: '16px',
  fontWeight: '600',
  fontSize: '12px',
  backgroundColor: value ? '#d4edda' : '#f8d7da',
  color: value ? '#155724' : '#721c24',
  border: `1px solid ${value ? '#c3e6cb' : '#f5c6cb'}`,
  textAlign: 'center',
  minWidth: '50px',
}));

const ConsultationExport = () => {
  const [demandes, setDemandes] = useState([]);
  const [filters, setFilters] = useState({
    dateDebut: null,
    dateFin: null,
    statut: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async (filterParams = filters) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/consultation/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filterParams)
      });

      if (response.ok) {
        const data = await response.json();
        setDemandes(data);
      } else {
        console.error('Erreur lors de la récupération des demandes');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchDemandes();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateDebut: null,
      dateFin: null,
      statut: ''
    };
    setFilters(resetFilters);
    fetchDemandes(resetFilters);
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/consultation/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filters)
      });

      if ( response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `demandes_export_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Erreur lors de l\'export');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <WafaContainer maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#0055a5', 
            fontWeight: '700',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          Consultation & Export des Demandes
        </Typography>

        {/* Filtres */}
        <WafaPaper sx={{ p: 3, mb: 3 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              color: '#0055a5', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              fontSize: '1.1rem',
              '&:before': {
                content: '""',
                display: 'block',
                width: '4px',
                height: '24px',
                backgroundColor: '#0055a5',
                marginRight: '12px',
                borderRadius: '2px'
              }
            }}
          >
            Filtres de recherche
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Date de début"
                value={filters.dateDebut}
                onChange={(date) => handleFilterChange('dateDebut', date)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#fafafa',
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Date de fin"
                value={filters.dateFin}
                onChange={(date) => handleFilterChange('dateFin', date)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#fafafa',
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#0055a5', fontWeight: '500' }}>Statut</InputLabel>
                <Select
                  value={filters.statut}
                  label="Statut"
                  onChange={(e) => handleFilterChange('statut', e.target.value)}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    '&:focus': {
                      borderColor: '#0055a5'
                    }
                  }}
                >
                  <MenuItem value="">Tous les statuts</MenuItem>
                  <MenuItem value={0}>En attente d'affectation</MenuItem>
                  <MenuItem value={1}>Affectée</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <PrimaryButton 
                  onClick={handleApplyFilters}
                  disabled={loading}
                  startIcon={<span>🔍</span>}
                >
                  Appliquer les filtres
                </PrimaryButton>
                <SecondaryButton 
                  onClick={handleResetFilters}
                  disabled={loading}
                  startIcon={<span>🔄</span>}
                >
                  Réinitialiser
                </SecondaryButton>
                <SuccessButton 
                  onClick={handleExport}
                  disabled={loading}
                  sx={{ ml: { xs: 0, sm: 'auto' }, mt: { xs: 2, sm: 0 } }}
                  startIcon={<span>📊</span>}
                >
                  Exporter en CSV
                </SuccessButton>
              </Box>
            </Grid>
          </Grid>
        </WafaPaper>

        {/* Tableau des résultats */}
        <WafaPaper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="tableau des demandes" size="medium">
              <WafaTableHead>
                <TableRow>
                  <WafaTableCell>ID</WafaTableCell>
                  <WafaTableCell>Libellé Mandataire</WafaTableCell>
                  <WafaTableCell>Région</WafaTableCell>
                  <WafaTableCell>Type réseau</WafaTableCell>
                  <WafaTableCell>Code agence</WafaTableCell>
                  <WafaTableCell>Nom agence</WafaTableCell>
                  <WafaTableCell>Téléphone contact</WafaTableCell>
                  <WafaTableCell>Ville</WafaTableCell>
                  <WafaTableCell>Adresse livraison</WafaTableCell>
                  <WafaTableCell>Envois Modem</WafaTableCell>
                  <WafaTableCell>Modem</WafaTableCell>
                  <WafaTableCell>Statut</WafaTableCell>
                  <WafaTableCell>Date saisie</WafaTableCell>
                </TableRow>
              </WafaTableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <WafaTableCell colSpan={13} align="center" sx={{ py: 6 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div className="wafa-loader"></div>
                        <Typography variant="body1" sx={{ mt: 2, color: '#0055a5', fontWeight: '500' }}>
                          Chargement des données en cours...
                        </Typography>
                      </Box>
                    </WafaTableCell>
                  </TableRow>
                ) : demandes.length === 0 ? (
                  <TableRow>
                    <WafaTableCell colSpan={13} align="center" sx={{ py: 6 }}>
                      <Typography variant="body1" sx={{ color: '#6c757d', fontStyle: 'italic' }}>
                        Aucune donnée disponible pour les filtres sélectionnés
                      </Typography>
                    </WafaTableCell>
                  </TableRow>
                ) : (
                  demandes.map((demande) => (
                    <TableRow 
                      key={demande.id} 
                      hover
                      sx={{ 
                        '&:nth-of-type(even)': {
                          backgroundColor: '#fafafa'
                        },
                        '&:hover': {
                          backgroundColor: '#f0f7ff'
                        },
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <HighlightedTableCell>
                        {demande.id}
                      </HighlightedTableCell>
                      <WafaTableCell>
                        {demande.libelleMandataire}
                      </WafaTableCell>
                      <WafaTableCell>
                        {demande.region}
                      </WafaTableCell>
                      <WafaTableCell>
                        {demande.typeReseau}
                      </WafaTableCell>
                      <HighlightedTableCell>
                        {demande.code}
                      </HighlightedTableCell>
                      <WafaTableCell>
                        {demande.nomAgence}
                      </WafaTableCell>
                      <WafaTableCell sx={{ fontFamily: 'monospace', fontWeight: '500' }}>
                        {demande.telephoneContact}
                      </WafaTableCell>
                      <WafaTableCell>
                        {demande.ville}
                      </WafaTableCell>
                      <WafaTableCell sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {demande.adresseLivraison}
                      </WafaTableCell>
                      <WafaTableCell>
                        <BooleanBadge value={demande.envoisModem}>
                          {demande.envoisModem ? 'Oui' : 'Non'}
                        </BooleanBadge>
                      </WafaTableCell>
                      <WafaTableCell sx={{ fontFamily: 'monospace', fontWeight: '500' }}>
                        {demande.modem}
                      </WafaTableCell>
                      <WafaTableCell>
                        <StatusBadge status={demande.statut}>
                          {demande.statutLibelle}
                        </StatusBadge>
                      </WafaTableCell>
                      <WafaTableCell sx={{ fontWeight: '500' }}>
                        {new Date(demande.dateSaisie).toLocaleDateString('fr-FR')}
                      </WafaTableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </WafaPaper>

        {/* Style pour le loader */}
        <style jsx>{`
          .wafa-loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #0055a5;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </WafaContainer>
    </LocalizationProvider>
  );
};

export default ConsultationExport;