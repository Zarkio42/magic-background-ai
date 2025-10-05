# Background Mágico / Magic Background (n8n + Gemini)

> **PT-BR:** Gere fundos animados/estáticos profissionais a partir de uma descrição em texto. O front-end envia o prompt para um **webhook do n8n**, que aciona a **IA Gemini** e retorna **HTML/CSS** prontos para uso. O resultado é aplicado automaticamente na página com _preview_ instantâneo e controle do background padrão do `body`.
>
> **EN:** Generate professional animated/static backgrounds from plain‑text prompts. The front end posts your prompt to an **n8n webhook**, which calls **Gemini AI** and returns ready‑to‑use **HTML/CSS**. The result is applied instantly to the page with a built‑in preview and toggling of the default `body` background.

---

## 📦 Contents / Conteúdo

- [How it works (flow) / Como funciona (fluxo)](#-how-it-works-flow--como-funciona-fluxo)
- [Key features / Principais recursos](#-key-features--principais-recursos)
- [Requirements / Requisitos](#-requirements--requisitos)
- [Setup / Configuração](#-setup--configuração)

---

## 📌 How it works (flow) / Como funciona (fluxo)

1. **User / Usuário**: type a description in a `<textarea>` / digita uma descrição no `<textarea>`.
2. **Front end**: `POST` to n8n webhook with `{ description }`.
3. **n8n**: calls **Gemini**, builds `{ code, style, preview }`.
4. **Front end**:
   - displays `preview` or falls back to `code` / exibe `preview` ou usa `code`;
   - injects CSS into `<style id="dynamic-style">` / injeta o CSS em `<style id="dynamic-style">`;
   - disables default `body` background while AI background is active / desativa o `background` padrão do `body` enquanto o fundo de IA estiver ativo.

---

## 🧩 Key features / Principais recursos

- Prompt‑based generation (free text) / Geração por prompt (texto livre)
- Instant application of returned HTML/CSS / Aplicação instantânea do HTML/CSS retornados
- Live preview without page reload / Preview sem recarregar a página
- Toggle default `body` background / Alterna o background padrão do `body`
- Loading & error handling / Tratamento de loading e erros

---

## ⚙️ Requirements / Requisitos

- Static page (any web server) / Página estática (qualquer servidor)
- Public **n8n webhook** / Webhook do **n8n** público
- n8n workflow responding JSON like / Fluxo no n8n respondendo JSON como:
{
  "code": "<div class='...'></div>",
  "preview": "<div class='...'></div>",
  "style": "/* CSS here */"
}

> **Tip / Dica (n8n):** In the **HTTP Response** node set `Response Content Type = application/json` and return **only** the JSON object (no Markdown/code fences).  
> No node **HTTP Response**, defina `Response Content Type = application/json` e retorne **somente** o objeto JSON (sem Markdown/cercas de código).

---

## 🔧 Setup / Configuração

Set your webhook URL / Configure a URL do webhook:

```js
const WEBHOOK_URL = 'https://<your-subdomain>.n8n.cloud/webhook/<path>';
```

Minimal structure / Estrutura mínima:
```
/public
  index.html
  /css
    styles.css
  /js
    app.js
  /images
```
