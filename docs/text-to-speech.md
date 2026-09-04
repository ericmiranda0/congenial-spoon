# Text-to-Speech Neural Local (Kokoro.js + WebGPU)

Documentação do sistema de síntese de voz **Text-to-Speech (TTS)** executado **100% no navegador**, sem backend, sem chaves de API e sem custos por requisição.

---

## 1. Visão Geral e Como o Kokoro Funciona

O modelo utilizado é o **Kokoro-82M** (variante quantizada `onnx-community/Kokoro-82M-ONNX`), uma inteligência artificial leve e eficiente de 82 milhões de parâmetros capaz de gerar vozes neurais expressivas de altíssima qualidade.

O processamento é feito inteiramente no lado do cliente (Client-Side Audio Synthesis):
1. O texto visual da página é extraído e dividido em **unidades de leitura** (`TextSegment`).
2. O texto passa pelo **Pré-processador Jurídico**, convertendo abreviações e artigos (`Art. 5º` ➔ `Artigo quinto`, `CF` ➔ `Constituição Federal`).
3. O modelo Kokoro processa os fonemas através do runtime ONNX rodando via **WebGPU** ou **WASM/CPU**.
4. O áudio retornado em PCM Float32 de 24kHz é convertido nativamente para um Blob `WAV`.
5. O áudio é reproduzido pelo `HTMLAudioElement` e armazenado localmente em cache via `IndexedDB`.

---

## 2. Carregamento do Modelo (Lazy Loading)

Para evitar consumo desnecessário de dados e memória, **o modelo NÃO é baixado no carregamento inicial do site**.

O download ocorre apenas no momento em que o usuário clica em **"Reproduzir"** pela primeira vez.

### Etapas exibidas ao usuário:
1. `Preparando leitor de voz...` (Leitura das configurações)
2. `Baixando modelo de voz... (XX%)` (Download progressivo dos pesos ONNX ~80MB)
3. `Inicializando IA...` (Compilação dos pipelines ONNX / WebGPU)
4. `Pronto para leitura.` (Pronto para síntese instantânea)

Uma vez carregado, a instância do modelo é mantida como um **Singleton na memória RAM** (`ttsInstance`), evitando qualquer download futuro durante a sessão.

---

## 3. WebGPU e Fallback para WASM/CPU

O sistema possui detecção automática da API WebGPU do navegador (`navigator.gpu`):

- **Aceleração WebGPU (Prioridade 1):** Se o navegador e a placa gráfica (GPU) oferecerem suporte a WebGPU, o modelo é executado no acelerador de hardware. A interface exibe a etiqueta:  
  `⚡ WebGPU ativado`
- **WASM / CPU (Fallback):** Se o navegador não possuir WebGPU ativado ou falhar na alocação, o sistema automaticamente alterna para WebAssembly (WASM). A interface exibe a etiqueta:  
  `💻 Modo compatibilidade`

---

## 4. Estrutura dos Arquivos

```text
src/
 ├── components/
 │    └── TextToSpeech/
 │         ├── TextToSpeech.tsx     # Interface principal (Leitor de Voz)
 │         ├── TextToSpeech.css     # Estilos e animações com Glassmorphism
 │         └── useTextToSpeech.ts   # React Hook para estado, sincronia e fila
 │
 └── services/
      └── kokoro/
           ├── kokoro.ts            # Pré-processador jurídico e segmentador
           ├── model.ts             # Carregador do modelo KokoroTTS e WebGPU
           └── audio.ts             # WAV conversion, AudioPlayer & IndexedDB cache
```

---

## 5. Seleção de Vozes e Velocidade

### Vozes Disponíveis
O seletor apresenta vozes brasileiras e internacionais compatíveis com o Kokoro:
- 🇧🇷 **Português — Feminina** (`pf_dora`)
- 🇧🇷 **Português — Masculina** (`pm_alex`)
- 🇧🇷 **Português — Masculina 2** (`pm_santa`)
- 🇺🇸 **English — Heart** (`af_heart`)
- 🇺🇸 **English — Bella** (`af_bella`)
- 🇺🇸 **English — Eric** (`am_eric`)

