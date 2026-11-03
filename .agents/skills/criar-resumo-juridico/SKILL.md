---
name: criar-resumo-juridico
description: >-
  Cria ou atualiza automaticamente resumos didáticos jurídicos em HTML5 de altíssimo nível
  a partir de qualquer material bruto (.md ou texto) colocado na pasta CONTEUDO.
  Use sempre que o usuário pedir para resumir, criar resumo, sintetizar ou transformar
  um conteúdo ou disciplina de CONTEUDO em página web/resumo educacional.
---

# Skill: Criador Genérico de Resumos Didáticos Jurídicos (HTML5)

Esta skill define o fluxo completo e automatizado para gerar materiais didáticos digitais de alta qualidade a partir de arquivos da pasta `CONTEUDO`, sem necessidade de repetir o prompt mestre a cada novo resumo.

---

## 1. Regras de Leitura e Entrada

1. **Localização dos Materiais Brutos**:
   - Analisar os arquivos `.md` ou `.txt` presentes na pasta raiz `CONTEUDO/` (ex: `CONTEUDO/Constitucional.md`).
   - **IMPORTANTE**: Desconsiderar estritamente qualquer pasta ou arquivo dentro de subpastas marcadas como `Não usar` (ou variações com acentuação).
2. **Identificação da Disciplina e Tema**:
   - Identificar no cabeçalho ou no nome do arquivo a disciplina jurídica correspondente:
     - **Processo Civil**: `subjects/processo-civil/`
     - **Direito Penal**: `subjects/penal-ii/` ou `subjects/penal-iii/`
     - **Direito Constitucional**: `subjects/constitucional/`
     - **Direito Civil**: `subjects/civil-ii/` ou `subjects/civil-iii/`
     - **Direito do Trabalho**: `subjects/direito-do-trabalho/`
     - **Direito Digital**: `subjects/direito-digital/`
     - **Direitos Humanos**: `subjects/direitos-humanos/`
     - **Psicologia Jurídica**: `subjects/psicologia-juridica/`
3. **Mapeamento de Cores e Identidade Visual (CSS Variables)**:
   - **Processo Civil**: Azul Cobalto / Índigo Profundo (`--p-700: #1E3A8A; --p-600: #1D4ED8; --p-500: #2563EB; --p-400: #60A5FA; --p-100: #DBEAFE; --p-50: #EFF6FF; --primary: #2563EB; --primary-dark: #1E3A8A; --accent-gold: #D4AF37;`)
   - **Direito Penal**: Crimson / Vermelho Escuro (`--p-700: #7F1D1D; --p-600: #991B1B; --p-500: #EF4444; --p-50: #FEF2F2;`)
   - **Direito Constitucional**: Verde Esmeralda (`--p-700: #064E3B; --p-600: #065F46; --p-500: #10B981; --p-50: #ECFDF5;`)
   - **Direito Civil**: Azul Oceano / Índigo Royal (`--p-700: #1E3A8A; --p-600: #1E40AF; --p-500: #3B82F6; --p-50: #EFF6FF;`)
   - **Direito do Trabalho**: Âmbar Dourado / Terracota (`--p-700: #78350F; --p-600: #B45309; --p-500: #F59E0B; --p-50: #FFFBEB;`)

---

## 2. Padrão Arquitetural Obrigatório do HTML5

O arquivo gerado deve ser um arquivo único HTML5 standalone salvo na subpasta da respectiva disciplina (ex: `subjects/constitucional/<slug-do-tema>.html`), contendo:

1. **Cabeçalho `<head>`**:
   - Google Fonts: `'Outfit'`, `'Lora'`, `'Inter'` e `'JetBrains Mono'`.
   - Link do CSS base: `<link rel="stylesheet" href="../../base-style.css">`
   - Bloco `<style>` contendo as variáveis temáticas e customizações locais.
2. **Rodapé e Scripts**:
   - `<script src="../../portal-core.js"></script>` antes de fechar `</body>`.
