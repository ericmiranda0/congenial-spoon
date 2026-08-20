# PROMPT MESTRE PARA GERAÇÃO DE TEMPLATES EDUCACIONAIS JURÍDICOS EM HTML5 (GPT)

> **Como usar:** Copie e cole todo o bloco de código abaixo no ChatGPT / Claude / Antigravity, substituindo `{{constitucional}}` (ou a variável da disciplina desejada, ex: `{{civil}}`, `{{penal}}`, `{{trabalho}}`, `{{cpc}}`) pela disciplina jurídica específica e anexando/colando os textos brutos da pasta `CONTEUDO` (ou `conteudo para criação`, desconsiderando qualquer pasta `Não usar`).

---

```text
Você é um especialista de classe mundial em Design Instrucional, Direito Constitucional, Teoria Geral do Direito, Direito Financeiro e Desenvolvedor Front-End Sênior. Sua tarefa é criar um material didático digital de altíssimo nível em formato de página web única (Standalone HTML5 file com suporte total a visualização local ou em servidor web) a partir do conteúdo bruto fornecido na pasta "CONTEUDO" / "conteudo para criação" (desconsiderando qualquer pasta "Não usar"), aceitando a variável de disciplina {{constitucional}}.

O resultado NÃO DEVE SER UMA MERA CONVERSÃO DE TEXTO OU RESUMO SUPERFICIAL. Reestruture exaustivamente todo o conteúdo fornecido sem omitir nenhuma parte do conteúdo base, criando um material didático completo, dinâmico, moderno e pronto para uso imediato em provas da faculdade e concursos públicos de alto nível (Magistratura, Ministério Público, Defensoria, Delegado, Analistas e OAB).

---

### 1. REGRAS DE ESTILO, FORMATO E ARQUITETURA DE CÓDIGO

1. **Arquivo Único HTML5 Standalone**:
   - Todo o CSS deve estar incorporado na tag `<style>` dentro do `<head>`.
   - Deve conter também a importação do arquivo base do portal: `<link rel="stylesheet" href="../../base-style.css">` para integração nativa no portal web, mantendo todas as variáveis e estilos próprios no `<style>` interno para funcionar 100% autônomo.
   - Ao final do arquivo, incluir a chamada do script interativo: `<script src="../../portal-core.js"></script>`.
2. **Google Fonts OBRIGATÓRIAS**:
   - Títulos / Headings: `'Outfit', sans-serif`
   - Corpo do texto: `'Lora', serif` (para leitura jurídica elegante) ou `'Inter', sans-serif`
   - Código / Mnemônicos / Rótulos / Linhas do tempo / Mapas Mentais: `'JetBrains Mono', monospace`
3. **Identidade Visual por Disciplina (Color System via CSS Variables)**:
   - Para Direito Constitucional ({{constitucional}}): Verde Esmeralda (`:root { --p-700: #064E3B; --p-600: #065F46; --p-500: #10B981; --p-50: #ECFDF5; --primary: #10B981; --primary-dark: #064E3B; }`)
   - Para Direito Penal: Crimson / Vermelho Escuro (`:root { --p-700: #7F1D1D; --p-600: #991B1B; --p-500: #EF4444; --p-50: #FEF2F2; }`)
   - Para Direito Civil: Azul Cobalto (`:root { --p-700: #1E3A8A; --p-600: #1E40AF; --p-500: #3B82F6; --p-50: #EFF6FF; }`)
   - Para Direito do Trabalho: Âmbar Dourado (`:root { --p-700: #78350F; --p-600: #B45309; --p-500: #F59E0B; --p-50: #FFFBEB; }`)
   - Suporte nativo e automático a Tema Claro e Escuro (`[data-theme="dark"]`).
4. **Remoção de Vícios e Referências Específicas**:
   - Remova qualquer citação ou referência a nomes de professores específicos, cursinhos ou portais privados comerciais. Mantenha um tom técnico, elegante, institucional e voltado a exames oficiais (OAB, Magistratura, MP, Defensoria e Concursos).
5. **Cobertura Exaustiva e Sem Omissões**:
   - NENHUM conceito do texto fonte pode ser omitido, resumido superficialmente ou cortado. Reestruture o texto em explicações profundas, com exemplos visuais e didáticos.

---

### 2. ESTRUTURA OBRIGATÓRIA DA PÁGINA (14 SEÇÕES INTEGRALMENTE DESENVOLVIDAS)

Sua página HTML gerada DEVE conter as seguintes seções estruturadas e preenchidas em profundidade:

1. **HERO SECTION (Cabeçalho Premium)**:
   - Badge da disciplina (ex: `Material Didático · {{constitucional}}`).
   - Título principal do tema e Subtítulo explicativo de alto impacto.
   - Meta tags: Ícones ⚖️ com fundamentação normativa (ex: Arts. 6º, 193 a 204 da CF/88, Leis 8.212/91 e 8.213/91, LOAS Lei 8.742/93), Âmbito Teórico e Nível (Foco em Concursos de Alto Nível e OAB).
2. **SUMÁRIO INTERATIVO (Navegação Interna)**:
   - Links diretos com ícones para cada uma das seções da página.
3. **OBJETIVOS DE APRENDIZAGEM**:
   - Quadro destacado listando 4 a 6 competências chave que o estudante dominará ao concluir a leitura.
4. **ORGANIZAÇÃO MODULAR (Com Explicação em 3 Níveis por Instituto)**:
   - Divida o conteúdo em Módulos numerados logicamente.
   - Para CADA instituto ou conceito jurídico abordado, forneça:
     - **Explicação Nível 1 (Leigo / Linguagem Direta)**: Analogias cotidianas e intuição direta.
     - **Explicação Nível 2 (Graduação / Técnica)**: Dogmática jurídica formal, conceito técnico e enquadramento legal.
     - **Explicação Nível 3 (Concursos / Alto Nível)**: Pegadinhas de bancas examinadoras (CEBRASPE, FGV, FCC), divergências jurisprudenciais (STF/STJ) e exceções.
   - Inclua sempre: Fundamento Legal, Exemplos Práticos, Doutrina Pertinente e Dicas de Prova.
5. **LEI SECA INTERATIVA**:
   - Artigos de lei e normas constitucionais apresentados dentro de elementos `<details class="artigo">`.
   - O `<summary>` exibe apenas a referência do artigo (ex: `⚖️ Art. 193 da CF/88 - Da Ordem Social`).
   - Ao expandir, exibe a transcrição ipsis litteris com palavras-chave destacadas em `<span class="kw">...</span>`, comentários explicativos e explicação em linguagem simples.
6. **QUADROS COMPARATIVOS MODERNOS**:
   - Tabelas estilizadas em HTML comparando institutos paralelos (ex: Saúde vs. Assistência Social vs. Previdência Social; BPC/LOAS vs. Aposentadoria Previdenciária; Aspecto Objetivo vs. Subjetivo da Universalidade), com colunas para Conceito, Custeio/Contribuição, Beneficiários, Natureza Jurídica e Cobrança em Provas.
7. **BOXES INFORMATIVOS COLORIDOS STYLIZED**:
   - 💡 **Dica de Prova**: Estatísticas e macetes de bancas examinadoras.
   - ⚠️ **Erro Comum**: Armadilhas conceituais e confusões frequentes dos candidatos.
   - 📚 **Doutrina**: Visão dos principais constitucionalistas e doutrinadores.
   - ⚖️ **Jurisprudência**: Súmulas e precedentes do STF e STJ.
   - 📝 **Atenção**: Pontos críticos que exigem cautela.
   - 🚀 **Resumo**: Síntese expressa do tópico.
   - 🎯 **Pegadinhas de Banca**: Malícias clássicas de questões objetivas.
8. **EXEMPLOS PRÁTICOS EM TRÊS DIMENSÕES**:
   - Para cada grande tema: 1 Exemplo do Cotidiano, 1 Exemplo Jurídico Formal e 1 Exemplo de Questão Prática de Prova.
9. **LINHA DO TEMPO E FLUXOGRAMAS CSS**:
   - Linha do tempo horizontal ou fluxograma interativo apresentando a evolução legislativa, os marcos da Ordem Social e a sequência do custeio e concessão de benefícios.
10. **MAPAS MENTAIS VISUAIS**:
    - Caixas escuras estilizadas com fonte `'JetBrains Mono'`, organizando em árvore hierárquica os conceitos, classificações e desdobramentos de forma ultra-visual.
11. **MNEMÔNICOS E TÉCNICAS DE MEMORIZAÇÃO**:
    - Siglas, acrônimos, frases rímicas ou associações visuais para fixação (ex: PAS = Previdência, Assistência, Saúde; TRIPÉ DA SEGURIDADE; UNISEDI; SOCIDIVAPLU).
12. **REVISÃO ATIVA (SISTEMA MULTIFORMADO DE QUESTÕES COM GABARITO OCULTO)**:
    - Seção de testes com:
      - Questões Discursivas com espelho de resposta.
      - Questões de Verdadeiro ou Falso comentadas.
      - Questões estilo CEBRASPE (Certo/Errado).
      - Questões estilo FGV / FCC (Múltipla escolha com comentário alternativa por alternativa).
    - Todos os gabaritos ocultos em `<details><summary>Ver resposta comentada</summary>...</details>`.
13. **FLASHCARDS INTERATIVOS**:
    - Cartões de fixação rápida para memorização de artigos da CF/88 (Arts. 6º, 193, 194, 195 e incisos), princípios e requisitos de concessão.
14. **RESUMO FINAL (ULTRA RÁPIDO / CHEAT SHEET DE 1 PÁGINA)**:
    - Um quadro síntese final em bullet points de altíssima densidade informacional para revisão rápida na véspera da prova.

---

### 3. CONTEÚDO BASE PARA INCORPORAÇÃO AUTOMÁTICA

[Insira aqui os arquivos e textos fonte da pasta CONTEUDO referentes à disciplina {{constitucional}}, ex: const aula 2.md]
```
