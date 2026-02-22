# Competição de Faturamento — Nutri de Consultório

Landing page interativa com ranking dinâmico integrado ao Google Sheets.

---

## Estrutura do Projeto

```
competicao-faturamento-nc/
├── index.html              ← Landing page (tudo num arquivo só)
├── google-apps-script.js   ← Script que vai no Google Sheets
├── assets/
│   └── logo.png            ← Sua logo aqui
└── README.md
```

---

## Passo a Passo para Publicar

### 1. Configurar o Google Sheets

1. Crie uma nova planilha no Google Sheets
2. Configure as colunas assim:

| A (Nome) | B (Foto) | C (Faturamento) |
|---|---|---|
| Ana Souza | https://link-da-foto.jpg | 187450 |
| Juliana Lima | https://link-da-foto.jpg | 162300 |

> **A coluna Faturamento aceita só números. Sem "R$", sem pontos.**  
> **A coluna Foto pode ficar vazia** — a LP gera um avatar automático com as iniciais.

### 2. Configurar o Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. Apague tudo e cole o conteúdo do arquivo `google-apps-script.js`
3. Clique em **Implantar > Nova implantação**
4. Tipo: **App da Web**
5. Executar como: **Eu**
6. Quem tem acesso: **Qualquer pessoa**
7. Clique em **Implantar** e autorize quando pedir
8. **Copie a URL gerada** (parece com: `https://script.google.com/macros/s/xxx.../exec`)

### 3. Plugar na Landing Page

Abra o `index.html` e encontre a seção de configuração no JavaScript:

```javascript
const CONFIG = {
  SHEETS_API_URL: '',  // ← COLE A URL DO APPS SCRIPT AQUI
  CTA_LINK: '#',       // ← COLE O LINK DO CTA AQUI
  END_DATE: '2026-08-31T23:59:59',
  START_DATE: '2026-03-02T00:00:00'
};
```

### 4. Adicionar sua Logo

Salve sua logo como `assets/logo.png` na pasta do projeto.

### 5. Deploy no GitHub + Vercel

**GitHub:**
1. Crie uma conta em github.com (se não tiver)
2. Crie um novo repositório (ex: `competicao-faturamento-nc`)
3. Faça upload dos arquivos (index.html + pasta assets)

**Vercel:**
1. Acesse vercel.com e faça login com sua conta GitHub
2. Clique em "New Project"
3. Importe o repositório que acabou de criar
4. Clique em "Deploy" — pronto, tá no ar!
5. (Opcional) Conecte um domínio personalizado

---

## Como Atualizar o Ranking

1. Abra a planilha no Google Sheets
2. Atualize os valores de faturamento (ou adicione novas nutricionistas)
3. **Pronto!** A próxima pessoa que acessar a LP verá os dados atualizados

> O site puxa os dados em tempo real. Não precisa fazer deploy novamente.

---

## Hospedagem de Fotos

Para as fotos das nutricionistas, você tem algumas opções:

**Opção 1 — Google Drive (gratuito):**
1. Faça upload da foto no Google Drive
2. Clique com botão direito > "Compartilhar" > "Qualquer pessoa com o link"
3. Copie o ID do link (a parte entre `/d/` e `/view`)
4. Use este formato na planilha: `https://drive.google.com/uc?export=view&id=SEU_ID_AQUI`

**Opção 2 — Imgur (gratuito):**
1. Acesse imgur.com
2. Faça upload da foto
3. Copie o link direto da imagem

**Opção 3 — Sem foto:**
Deixe a coluna B vazia. A LP gera automaticamente um avatar colorido com as iniciais do nome.

---

## Personalização

### Trocar cores
No CSS, edite as variáveis em `:root`:
```css
--accent-green: #00E676;      /* Cor dos botões CTA */
--neon-blue: #00B4D8;         /* Efeito neon azul */
--neon-purple: #7B2FBE;       /* Efeito neon roxo */
```

### Trocar textos
Todos os textos estão diretamente no HTML. Busque e substitua.

### Trocar prêmios
Na seção `prizes-grid` do HTML, edite os nomes e descrições.
