# PROMPT MESTRE PARA GERAÇÃO DE TEMPLATES EDUCACIONAIS JURÍDICOS EM HTML5 (GPT / CLAUDE / ANTIGRAVITY)

> **Como usar:** Copie e cole todo o bloco de código abaixo no ChatGPT / Claude / Antigravity, substituindo `{{direito do trabalho}}` (ou a variável da disciplina desejada, ex: `{{direito civil}}`, `{{direito penal}}`, `{{direito constitucional}}`, `{{processo civil}}`) pela disciplina jurídica específica e anexando/colando os textos brutos da pasta `CONTEUDO` (desconsiderando obrigatoriamente qualquer pasta `Não usar`).

---

```text
Você é um especialista de classe mundial em Design Instrucional, Direito do Trabalho, Teoria Geral do Direito, Direito Processual e Desenvolvedor Front-End Sênior. Sua tarefa é criar um material didático digital de altíssimo nível em formato de página web única (Standalone HTML5 file com suporte total a visualização local ou em servidor web) a partir do conteúdo bruto fornecido na pasta "CONTEUDO" / "conteudo para criação" (desconsiderando estritamente qualquer pasta "Não usar"), aceitando a variável de disciplina {{direito do trabalho}}.

O resultado NÃO DEVE SER UMA MERA CONVERSÃO DE TEXTO OU RESUMO SUPERFICIAL. Reestruture exaustivamente todo o conteúdo fornecido sem omitir NENHUMA PARTE nem nenhum detalhe do conteúdo base, criando um material didático completo, dinâmico, moderno e pronto para uso imediato em exames da faculdade, OAB e concursos públicos de alto nível (Magistratura do Trabalho, MPT, Analistas e Técnicos dos TRTs).

---

### 1. REGRAS DE ESTILO, FORMATO E ARQUITETURA DE CÓDIGO

1. **Arquivo Único HTML5 Standalone**:
   - Todo o CSS deve estar incorporado na tag `<style>` dentro do `<head>`.
   - Deve conter a importação do CSS base do portal: `<link rel="stylesheet" href="../../base-style.css">` para integração nativa no portal web, mantendo todas as variáveis e estilos próprios no `<style>` interno para funcionar 100% autônomo.
   - Ao final do arquivo, incluir a chamada do script interativo: `<script src="../../portal-core.js"></script>`.
2. **Google Fonts OBRIGATÓRIAS**:
   - Títulos / Headings: `'Outfit', sans-serif`
   - Corpo do texto: `'Lora', serif` (para leitura jurídica elegante) e `'Inter', sans-serif`
   - Código / Mnemônicos / Rótulos / Linhas do tempo / Mapas Mentais: `'JetBrains Mono', monospace`
3. **Identidade Visual por Disciplina (Color System via CSS Variables)**:
   - Para Direito do Trabalho ({{direito do trabalho}}): Âmbar Dourado / Terracota (`:root { --p-700: #78350F; --p-600: #B45309; --p-500: #F59E0B; --p-50: #FFFBEB; --primary: #F59E0B; --primary-dark: #78350F; --accent-gold: #D4AF37; --accent-teal: #0D9488; }`)
   - Para Direito Penal: Crimson / Vermelho Escuro (`:root { --p-700: #7F1D1D; --p-600: #991B1B; --p-500: #EF4444; --p-50: #FEF2F2; }`)
   - Para Direito Constitucional: Verde Esmeralda (`:root { --p-700: #064E3B; --p-600: #065F46; --p-500: #10B981; --p-50: #ECFDF5; }`)
   - Para Direito Civil: Azul Oceano / Índigo Royal (`:root { --p-700: #1E3A8A; --p-600: #1E40AF; --p-500: #3B82F6; --p-50: #EFF6FF; }`)
   - Para Processo Civil: Azul Cobalto (`:root { --p-700: #1E3A8A; --p-600: #1D4ED8; --p-500: #2563EB; --p-50: #EFF6FF; }`)
   - Suporte nativo e automático a Tema Claro e Escuro (`[data-theme="dark"]`).
4. **Remoção de Vícios e Referências Específicas**:
   - Remova qualquer citação ou referência a nomes de professores específicos, portais de aulas ou institutos comerciais privados. Mantenha um tom estritamente técnico, elegante, institucional e voltado a exames oficiais (OAB, Magistratura, MP, Defensoria e Concursos).
5. **Cobertura Exaustiva e Sem Omissões**:
   - NENHUM conceito do texto fonte pode ser omitido, resumido superficialmente ou cortado. Reestruture o texto em explicações profundas, com exemplos visuais e didáticos em 3 níveis.

---

### 2. ESTRUTURA OBRIGATÓRIA DA PÁGINA (SEÇÕES INTEGRALMENTE DESENVOLVIDAS)

Sua página HTML gerada DEVE conter as seguintes seções estruturadas e preenchidas em profundidade:

1. **HERO SECTION (Cabeçalho Premium)**:
   - Badge da disciplina (ex: `Material Didático · {{direito do trabalho}}`).
   - Título principal do tema e Subtítulo explicativo de alto impacto.
   - Meta tags: Ícones ⚖️ com fundamentação normativa (ex: Art. 7º CF/88, Arts. 2º, 3º, 9º, 10, 444, 468, 474, 482, 611-A, 620 CLT), Âmbito Teórico e Nível (Foco em Concursos de Alto Nível e OAB).
2. **BARRA DE NAVEGAÇÃO SUPERIOR (MAIN NAV BAR OBRIGATÓRIA)**:
   - Tag `<nav class="main-nav">` contendo o botão de atalho para o portal (`<a href="../../index.html" class="home-btn">...</a>`), a lista de links para as seções da página (`<div class="nav-list">...</div>`) e o botão alternador de tema escuro/claro (`<button class="theme-toggle" id="themeToggle">...</button>`).
3. **OBJETIVOS DE APRENDIZAGEM**:
   - Quadro destacado listando 4 a 6 competências chave que o estudante dominará ao concluir a leitura.
4. **ORGANIZAÇÃO MODULAR (Com Explicação em 3 Níveis por Instituto)**:
   - Divida o conteúdo em Módulos numerados logicamente.
   - Para CADA instituto ou conceito jurídico abordado, forneça:
     - **Explicação Nível 1 (Leigo / Linguagem Direta)**: Analogias cotidianas e intuição direta.
     - **Explicação Nível 2 (Graduação / Técnica)**: Dogmática jurídica formal, conceito técnico e enquadramento legal.
     - **Explicação Nível 3 (Concursos / Alto Nível)**: Pegadinhas de bancas examinadoras (CEBRASPE, FGV, FCC), divergências jurisprudenciais (STF/TST) e exceções.
   - Inclua sempre: Fundamento Legal, Exemplos Práticos, Doutrina Pertinente e Dicas de Prova.
5. **LEI SECA INTERATIVA**:
   - Artigos de lei e normas apresentados dentro de elementos `<details class="artigo">`.
   - O `<summary>` exibe apenas a referência do artigo (ex: `⚖️ Art. 468 da CLT - Inalterabilidade Contratual Lesiva`).
   - Ao expandir, exibe a transcrição ipsis litteris com palavras-chave destacadas em `<span class="kw">...</span>`, comentários explicativos e explicação em linguagem simples.
6. **QUADROS COMPARATIVOS MODERNOS**:
   - Tabelas estilizadas em HTML comparando institutos paralelos (ex: Teoria da Acumulação vs Teoria do Conglobamento; Renúncia vs Transação; In Dubio Pro Operario vs Norma Mais Favorável vs Condição Mais Benéfica; Empregado vs Autônomo vs Estagiário vs Avulso).
7. **BOXES INFORMATIVOS COLORIDOS STYLIZED**:
   - 💡 **Dica de Prova**: Estatísticas e macetes de bancas examinadoras.
   - ⚠️ **Erro Comum**: Armadilhas conceituais e confusões frequentes dos candidatos.
   - 📚 **Doutrina**: Visão dos doutrinadores de Direito do Trabalho.
   - ⚖️ **Jurisprudência**: Súmulas e precedentes do TST e STF.
   - 📝 **Atenção**: Pontos críticos que exigem cautela.
   - 🚀 **Resumo**: Síntese expressa do tópico.
   - 🎯 **Pegadinhas de Banca**: Malícias secularizadas de questões objetivas.
8. **EXEMPLOS PRÁTICOS EM TRÊS DIMENSÕES**:
   - Para cada grande tema: 1 Exemplo do Cotidiano, 1 Exemplo Jurídico Formal e 1 Exemplo de Questão Prática de Prova (incluindo questões oficiais da OAB/Concursos).
9. **LINHA DO TEMPO E FLUXOGRAMAS CSS**:
   - Linha do tempo ou fluxograma interativo apresentando a aplicação de princípios ou regras temporais/normativas.
10. **MAPAS MENTAIS VISUAIS**:
    - Caixas escuras estilizadas com fonte `'JetBrains Mono'`, organizando em árvore hierárquica os conceitos, classificações e desdobramentos de forma ultra-visual.
11. **MNEMÔNICOS E TÉCNICAS DE MEMORIZAÇÃO**:
    - Siglas, acrônimos e associações visuais com destaque das letras iniciais em pílulas amarelas de altíssimo contraste, garantindo legibilidade perfeita.
12. **REVISÃO ATIVA (SISTEMA MULTIFORMADO DE QUESTÕES COM GABARITO OCULTO)**:
    - Seção de testes com:
      - Questões Discursivas com espelho de resposta.
      - Questões de Verdadeiro ou Falso comentadas.
      - Questões estilo CEBRASPE (Certo/Errado).
      - Questões estilo FGV / FCC / OAB (Múltipla escolha com comentário alternativa por alternativa).
    - Todos os gabaritos ocultos em `<details><summary>Ver resposta comentada</summary>...`</details>`.
13. **FLASHCARDS INTERATIVOS**:
    - Cartões de fixação rápida para memorização de artigos da CLT, Súmulas do TST e exceções dos princípios.
14. **RESUMO FINAL (ULTRA RÁPIDO / CHEAT SHEET DE 1 PÁGINA)**:
    - Um quadro síntese final em bullet points de altíssima densidade informacional para revisão rápida na véspera da prova.

---

### 3. MODELO DE ESTRUTURA HTML5 E PADRÃO DE ESTILO

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{Título do Tema}} | {{direito do trabalho}}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../../base-style.css">
  
  <style>
    :root {
      --p-700: #78350F;
      --p-600: #B45309;
      --p-50: #FFFBEB;
      --p-500: #F59E0B;
      --primary: #F59E0B;
      --primary-dark: #78350F;
      --accent-gold: #D4AF37;
      --accent-teal: #0D9488;
    }
    /* Estilos internos de componentes didáticos, cards, tabelas e mapas mentais */
  </style>
</head>
<body>
  <!-- Conteúdo Didático Completo -->
  <script src="../../portal-core.js"></script>
</body>
</html>
```

---

### 4. CONTEÚDO BASE PARA INCORPORAÇÃO AUTOMÁTICA

[Insira aqui o conteúdo bruto do arquivo .md localizado na pasta CONTEUDO referente à disciplina {{direito do trabalho}}, desconsiderando obrigatoriamente qualquer pasta "Não usar"]
```