3. **Barra de Navegação Superior (`<nav class="main-nav">`)**:
   - Link de retorno ao portal: `<a href="../../index.html" class="home-btn">← Portal</a>`
   - Links internos para navegação rápida nas seções (`.nav-list`).
   - Botão alternador de tema (`<button class="theme-toggle" id="themeToggle">🌓</button>`).

---

## 3. Estrutura Didática Exaustiva (Sem Omissões)

O resumo NÃO pode ser superficial e NENHUM conceito do texto bruto deve ser descartado. A página gerada deve conter obrigatoriamente:

1. **HERO SECTION**: Badge da disciplina, título do tema, subtítulo impactante, fundamentação normativa e nível (Foco em Concursos / OAB / Faculdade).
2. **OBJETIVOS DE APRENDIZAGEM**: Quadro com 4 a 6 competências-chave.
3. **ORGANIZAÇÃO MODULAR EM 3 NÍVEIS**:
   - **Nível 1 (Linguagem Direta / Intuitiva)**: Analogias e intuição prática.
   - **Nível 2 (Graduação / Técnica)**: Dogmática formal, conceitos técnicos e enquadramento legal.
   - **Nível 3 (Concursos / Alto Nível)**: Pegadinhas de bancas (CEBRASPE, FGV, FCC), divergências e jurisprudência (STF/STJ/TST).
4. **LEI SECA INTERATIVA**:
   - Elementos `<details class="artigo">` com `<summary>` exibindo o artigo e transcrição comentada ao expandir.
5. **QUADROS COMPARATIVOS E TABELAS**:
   - Comparação lado a lado entre institutos paralelos.
6. **BOXES INFORMATIVOS COLORIDOS**:
   - 💡 Dica de Prova, ⚠️ Erro Comum, 📚 Doutrina, ⚖️ Jurisprudência, 📝 Atenção, 🎯 Pegadinhas de Banca.
7. **EXEMPLOS PRÁTICOS EM TRÊS DIMENSÕES**:
   - Cotidiano, Prática Forense e Questão de Exame.
8. **MAPAS MENTAIS VISUAIS**:
   - Árvores e fluxos estilizados com fonte monospace `'JetBrains Mono'`.
9. **MNEMÔNICOS E TÉCNICAS DE MEMORIZAÇÃO**:
   - Siglas com destaque das iniciais em pílulas amarelas de alto contraste.
10. **REVISÃO ATIVA**:
    - Questões Discursivas, V/F, estilo CEBRASPE e estilo FGV/OAB com gabarito oculto em `<details><summary>Ver resposta comentada</summary>...</details>`.
11. **FLASHCARDS E CHEAT SHEET FINAL**:
    - Cards de memorização rápida e resumo de 1 página em bullet points densos para véspera de prova.

---

## 4. Integração Obrigatória ao Hub Principal e Portal de Resumos

Após gerar o arquivo HTML da disciplina, a skill DEVE obrigatoriamente realizar a integração completa no ecossistema do portal:

1. **Adição ao Hub Principal (`index.html` na raiz)**:
   - Adicionar o card/link do resumo na seção da respectiva disciplina dentro do painel de abas (tanto na visualização desktop quanto mobile):
     - Inserir a tag `<a href="subjects/<disciplina>/<arquivo>.html" class="summary-link-item">` com ícone temático, título do resumo e seta indicadora.
   - Atualizar a contagem total de resumos ou estatísticas do cabeçalho se exibido no portal.
2. **Adição ao Índice da Disciplina (`subjects/<disciplina>/index.html`)**:
   - Inserir o card dedicado com título, badge, subtítulo, lista de tópicos abordados e link direto para o resumo recém-criado.
3. **Indexação na Busca Global (`search-index.js`)**:
   - Adicionar o novo objeto com `title`, `subject`, `url`, `keywords`, `summary` e tópicos principais para permitir localização instantânea pela barra de busca do portal.

