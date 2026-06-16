import os

file_path = os.path.join("subjects", "civil-ii", "extincao-obrigacao-responsabilidade.html")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update title
content = content.replace("<title>Direito Civil II – Extinção das Obrigações &amp; Responsabilidade Civil | Premium Learning</title>", 
                          "<title>Direito Civil II – Transmissão, Extinção das Obrigações &amp; Responsabilidade Civil | Premium Learning</title>")
content = content.replace("<h1>Extinção das Obrigações &amp; Responsabilidade Civil</h1>",
                          "<h1>Transmissão, Extinção das Obrigações &amp; Responsabilidade Civil</h1>")

# Update meta tags in header
content = content.replace("<span>📜 Arts. 346 a 388 CC/02</span>", "<span>📜 Arts. 286 a 388 CC/02</span>")

# Update nav-list
nav_old = """    <div class="nav-list">
      <a href="#intro" class="nav-item">Teoria Geral</a>"""
nav_new = """    <div class="nav-list">
      <a href="#transmissao" class="nav-item">Transmissão</a>
      <a href="#intro" class="nav-item">Teoria Geral</a>"""
content = content.replace(nav_old, nav_new)

# Update sumário
sumario_old = """      <div id="sumario">
        <h2>📋 Sumário Interativo</h2>
        <ol>
          <li><a href="#intro">Teoria Geral da Extinção das Obrigações</a></li>"""
sumario_new = """      <div id="sumario">
        <h2>📋 Sumário Interativo</h2>
        <ol>
          <li><a href="#transmissao">Transmissão das Obrigações</a>
            <ol>
               <li><a href="#cessao-credito">Cessão de Crédito</a></li>
               <li><a href="#assuncao-divida">Assunção de Dívida</a></li>
            </ol>
          </li>
          <li><a href="#intro">Teoria Geral da Extinção das Obrigações</a></li>"""
content = content.replace(sumario_old, sumario_new)

