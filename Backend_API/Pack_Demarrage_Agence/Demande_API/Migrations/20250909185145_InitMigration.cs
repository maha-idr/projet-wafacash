using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Demande_API.Migrations
{
    /// <inheritdoc />
    public partial class InitMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Demande",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Region = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeReseau = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibelleMandataire = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NomAgence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TelephoneContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdresseLivraison = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EnvoisModem = table.Column<bool>(type: "bit", nullable: false),
                    Modem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statut = table.Column<int>(type: "int", nullable: false),
                    DateSaisie = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Lot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sqc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IMEI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CodeBarre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumeroLigne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Societe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAffectation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OperateurTelecom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NouvelleBox = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateReaffectation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NouveauIMEI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NouveauNumeroLigne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnvoiFactu = table.Column<bool>(type: "bit", nullable: true),
                    DateDemandeFactu = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demande", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Demande");
        }
    }
}
