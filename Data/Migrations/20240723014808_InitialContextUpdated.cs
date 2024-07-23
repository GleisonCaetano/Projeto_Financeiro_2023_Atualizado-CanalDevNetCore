using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConceitusERP.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialContextUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Despesa_Categoria_CategoriaId",
                table: "Despesa");

            migrationBuilder.DropIndex(
                name: "IX_Despesa_CategoriaId",
                table: "Despesa");

            migrationBuilder.RenameColumn(
                name: "Exluido",
                table: "SistemaFinanceiro",
                newName: "Excluido");

            migrationBuilder.RenameColumn(
                name: "Exluido",
                table: "Despesa",
                newName: "Excluido");

            migrationBuilder.RenameColumn(
                name: "Exluido",
                table: "Categoria",
                newName: "Excluido");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Excluido",
                table: "SistemaFinanceiro",
                newName: "Exluido");

            migrationBuilder.RenameColumn(
                name: "Excluido",
                table: "Despesa",
                newName: "Exluido");

            migrationBuilder.RenameColumn(
                name: "Excluido",
                table: "Categoria",
                newName: "Exluido");

            migrationBuilder.CreateIndex(
                name: "IX_Despesa_CategoriaId",
                table: "Despesa",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Despesa_Categoria_CategoriaId",
                table: "Despesa",
                column: "CategoriaId",
                principalTable: "Categoria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
