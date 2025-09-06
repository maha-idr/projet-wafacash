// Repositories/IDemandeRepository.cs


using System.Globalization;
using WorkflowApp.Models;

internal class CsvWriter : IDisposable
{
    private StreamWriter streamWriter;
    private CultureInfo invariantCulture;

    public CsvWriter(StreamWriter streamWriter, CultureInfo invariantCulture)
    {
        this.streamWriter = streamWriter;
        this.invariantCulture = invariantCulture;
    }

    public void Dispose()
    {
        throw new NotImplementedException();
    }

    internal void NextRecord()
    {
        throw new NotImplementedException();
    }

    internal void WriteHeader<T>()
    {
        throw new NotImplementedException();
    }

    internal void WriteRecords(IEnumerable<DemandeConsultationDto> demandes)
    {
        throw new NotImplementedException();
    }

    internal void WriteRecords(IEnumerable<Demande> demandes)
    {
        throw new NotImplementedException();
    }
}