### Velocidades de Reprodução
Valores disponíveis no seletor:
`0.5x`, `0.75x`, `1.0x` (Padrão para estudo jurídico), `1.25x`, `1.5x`, `1.75x`, `2.0x`.

---

## 6. Dicionário de Pronúncia Jurídica

Para evitar leituras robóticas ou errôneas de termos jurídicos, o módulo `src/services/kokoro/kokoro.ts` possui a constante `pronunciationDictionary`:

```typescript
export const pronunciationDictionary: Record<string, string> = {
  "Art.": "Artigo",
  "§": "Parágrafo",
  "pú.": "parágrafo único",
  "inc.": "Inciso",
  "nº": "número",
  "CF": "Constituição Federal",
  "CC": "Código Civil",
  "CP": "Código Penal",
  "CPC": "Código de Processo Civil",
  "CPP": "Código de Processo Penal",
  "STF": "Supremo Tribunal Federal",
  "STJ": "Superior Tribunal de Justiça",
  "CLT": "Consolidação das Leis do Trabalho",
  "OAB": "Ordem dos Advogados do Brasil",
  "ECA": "Estatuto da Criança e do Adolescente",
  "CTN": "Código Tributário Nacional",
  "CDC": "Código de Defesa do Consumidor",
  "LGPD": "Lei Geral de Proteção de Dados"
};
```

> **IMPORTANTE:** O pré-processador gera o texto adaptado exclusivamente para o motor de áudio. O texto exibido na tela do usuário não sofre nenhuma alteração visual.

---

## 7. Cache Local via IndexedDB

Para evitar reprocessamento desnecessário, o áudio gerado para cada segmento é salvo no banco de dados local do navegador (`IndexedDB` -> `KokoroTTSCache`).

- A chave do cache é calculada por `hash(voz + velocidade + texto)`.
- Possui limite configurado (ex: 100 itens) para evitar acúmulo de espaço.
- O usuário pode limpar manualmente o cache clicando no botão **"Limpar cache"** no rodapé do player.

---

## 8. Sincronização Visual e Leitura Contínua

- **Destaque Visual:** Durante a reprodução, o segmento em leitura ganha a classe CSS `.tts-highlight-active`, destacando-se suavemente na tela com borda azul e fundo iluminado.
- **Auto-scroll:** O elemento em leitura é rolando suavemente para o centro da tela se estiver fora do campo de visão.
- **Reprodução Contínua (`☑ Reprodução contínua`):** Quando um artigo ou parágrafo termina, o sistema carrega e reproduz automaticamente o próximo bloco.
- **Prefetch em Background:** Enquanto um trecho é reproduzido, o sistema pré-gera o áudio do próximo trecho na fila para eliminação de pausas entre os blocos.

---

## 9. Compatibilidade de Navegadores

| Navegador | Suporte WebGPU | Fallback WASM | Recomendado |
| :--- | :---: | :---: | :---: |
| **Google Chrome 113+** | ✅ Sim | ✅ Sim | ⭐ Excelente |
| **Microsoft Edge 113+** | ✅ Sim | ✅ Sim | ⭐ Excelente |
| **Opera 99+** | ✅ Sim | ✅ Sim | ✅ Bom |
| **Mozilla Firefox 120+** | ⚠️ Em testes | ✅ Sim | ✅ Bom (Modo WASM) |
| **Safari 18+ (macOS/iOS)** | ⚠️ Em testes | ✅ Sim | ✅ Bom (Modo WASM) |

---

## 10. Documentação e Links Oficiais

- **Kokoro.js (npm):** [https://www.npmjs.com/package/kokoro-js](https://www.npmjs.com/package/kokoro-js)
- **HuggingFace Transformers.js:** [https://huggingface.co/docs/transformers.js/index](https://huggingface.co/docs/transformers.js/index)
- **Modelo ONNX Kokoro-82M:** [https://huggingface.co/onnx-community/Kokoro-82M-ONNX](https://huggingface.co/onnx-community/Kokoro-82M-ONNX)
- **Repositório do Kokoro:** [https://github.com/hexgrad/kokoro](https://github.com/hexgrad/kokoro)