# New content to inject before <!-- ============================== -->\n  <!-- 1. TEORIA GERAL DA EXTINÇÃO -->
new_html = """
  <!-- ============================== -->
  <!-- 0. TRANSMISSÃO DAS OBRIGAÇÕES -->
  <!-- ============================== -->
  <section id="transmissao" class="reveal">
    <h2><span class="num">00</span> Transmissão das Obrigações</h2>
    
    <div class="layer-simple">
      Imagine que você está no meio de um jogo de revezamento. O bastão é a "obrigação". Passar o bastão para outro corredor não termina a corrida; apenas muda quem está correndo com ele. Na transmissão das obrigações, a relação jurídica não morre (não se extingue), ela apenas muda de dono (substituição subjetiva), seja quem tem o direito de receber (Cessão de Crédito) ou quem tem o dever de pagar (Assunção de Dívida).
    </div>

    <div class="layer-tech">
      <strong>Definição Técnica:</strong> A transmissão da obrigação é uma vicissitude jurídica <em>modificativa</em> (nem constitutiva, nem extintiva). Caracteriza-se pela conservação do negócio jurídico, ou seja, a obrigação não é extinta, mas substituída com a passagem de um sujeito a outro. O objeto da relação remanesce intacto, operando-se uma sucessão subjetiva (ativa ou passiva). O Código Civil de 2002 regulamenta as transmissões decorrentes de negócio jurídico (inter vivos), pautando-se pela autonomia privada.
    </div>

    <div class="note">
      <span class="box-label">💡 Analogia da Conta de Luz</span>
      Se você vende sua casa, a obrigação de pagar pela energia elétrica daquele endereço continua existindo (a dívida não morre). O que acontece é a transferência dessa responsabilidade do seu CPF para o CPF do novo morador. A relação com a fornecedora permanece intacta, muda-se apenas a pessoa amarrada a ela.
    </div>
  </section>

  <section id="cessao-credito" class="reveal">
    <h3>Cessão de Crédito</h3>
    
    <div class="layer-tech">
      <strong>Definição (Prof. Antunes Varela):</strong> "A cessão de crédito consiste, precisamente, no contrato pelo qual o credor de determinada prestação transmite a terceiro, independentemente do consentimento do devedor, a totalidade ou parte do seu crédito". Trata-se de negócio jurídico bilateral entre Cedente e Cessionário que transfere a titularidade do polo ativo.
    </div>

    <div class="meta" style="margin-bottom: 1rem;">
      <span style="background: var(--p-500); color:white; padding: 4px 8px; border-radius: 4px;">⚖️ Fundamentação Legal: Arts. 286 a 298 do Código Civil</span>
    </div>

    <p>Na cessão de crédito, temos os seguintes protagonistas e dinâmicas:</p>
    <ul>
      <li><strong>Cedente:</strong> O credor original que transfere o seu crédito.</li>
      <li><strong>Cessionário:</strong> O terceiro que adquire o crédito e sub-roga-se nos direitos do cedente.</li>
      <li><strong>Cedido:</strong> O devedor. Ele não participa ativamente do negócio de transferência.</li>
    </ul>

    <div class="professor-focus">
      <div class="focus-label">🎯 Atenção à Terminologia (Profª. Giovanna)</div>
      No Direito, cuidado máximo com os termos: "Alienação" envolve a transmissão de coisas corpóreas (vender um carro). Já o vocábulo "Cessão" implica transferência (onerosa ou gratuita) de bens imateriais, intangíveis. Nós alienamos imóveis, mas cedemos créditos ou direitos autorais!
    </div>

    <h3>Consentimento e Notificação (A Pegadinha Clássica)</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Aspecto</th>
            <th>Regra na Cessão de Crédito</th>
            <th>Por quê?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Consentimento do Devedor</strong></td>
            <td><strong>NÃO É NECESSÁRIO</strong> para a validade do negócio.</td>
            <td>A modificação da pessoa do credor não acarreta prejuízo ao devedor. Ele deve R$1000, não importa se vai pagar para 'A' ou para 'B'. O legislador deu primazia à livre circulação de riquezas e disposição do crédito.</td>
          </tr>
          <tr>
            <td><strong>Notificação do Devedor</strong></td>
            <td><strong>É OBRIGATÓRIA</strong> para ter eficácia contra o devedor (Art. 290, CC).</td>
            <td>Se o devedor não souber da cessão e pagar ao credor original (cedente), ele pagou bem e a dívida estará extinta para ele (o cessionário que cobre do cedente).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="exam-tip">
      <strong>⚠️ PEGADINHA DE CONCURSO:</strong> As bancas afirmam que "A cessão de crédito exige o consentimento do devedor sob pena de nulidade do negócio". <strong>FALSO!</strong> O consentimento é irrelevante. O que a lei exige é a <em>notificação</em> para fins de eficácia. A própria citação do devedor na ação de cobrança movida pelo cessionário já serve como notificação!
    </div>

    <h3>Abrangência e Natureza</h3>
    <p>A cessão abrange não só o valor principal, mas todos os acessórios (juros, multas, garantias, cláusula penal), conforme art. 287 do CC. Pode ser gratuita (sujeita às regras da doação) ou onerosa (sujeita às regras da compra e venda).</p>

  </section>

  <section id="assuncao-divida" class="reveal">
    <h3>Assunção de Dívida</h3>
    
    <div class="layer-tech">
      <strong>Definição:</strong> É o negócio jurídico de transmissão singular de um débito pelo qual um terceiro (assuntor) ingressa na relação obrigacional, assumindo a posição do devedor originário, mantendo-se intacta a relação jurídica base. Só ocorre com a <strong>anuência expressa do credor</strong>.
    </div>

    <div class="meta" style="margin-bottom: 1rem;">
      <span style="background: var(--p-500); color:white; padding: 4px 8px; border-radius: 4px;">⚖️ Fundamentação Legal: Arts. 299 a 303 do Código Civil</span>
    </div>

    <p>Aqui o polo passivo é alterado. O antigo devedor quer sair da jogada e passar a dívida para um terceiro (assuntor).</p>

    <div class="professor-focus">
      <div class="focus-label">🎯 Condição Crítica (Profª. Giovanna)</div>
      Na cessão de crédito, o consentimento do devedor era dispensável porque para ele não importa a quem ele deve pagar. Mas na assunção de dívida, a situação inverte: a identidade do devedor é FATOR FUNDAMENTAL para a segurança do credor (solvabilidade, patrimônio garantidor). Você emprestaria dinheiro para o Elon Musk sabendo que amanhã ele transferiria a dívida para alguém desempregado sem patrimônio? Por isso, é <strong>imprescindível o consentimento do credor</strong> (Art. 299, CC). O silêncio do credor importa RECUSA (art. 299, parágrafo único).
    </div>

    <h3>Espécies de Assunção de Dívida</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Espécie</th>
            <th>Consequência para o Devedor Original</th>
            <th>Previsão Legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Liberatória (Privativa / Exclusiva)</strong></td>
            <td>Fica completamente <strong>liberado</strong> e sai da relação obrigacional. O assuntor assume sozinho o BO.</td>
            <td>Prevista expressamente no Art. 299 do CC. É a regra.</td>
          </tr>
          <tr>
            <td><strong>Cumulativa</strong></td>
            <td>O devedor original <strong>permanece</strong> na relação junto com o assuntor (novo devedor). Ambos respondem perante o credor (solidariedade). Há um reforço na garantia.</td>
            <td>Não está expressa na lei, mas é aceita pelo Enunciado 16 do CJF com base na autonomia privada.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="exam-tip">
      <strong>⚠️ ERRO COMUM DO ALUNO:</strong> Achar que Assunção de Dívida e Novação Passiva são a mesma coisa. Não são!
      Na <strong>Novação</strong>, a obrigação velha MORRE, suas garantias e acessórios são extintos (salvo acordo), e nasce uma NOVA dívida com novo devedor.
      Na <strong>Assunção de Dívida</strong>, a obrigação VELHA CONTINUA VIVA, apenas mudando a roupagem do devedor, conservando-se todos os acessórios e prazos de prescrição.
    </div>

    <div class="quadro-prof">
      <div class="qp-definicao">Resumo Supremo: Comparação Transmissão</div>
      <div class="qp-cols">
        <div class="qp-col">
          <h4>CESSÃO DE CRÉDITO</h4>
          <ol>
            <li>Substituição no Polo Ativo</li>
            <li>Consentimento do Cedido: <strong>Dispensável</strong></li>
            <li>Notificação do Cedido: Obrigatória (para eficácia)</li>
            <li>Silêncio na Notificação: N/A (ele não aprova)</li>
          </ol>
        </div>
        <div class="qp-col">
          <h4>ASSUNÇÃO DE DÍVIDA</h4>
          <ol>
            <li>Substituição no Polo Passivo</li>
            <li>Consentimento do Credor: <strong>Indispensável</strong></li>
            <li>Notificação: É um pedido de anuência</li>
            <li>Silêncio do Credor: Significa <strong>RECUSA</strong></li>
          </ol>
        </div>
      </div>
    </div>
  </section>

"""

target_marker = "  <!-- ============================== -->\n  <!-- 1. TEORIA GERAL DA EXTINÇÃO -->"
if target_marker in content:
    content = content.replace(target_marker, new_html + target_marker)
else:
    print("Error: Could not find target marker to inject HTML.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated extincao-obrigacao-responsabilidade.html successfully.")
