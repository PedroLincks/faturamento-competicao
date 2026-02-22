/**
 * =====================================================
 * GOOGLE APPS SCRIPT — Competição de Faturamento NC
 * =====================================================
 *
 * COMO USAR:
 *
 * 1. Abra sua planilha no Google Sheets
 * 2. Vá em: Extensões > Apps Script
 * 3. Apague tudo que estiver lá e cole este código inteiro
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Tipo: "App da Web"
 * 6. Executar como: "Eu" (sua conta)
 * 7. Quem tem acesso: "Qualquer pessoa"
 * 8. Clique em "Implantar"
 * 9. Copie a URL gerada e cole no CONFIG.SHEETS_API_URL da landing page
 *
 * FORMATO DA PLANILHA:
 * ┌──────────┬─────────────────────────────────┬──────────────┐
 * │  Coluna A │         Coluna B                │   Coluna C   │
 * ├──────────┼─────────────────────────────────┼──────────────┤
 * │  Nome    │  Foto (URL da imagem)           │  Faturamento │
 * │  Ana     │  https://exemplo.com/ana.jpg    │  187450      │
 * │  Julia   │  https://exemplo.com/julia.jpg  │  162300      │
 * └──────────┴─────────────────────────────────┴──────────────┘
 *
 * IMPORTANTE:
 * - A linha 1 é o cabeçalho (Nome, Foto, Faturamento) — será ignorada
 * - A coluna de Faturamento deve conter SOMENTE números (sem R$, sem pontos)
 * - A coluna Foto pode ficar vazia (a LP gera um avatar automático)
 * - Para hospedar fotos, use Google Drive com link público ou Imgur
 */

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    // Remove header row
    const rows = data.slice(1);

    // Map to JSON
    const ranking = rows
      .filter(row => row[0] && row[2]) // Only rows with name and revenue
      .map(row => ({
        name: String(row[0]).trim(),
        photo: String(row[1] || '').trim(),
        revenue: parseFloat(String(row[2]).replace(/[^\d.,]/g, '').replace(',', '.')) || 0
      }))
      .filter(item => item.revenue > 0)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5); // Top 5 only

    // Return JSON with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify(ranking))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
