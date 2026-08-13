# PROMPT MESTRE PARA GERAÇÃO DE TEMPLATES EDUCACIONAIS JURÍDICOS EM HTML5 (GPT)

> **Como usar:** Copie e cole todo o bloco de código abaixo no ChatGPT / Claude / Antigravity, substituindo `{{Direito do Trabalho}}` (ou a variável desejada, ex: `{{civil}}`, `{{penal}}`, `{{constitucional}}`, `{{cpc}}`) pela disciplina jurídica específica e anexando/colando os textos brutos da pasta `CONTEUDO` (ex: `direito do trabalho contexto historico.md`).

---

```text
Você é um especialista de classe mundial em Design Instrucional, Direito do Trabalho, História do Direito, Direitos Humanos e Desenvolvedor Front-End Sênior. Sua tarefa é criar um material didático digital de altíssimo nível em formato de página web única (Standalone HTML5 file com suporte total a visualização local ou em servidor web) a partir do conteúdo bruto fornecido na pasta "CONTEUDO" (desconsiderando qualquer pasta "Não usar"), aceitando a variável de disciplina {{Direito do Trabalho}}.

O resultado NÃO DEVE SER UMA MERA CONVERSÃO DE TEXTO OU RESUMO SUPERFICIAL. Reestruture exaustivamente todo o conteúdo fornecido sem omitir nenhuma parte do conteúdo base, criando um material didático completo, dinâmico, moderno e pronto para uso imediato em concursos de alto nível (Magistratura do Trabalho, MPT, OAB, Auditores Fiscais do Trabalho, Delegado e Analistas).

---

### 1. REGRAS DE ESTILO, FORMATO E ARQUITETURA DE CÓDIGO

1. **Arquivo Único HTML5 Standalone**:
   - Todo o CSS deve estar incorporado na tag `<style>` dentro do `<head>`.
   - Deve conter também a importação do arquivo base do portal: `<link rel="stylesheet" href="../../base-style.css">` para integração nativa no portal web, mas mantendo todas as variáveis e estilos próprios no `<style>` interno para funcionar 100% autônomo.
2. **Google Fonts OBRIGATÓRIAS**:
   - Títulos / Headings: `'Outfit', sans-serif`
   - Corpo do texto: `'Lora', serif` (para leitura jurídica elegante) ou `'Inter', sans-serif`
   - Código / Mnemônicos / Rótulos / Linhas do tempo: `'JetBrains Mono', monospace`
3. **Identidade Visual por Disciplina (Color System via CSS Variables)**:
   - Para Direito do Trabalho ({{Direito do Trabalho}}): Tons de Âmbar Dourado, Cobre e Verde Esmeralda / Dark Slate (`:root { --p-700: #78350F; --p-600: #B45309; --p-500: #F59E0B; --p-50: #FFFBEB; --accent-gold: #D4AF37; --accent-teal: #0D9488; }`)
   - Para Direito Civil: Tons de Azul Cobalto (`:root { --p-700: #1E3A8A; --p-600: #1E40AF; --p-500: #3B82F6; --p-50: #EFF6FF; }`)
   - Para Direito Penal: Crimson / Vermelho Escuro (`:root { --p-700: #7F1D1D; --p-600: #991B1B; --p-500: #EF4444; --p-50: #FEF2F2; }`)
   - Para Direito Constitucional: Verde Esmeralda (`:root { --p-700: #064E3B; --p-600: #047857; --p-500: #10B981; --p-50: #ECFDF5; }`)
   - Suporte nativo e automático a Tema Claro e Escuro (`[data-theme="dark"]`).
4. **Remoção de Vícios e Referências Específicas**:
   - Remova qualquer citação ou referência a nomes de professores específicos, cursinhos ou portais privados comerciais. Mantenha um tom técnico, elegante, institucional e voltado a exames oficiais (OAB, Magistratura, MPT, AFT).
5. **Cobertura Exaustiva e Sem Omissões**:
   - NENHUM conceito do texto fonte pode ser omitido, resumido superficialmente ou cortado. Reestruture o texto em explicações profundas, com exemplos visuais e didáticos.

---

### 2. ESTRUTURA OBRIGATÓRIA DA PÁGINA (14 SEÇÕES INTEGRALMENTE DESENVOLVIDAS)

Sua página HTML gerada DEVE conter as seguintes 14 seções estruturadas e preenchidas em profundidade:

1. **HERO SECTION (Cabeçalho Premium)**:
   - Badge da disciplina (ex: `Material Didático · {{Direito do Trabalho}}`).
   - Título principal do tema e Subtítulo explicativo de alto impacto.
   - Meta tags: Ícones ⚖️ com fundamentação normativa (ex: Art. 1º, IV e Art. 6º da CF/88, Art. 23 da DUDH, CLT, Súmulas TST), Âmbito Teórico e Nível (Foco em Concursos de Alto Nível e OAB).
2. **OBJETIVOS DE APRENDIZAGEM**:
   - Quadro destacado listando 4 a 6 competências chave que o estudante dominará ao concluir a leitura.
3. **ORGANIZAÇÃO MODULAR (Com Explicação em 3 Níveis por Instituto)**:
   - Divida o conteúdo em Módulos numerados logicamente.
   - Para CADA instituto ou conceito jurídico abordado, forneça:
     - **Explicação Nível 1 (Leigo / Linguagem Direta)**: Analogias cotidianas e intuição direta.
     - **Explicação Nível 2 (Graduação / Técnica)**: Dogmática jurídica formal, conceito técnico e enquadramento legal.
     - **Explicação Nível 3 (Concursos / Alto Nível)**: Pegadinhas de bancas examinadoras (CEBRASPE, FGV, FCC), divergências jurisprudenciais (STF/TST) e exceções.
   - Inclua sempre: Fundamento Legal, Exemplos Práticos, Doutrina Pertinente e Dicas de Prova.
4. **LEI SECA INTERATIVA**:
   - Artigos de lei e tratados internacionais apresentados dentro de elementos `<details class="artigo">`.
   - O `<summary>` exibe apenas a referência do artigo (ex: `⚖️ Art. 23 da DUDH - Declaração Universal dos Direitos Humanos`).
   - Ao expandir, exibe a transcrição ipsis litteris com palavras-chave destacadas em `<span class="kw">...</span>`, comentários explicativos e resumo simplificado.
5. **QUADROS COMPARATIVOS MODERNOS**:
   - Tabelas estilizadas em HTML comparando institutos paralelos (ex: Escravidão vs Servidão vs Corporações de Ofício, Artesanato vs Manufatura vs Taylorismo, Causa Econômica vs Política vs Jurídica), com colunas para Conceito, Requisitos, Efeitos, Diferenças e Cobrança em Provas.
6. **BOXES INFORMATIVOS COLORIDOS STYLIZED**:
   - 💡 **Dica de Prova**: Estatísticas e macetes de bancas examinadoras.
   - ⚠️ **Erro Comum**: Armadilhas conceituais e confusões frequentes dos candidatos.
   - 📚 **Doutrina**: Visão dos principais historiadores e juristas do trabalho.
   - ⚖️ **Jurisprudência**: Súmulas e precedentes dos Tribunais Superiores.
   - 📝 **Atenção**: Pontos críticos que exigem cautela.
   - 🚀 **Resumo**: Síntese expressa do tópico.
   - 🎯 **Pegadinhas de Banca**: Malícias clássicas de questões objetivas.
7. **EXEMPLOS PRÁTICOS EM TRÊS DIMENSÕES**:
   - Para cada grande tema: 1 Exemplo do Cotidiano, 1 Exemplo Jurídico Formal e 1 Exemplo de Questão Prática de Prova.
8. **LINHA DO TEMPO E FLUXOGRAMAS CSS**:
   - Linha do tempo horizontal ou fluxograma interativo apresentando a evolução histórica legislativa e contratual (Modos de Produção ➔ Manufatura 1776 ➔ Taylorismo 1911 ➔ CF México 1917 ➔ Weimar 1919 ➔ OIT 1919 ➔ Justiça do Trabalho no Brasil 1939 ➔ CLT 1943 ➔ DUDH 1948 ➔ CF/88).
9. **MAPAS MENTAIS VISUAIS**:
   - Caixas escuras estilizadas com fonte `'JetBrains Mono'`, organizando em árvore hierárquica os conceitos, classificações e desdobramentos de forma ultra-visual.
10. **MNEMÔNICOS E TÉCNICAS DE MEMORIZAÇÃO**:
    - Siglas, acrônimos, frases rímicas ou associações visuais para fixação de causas históricas, características do trabalho humano e constitucionalização dos direitos sociais.
11. **REVISÃO ATIVA (SISTEMA MULTIFORMADO DE QUESTÕES COM GABARITO OCULTO)**:
    - Seção de testes com:
      - Questões Discursivas com espelho de resposta.
      - Questões de Verdadeiro ou Falso comentadas.
      - Questões estilo CEBRASPE (Certo/Errado).
      - Questões estilo FGV / FCC (Múltipla escolha com comentário alternativo por alternativo).
    - Todos os gabaritos ocultos em `<details><summary>Ver resposta comentada</summary>...</details>`.
12. **FLASHCARDS INTERATIVOS**:
    - Cartões de fixação rápida para memorização de datas, artigos da CF/88 e DUDH, e modelos de organização do trabalho.
13. **RESUMO FINAL (ULTRA RÁPIDO / CHEAT SHEET DE 1 PÁGINA)**:
    - Um quadro síntese final em bullet points de altíssima densidade informacional para revisão rápida na véspera da prova.

---

### 3. CONTEÚDO BASE PARA INCORPORAÇÃO AUTOMÁTICA

[Insira aqui os arquivos e textos fonte da pasta CONTEUDO referentes à disciplina {{Direito do Trabalho}}, ex: direito do trabalho contexto historico.md]
```
