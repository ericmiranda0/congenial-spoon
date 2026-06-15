import os

html_content = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Direito Civil II – Transmissão das Obrigações | Material Didático</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../base-style.css">
  <style>
    :root {
      --p-700: #1E3A8A;
      --p-600: #1E40AF;
      --p-500: #3B82F6;
      --p-50: #EFF6FF;
    }
    header { background: linear-gradient(135deg, var(--p-700) 0%, #171717 100%); }
    section h2 .num { 
        font-family: 'JetBrains Mono', monospace; 
        font-size: 1.1rem; 
        color: white; 
        background: var(--p-500); 
        padding: 0.4rem 0.8rem; 
        border-radius: 8px; 
    }
  </style>
</head>
<body>
<div class="progress-container"><div class="progress-bar" id="progressBar"></div></div>
<header>
  <div class="container">
    <div class="badge">Material Didático · Direito Civil II</div>
    <h1>Transmissão das Obrigações</h1>
    <p class="subtitle">Cessão de Crédito e Assunção de Dívida</p>
    <div class="meta" style="display:flex; justify-content:center; gap:20px; opacity:0.8; font-size:0.9rem;">
      <span>⚖️ CC/02</span>
      <span>📚 Arts. 286 a 303</span>
    </div>
  </div>
</header>
<nav class="main-nav">
  <div class="container">
    <a href="../../index.html" class="home-btn" title="Voltar ao Portal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    </a>
    <div class="nav-list">
      <a href="#intro" class="nav-item">Introdução</a>
      <a href="#cessao" class="nav-item">Cessão de Crédito</a>
      <a href="#assuncao" class="nav-item">Assunção de Dívida</a>
    </div>
    <button class="theme-toggle" id="themeToggle">
      <svg width="20" height="20" id="themeIcon"></svg>
    </button>
  </div>
</nav>
<main>
<div class="container">

      <div id="sumario">
        <h2>📋 Sumário Interativo</h2>
        <ol>
          <li><a href="#intro">Notas Introdutórias</a></li>
          <li><a href="#cessao">Cessão de Crédito</a></li>
          <li><a href="#assuncao">Assunção de Dívida</a></li>
        </ol>
      </div>

      <section class="reveal" id="intro">
        <h2><span class="num">01</span> Notas Introdutórias</h2>
        <div class="layer-simple">
          No fenômeno da transmissão, a obrigação não é extinta, mas substituída, com a passagem de um sujeito a outro.
        </div>
        <p>A relação jurídica, como toda entidade, possui um momento de nascimento, uma etapa na qual sofre modificações e uma fase derradeira em que se extingue. Ao conjunto dessas fases, chamamos de vicissitudes jurídicas (nascimento, modificação e extinção), que constituem um momento dinâmico e procedimental da relação jurídica.</p>
        <p>Entre a constituição e a extinção, apresenta-se a vicissitude simplesmente modificativa da relação jurídica, que não é constitutiva porque a relação já existe, nem extintiva porque visa à sua conservação. Como fonte de obrigações, o negócio jurídico não apenas cria e extingue relações jurídicas, como ainda lhe proporciona mutações. A transmissão da obrigação é fenômeno que, apesar de acidental no processamento da relação, é muitíssimo frequente na prática.</p>
        <div class="essential reveal">
          O vocábulo "transmissão" valoriza a nota de permanência da obrigação, tendo em vista a alteração registrada em seus sujeitos. Toda forma de transmissão de obrigação se caracteriza pela conservação do negócio jurídico, que não sofre modificação em seu objeto por mais que ocorra sucessiva substituição de seus atores.
        </div>
        <p>Em geral, todos os créditos são transmissíveis, seja inter vivos ou causa mortis.</p>
        <p>Nesta disciplina trataremos da possibilidade de substituição subjetiva nas relações obrigacionais, em face da autonomia privada das partes. Tanto o credor como o devedor (a título particular, gratuito ou onerosamente) poderão transferir seus créditos e débitos para terceiros, bem como haverá possibilidade de transmissão da própria posição contratual. O CC cuida somente da transmissão em virtude de negócio jurídico.</p>
        <p>Tem-se três espécies de transmissão das obrigações negociais:</p>
        <ul>
          <li>Cessão de crédito;</li>
          <li>Assunção de dívida;</li>
          <li>Cessão da posição contratual.</li>
        </ul>
        <p>(O legislador disciplinou apenas as duas primeiras.)</p>
      </section>

      <section class="reveal" id="cessao">
        <h2><span class="num">02</span> Cessão de Crédito</h2>
        <p>Cessão de crédito é o negócio jurídico bilateral pelo qual o credor transfere a terceiro a sua posição patrimonial na relação obrigacional, sem que com isso se crie uma nova situação jurídica.</p>
        <p>"A cessão de crédito consiste, precisamente, no contrato pelo qual o credor de determinada prestação transmite a terceiro, independentemente do consentimento do devedor, a totalidade ou parte do seu crédito". (Antunes Varela)</p>
        
        <div class="note">
          <strong>Atenção à terminologia:</strong> Enquanto o termo "alienação" envolve a transmissão de coisas corpóreas, o vocábulo "cessão" implica transferência onerosa ou gratuita de bens imateriais, intangíveis. É possível alienar um quadro ou um imóvel. Todavia, podemos somente ceder direitos autorais ou direitos hereditário, assim como créditos.
        </div>

        <p>No contexto de uma relação obrigacional, a cessão de crédito surge como um negócio jurídico que envolve três personagens e dois consentimentos, a saber:</p>
        <ul>
          <li><strong>Cedente:</strong> é aquele que transfere total ou parcialmente o seu crédito;</li>
          <li><strong>Cessionário:</strong> aquele que adquire o crédito, preservando a mesma posição do cedente.</li>
          <li><strong>Cedido:</strong> devedor, que terá de adimplir a obrigação em favor do cessionário.</li>
        </ul>

        <p>A vontade do cedido não participa da validade do negócio jurídico, pois ele não desfruta de legitimidade para se opor à transmissão do crédito. Até por que, em regra, a modificação da pessoa do credor não lhe acarreta prejuízo, a medida que a prestação que terá de cumprir objetivamente se mantém idêntica. Mesmo se excepcionalmente houver algum incômodo ao devedor, vê-se que, à luz, da técnica da ponderação de interesses, optou o legislador por dar primazia à liberdade de disposição do crédito por parte de seu titular, sem consultar ao interesse do sujeito passivo.</p>
        
        <div class="essential reveal">
          Não obstante prescindir-se do consentimento do devedor, fundamental será o seu conhecimento quanto à realização da cessão para fins de eficácia e oponibilidade em relação à sua pessoa. Enfatiza a primeira parte do art. 290, CC, que "A cessão do crédito não tem eficácia em relação ao devedor, senão quando a este notificado".
        </div>

        <p>A constatação da validade do negócio jurídico de cessão de crédito, mesmo quando da ausência da notificação ao devedor, demonstra que a justificativa e a finalidade de qualquer relação obrigacional é a satisfação do interesse do credor, pois o devedor terá de lhe proporcionar um certo bem ou utilidade. Isso explica que a satisfação do credor pode resultar por outras vias, ainda que não seja mediante o cumprimento pelo devedor da prestação devida.</p>
        <p>Portanto, apesar de o cedido ser considerado como terceiro em relação à cessão , a eficácia do negócio obrigacional em relação a ele requer a notificação pessoal (pelo cedente ou pelo cessionário), através da via judicial, extrajudicial ou presumida, esta última quando o próprio devedor-cedido se declare ciente da cessão em instrumento público ou particular (art. 290, CC). A citação do devedor em ação movida pelo cessionário atende a finalidade precípua do art. 290, CC.</p>
        <p>Enquanto em uma alienação existe apenas dois protagonistas, a cessão de crédito requer, necessariamente, a transferência de direitos envolvendo os três participantes já mencionados. Em regra, a cessão de crédito possui base contratual, demonstrando a emissão da vontade de cedente e cessionário, mas é possível que resulte de negócio jurídico unilateral, envolvendo cessão de crédito pela via testamentária.</p>
        
        <p>Portanto, a cessão de crédito implica tão somente substituição subjetiva no polo ativo da obrigação, pois o seu objeto remanesce intacto, abrangendo ainda todos os seus acessórios, como juros e cláusula penal (art. 287, CC). Quanto a natureza jurídica, a cessão de crédito deriva de um ato de autonomia negocial, via de regra. Excepcionalmente pode derivar de imposição legal ou de ordem judicial.</p>
        <p>A cessão, como qualquer outro negócio jurídico, submete-se aos requisitos de validade do art. 104, CC.</p>
        <p>Em regra, será negócio jurídico oneroso, mas é possível que seja convencionado de forma gratuita. Essa distinção é relevante, pois se tratando de cessão de crédito gratuita, será afetado pelas regras gerais de validade do contrato de doação (art. 538-564, CC). Sendo a causa da transmissão um ato oneroso, necessária se faz a observação da sistemática do contrato de compra e venda.</p>
        <p>O efeito básico da cessão é a transmissão do cedente ao cessionário da titularidade da relação jurídica. O art. 286 do CC não se refere a possibilidade de cessão parcial de crédito, mas a doutrina a admite, especialmente sob o fundamento da liberdade contratual.</p>
        <p>A transmissão ao cessionário da titularidade da relação jurídica implica, a teor do art. 348 do CC, no fato de o cessionário se sub-rogar nos direitos do cedente. Cessão de crédito é diferente da sub-rogação.</p>
      </section>

      <section class="reveal" id="assuncao">
        <h2><span class="num">03</span> Assunção de Dívida</h2>
        <p>Assunção de dívida é um negócio jurídico de transmissão singular de um débito, não tão frequente quanto a cessão de crédito pelo lado ativo da obrigação, mas nem por isso de menor importância.</p>
        <div class="essential reveal">
          Verifica-se a assunção de dívida quando um terceiro (assuntor), estranho à relação obrigacional, nela ingressa, assumindo a posição do devedor originário na relação jurídica, com a anuência do credor.
        </div>
        <p>"É a operação pela qual um terceiro (assuntor) se obriga perante o credor a efetuar a prestação devida por outrem". (Antunes Varela)</p>
        <p>A sua especificidade consiste na transferência da dívida do antigo para o novo devedor, mantendo-se intacta a relação obrigacional. Esse instituto não existia, de forma positivada, no CC/1996, mas já era, desde então, plenamente aceitando em sede doutrinária e jurisprudencial, em homenagem ao princípio da autonomia privada.</p>
        <p>O maior objetivo do CC/2002 ao regulamentar a assunção de dívida é proteger o interesse do credor, garantindo a solvabilidade do crédito que não poderá ser depreciado em razão da substituição no polo passivo da obrigação.</p>
        
        <div class="exam-tip">
          Na cessão de crédito é irrelevante para o devedor a figura de quem receberá o débito, até mesmo pela diminuta potencialidade de sofrer danos. Já na assunção de dívida, a identidade do devedor é fator fundamental para o suporte do credor, principalmente quanto às suas condições de solvabilidade. Por isso, é imprescindível o consentimento do credor para que se concretize a transmissão do débito (art. 299, CC).
        </div>

        <p>No tocante aos efeitos quanto ao antigo devedor, coexistem duas espécies de assunção de dívida:</p>
        <ul>
          <li><strong>Assunção liberatória (privativa ou exclusiva):</strong> está prevista no art. 299, CC. A transmissão da obrigação propicia a liberação do devedor originário, sem perda de identidade do vínculo, que se mantém inalterado. Somente nesta modalidade tem-se uma verdadeira transmissão particular do débito, pois com o ingresso do assuntor o devedor fica liberado.</li>
          <li><strong>Assunção cumulativa:</strong> não está positivada no CC. Pode ser conceituada como a modalidade em que o novo devedor assume o débito conjuntamente com o devedor primitivo. Não há uma substituição no polo passivo, mas uma ampliação do polo subjetivo da relação de direito material, pois o assuntor se manterá ao lado do devedor primitivo, ambos respondendo perante o credor, que poderá exigir a prestação de um ou de outro. Há um reforço no débito, pois o credor poderá alcançar o débito por duas vias.</li>
        </ul>
        <p>Apesar de essa espécie de assunção debitória não figurar no ordenamento, nada obsta que os sujeitos da relação obrigacional a constituam, desde que perfeitamente apartável da assunção liberatória.</p>
        <div class="note">
          Dispõe o Enunciado 16 do Conselho de Justiça Federal que "O art. 299 do Código Civil não exclui a possibilidade de assunção cumulativa da dívida quando dois ou mais devedores se tornam responsáveis pelo débito com a concordância do credor". Há críticas da doutrina quanto à segunda modalidade.
        </div>
      </section>

</div>
</main>
<script>
  // Simple intersection observer for reveal effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
</body>
</html>
"""

output_path = os.path.join("subjects", "civil-ii", "transmissao-obrigacoes.html")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated transmissao-obrigacoes.html successfully.")
