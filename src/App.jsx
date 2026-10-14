import { useState, useEffect } from "react";

import "./App.css";

import logo from "./assets/gdwpark-logo.png";



function App() {

  const whatsapp = "5511998967873";



  // Horários da unidade principal exibidos no destaque inicial
  const horariosFuncionamento = {
    segunda: { abertura: 7, fechamento: 19 },
    terca: { abertura: 7, fechamento: 19 },
    quarta: { abertura: 7, fechamento: 19 },
    quinta: { abertura: 7, fechamento: 19 },
    sexta: { abertura: 7, fechamento: 19 },
    sabado: { abertura: 8, fechamento: 17 },
    domingo: null,
  };

  // Informações e horários independentes de cada unidade
  const unidades = [
    {
      nome: "Jardim Paulista",
      endereco: "Rua Estados Unidos, 43",
      complemento: "Jardim Paulista, São Paulo - SP",
      cep: "01427-000",
      horarios: {
        segunda: { abertura: 7, fechamento: 19 },
        terca: { abertura: 7, fechamento: 19 },
        quarta: { abertura: 7, fechamento: 19 },
        quinta: { abertura: 7, fechamento: 19 },
        sexta: { abertura: 7, fechamento: 19 },
        sabado: { abertura: 8, fechamento: 17 },
        domingo: null,
      },
      maps: "https://www.google.com/maps/search/?api=1&query=Rua+Estados+Unidos+43+Jardim+Paulista+Sao+Paulo",
    },
    {
      nome: "Vila Mariana",
      endereco: "Av. Conselheiro Rodrigues Alves, 601",
      complemento: "Vila Mariana, São Paulo - SP",
      cep: "04014-011",
      horarios: {
        segunda: { abertura: 7, fechamento: 19 },
        terca: { abertura: 7, fechamento: 19 },
        quarta: { abertura: 7, fechamento: 19 },
        quinta: { abertura: 7, fechamento: 19 },
        sexta: { abertura: 7, fechamento: 19 },
        sabado: { abertura: 9, fechamento: 17 },
        domingo: null,
      },
      maps: "https://www.google.com/maps/search/?api=1&query=Avenida+Conselheiro+Rodrigues+Alves+601+Sao+Paulo",
    },
    {
      nome: "Bom Retiro",
      endereco: "Rua Anhaia, 807",
      complemento: "Bom Retiro, São Paulo - SP",
      cep: "01130-000",
      horarios: {
        segunda: { abertura: 7, fechamento: 19 },
        terca: { abertura: 7, fechamento: 19 },
        quarta: { abertura: 7, fechamento: 19 },
        quinta: { abertura: 7, fechamento: 19 },
        sexta: { abertura: 7, fechamento: 19 },
        sabado: { abertura: 9, fechamento: 17 },
        domingo: null,
      },
      maps: "https://www.google.com/maps/search/?api=1&query=Rua+Anhaia+807+Bom+Retiro+Sao+Paulo",
    },
  ];



  // Descobre o dia da semana

  const getDiaSemana = (data = new Date()) => {

    const dias = [

      "domingo",

      "segunda",

      "terca",

      "quarta",

      "quinta",

      "sexta",

      "sabado",

    ];



    return dias[data.getDay()];

  };



  // Verifica se o estacionamento está aberto

  const verificarFuncionamento = () => {

    const agora = new Date();

    const dia = getDiaSemana(agora);

    const horario = horariosFuncionamento[dia];



    if (!horario) {

      return {

        aberto: false,

        mensagem: "Fechado hoje",

      };

    }



    const horaAtual =

      agora.getHours() + agora.getMinutes() / 60;



    if (horaAtual < horario.abertura) {

      return {

        aberto: false,

        mensagem: `Abre hoje às ${String(

          horario.abertura

        ).padStart(2, "0")}:00`,

      };

    }



    if (horaAtual >= horario.fechamento) {

      return {

        aberto: false,

        mensagem: "Fechado por hoje",

      };

    }



    return {

      aberto: true,

      mensagem: `Até ${String(

        horario.fechamento

      ).padStart(2, "0")}:00`,

    };

  };



  // Calcula o status atual de uma unidade específica
  const verificarStatusUnidade = (unidade) => {
    const agora = new Date();
    const dia = getDiaSemana(agora);
    const horario = unidade.horarios[dia];

    if (!horario) {
      return { aberto: false, mensagem: "Fechado hoje" };
    }

    const horaAtual = agora.getHours() + agora.getMinutes() / 60;

    if (horaAtual < horario.abertura) {
      return {
        aberto: false,
        mensagem: `Abre hoje às ${String(horario.abertura).padStart(2, "0")}:00`,
      };
    }

    if (horaAtual >= horario.fechamento) {
      return { aberto: false, mensagem: "Fechado por hoje" };
    }

    return {
      aberto: true,
      mensagem: `Até ${String(horario.fechamento).padStart(2, "0")}:00`,
    };
  };

  const formatarHora = (hora) => `${String(hora).padStart(2, "0")}:00`;

  const [status, setStatus] = useState(
    verificarFuncionamento()
  );



  // Controla o header quando o usuário rola a página

  const [headerVisivel, setHeaderVisivel] = useState(true);



  useEffect(() => {

    let ultimaPosicao = window.scrollY;



    const controlarHeader = () => {

      const posicaoAtual = window.scrollY;



      if (posicaoAtual > ultimaPosicao && posicaoAtual > 100) {

        setHeaderVisivel(false);

      } else if (posicaoAtual < ultimaPosicao) {

        setHeaderVisivel(true);

      }



      ultimaPosicao = posicaoAtual;

    };



    window.addEventListener("scroll", controlarHeader);



    return () => {

      window.removeEventListener(

        "scroll",

        controlarHeader

      );

    };

  }, []);



  // Atualiza o status automaticamente

  useEffect(() => {

    const intervalo = setInterval(() => {

      setStatus(verificarFuncionamento());

    }, 60000);



    return () => clearInterval(intervalo);

  }, []);



  const [mostrarLavagem, setMostrarLavagem] =

    useState(false);



  const [mostrarMensalista, setMostrarMensalista] =

    useState(false);



  const [carro, setCarro] = useState("");



  const [resultado, setResultado] = useState("");



  // Dados da lavagem

  const [lavagem, setLavagem] = useState({

    nome: "",

    telefone: "",

    carro: "",

    data: "",

    horario: "",

    unidade: "",

  });



  // Dados do mensalista

  const [mensalista, setMensalista] = useState({

    nome: "",

    telefone: "",

    unidade: "",

    carro: "",

    modelo: "",

  });



  // Preços dos planos

  const precos = {

    moto: 150,

    pequeno: 250,

    medio: 300,

    grande: 350,

    van: 500,

    caminhao: 800,

  };



  // Vagas disponíveis

  const vagas = {

    moto: 8,

    pequeno: 12,

    medio: 8,

    grande: 5,

    van: 3,

    caminhao: 2,

  };



  // Consulta de disponibilidade

  function consultarVaga() {

    if (!carro) {

      setResultado(

        "Selecione o tipo do seu veículo."

      );

      return;

    }



    const valor = precos[carro];

    const quantidade = vagas[carro];



    if (quantidade > 0) {

      setResultado(

        `Temos ${quantidade} vaga(s) disponível(is). O valor mensal para este veículo é R$ ${valor},00.`

      );

    } else {

      setResultado(

        "No momento não temos vagas disponíveis para este tipo de veículo. Entre em contato pelo WhatsApp para entrar na lista de espera."

      );

    }

  }



  // Retorna o dia de uma data escolhida

  const getDiaDaData = (dataEscolhida) => {

    if (!dataEscolhida) {

      return null;

    }



    const data = new Date(

      `${dataEscolhida}T00:00:00`

    );



    return data.getDay();

  };



  // Retorna a data atual

  const getDataHoje = () => {

    const hoje = new Date();



    const ano = hoje.getFullYear();



    const mes = String(

      hoje.getMonth() + 1

    ).padStart(2, "0");



    const dia = String(

      hoje.getDate()

    ).padStart(2, "0");



    return `${ano}-${mes}-${dia}`;

  };



  // Verifica se o horário da lavagem é permitido

  const verificarHorarioLavagem = (

    dataEscolhida,

    horarioEscolhido

  ) => {

    if (!dataEscolhida || !horarioEscolhido) {

      return false;

    }



    const data = new Date(

      `${dataEscolhida}T00:00:00`

    );



    const dia = data.getDay();



    // Domingo não funciona

    if (dia === 0) {

      return false;

    }



    const [hora, minuto] =

      horarioEscolhido.split(":").map(Number);



    const horarioEmMinutos =

      hora * 60 + minuto;



    // Segunda a sexta

    if (dia >= 1 && dia <= 5) {

      return (

        horarioEmMinutos >= 480 &&

        horarioEmMinutos <= 1080

      );

    }



    // Sábado

    if (dia === 6) {

      return (

        horarioEmMinutos >= 480 &&

        horarioEmMinutos <= 840

      );

    }



    return false;

  };



  // Lista os horários disponíveis

  const getHorariosDisponiveis = () => {

    if (!lavagem.data) {

      return [];

    }



    const dia = getDiaDaData(lavagem.data);



    // Domingo

    if (dia === 0) {

      return [];

    }



    const horarios = [

      "08:00",

      "09:00",

      "10:00",

      "11:00",

      "12:00",

      "13:00",

      "14:00",

      "15:00",

      "16:00",

      "17:00",

      "18:00",

    ];



    // Sábado até 14:00

    if (dia === 6) {

      return horarios.filter(

        (horario) => horario <= "14:00"

      );

    }



    // Segunda a sexta até 18:00

    return horarios.filter(

      (horario) => horario <= "18:00"

    );

  };



  // Envia o agendamento da lavagem

  function enviarLavagem(e) {

    e.preventDefault();



    if (!lavagem.data) {

      alert("Escolha a data da lavagem.");

      return;

    }



    if (!lavagem.horario) {

      alert("Escolha o horário da lavagem.");

      return;

    }



    if (!lavagem.unidade) {

      alert("Escolha a unidade.");

      return;

    }



    const dataEscolhida = new Date(

      `${lavagem.data}T00:00:00`

    );



    // Domingo

    if (dataEscolhida.getDay() === 0) {

      alert(

        "Não realizamos lavagens aos domingos."

      );

      return;

    }



    // Verifica o horário

    if (

      !verificarHorarioLavagem(

        lavagem.data,

        lavagem.horario

      )

    ) {

      alert(

        "Esse horário não está disponível.\n\n" +

          "Segunda a sexta: até 18:00.\n" +

          "Sábado: até 14:00.\n" +

          "Domingo: fechado."

      );

      return;

    }



    // Se for hoje, não permite horário que já passou

    const hoje = getDataHoje();



    if (lavagem.data === hoje) {

      const agora = new Date();



      const horaAtual =

        agora.getHours() * 60 +

        agora.getMinutes();



      const [hora, minuto] =

        lavagem.horario.split(":").map(Number);



      const horarioEscolhido =

        hora * 60 + minuto;



      if (horarioEscolhido <= horaAtual) {

        alert(

          "Esse horário já passou. Escolha outro horário."

        );

        return;

      }

    }



    const mensagem =

      `Olá! Gostaria de agendar uma lavagem.\n\n` +

      `Nome: ${lavagem.nome}\n` +

      `Telefone: ${lavagem.telefone}\n` +

      `Carro: ${lavagem.carro}\n` +

      `Data: ${lavagem.data}\n` +

      `Horário: ${lavagem.horario}\n` +

      `Unidade: ${lavagem.unidade}`;



    window.open(

      `https://wa.me/${whatsapp}?text=${encodeURIComponent(

        mensagem

      )}`,

      "_blank"

    );

  }



  // Envia interesse no plano mensal

  function enviarMensalista(e) {

    e.preventDefault();



    if (!mensalista.unidade) {

      alert("Escolha a unidade.");

      return;

    }



    const valor = precos[mensalista.carro];



    const mensagem =

      `Olá! Tenho interesse em uma vaga de mensalista.\n\n` +

      `Nome: ${mensalista.nome}\n` +

      `Telefone: ${mensalista.telefone}\n` +

      `Carro: ${mensalista.modelo}\n` +

      `Tipo: ${{ moto: "Moto", pequeno: "Carro pequeno", medio: "Carro médio", grande: "SUV / Carro grande", van: "Van", caminhao: "Caminhão" }[mensalista.carro] || mensalista.carro}\n` +

      `Unidade: ${mensalista.unidade}\n` +

      `Valor informado: R$ ${valor},00`;



    window.open(

      `https://wa.me/${whatsapp}?text=${encodeURIComponent(

        mensagem

      )}`,

      "_blank"

    );

  }



  // Abre o WhatsApp

  function falarWhatsApp() {

    const mensagem =

      "Olá! Gostaria de saber mais informações sobre o GDW Park.";



    window.open(

      `https://wa.me/${whatsapp}?text=${encodeURIComponent(

        mensagem

      )}`,

      "_blank"

    );

  }



  return (

    <div className="site">



      {/* HEADER */}

      <header

        className={`header ${

          headerVisivel

            ? "header-visivel"

            : "header-escondido"

        }`}

      >

        <div className="logo">



          <img src={logo} alt="GDW Park" className="logo-image" />



          {/* GDW PARK MANTIDO */}

          <div className="logo-text">

            <strong>

              GDW <span>PARK</span>

            </strong>



            <small>

              ESTACIONAMENTO

            </small>

          </div>

        </div>



        <nav>

          <a href="#inicio">Início</a>

          <a href="#servicos">Serviços</a>
          <a href="#unidades">Unidades</a>

          <a href="#mensalista">

            Mensalistas

          </a>

          <a href="#lavagem">

            Lavagem

          </a>

          <a href="#contato">

            Contato

          </a>

        </nav>



        <button

          className="header-whatsapp"

          onClick={falarWhatsApp}

        >

          WhatsApp

        </button>

      </header>



      {/* HERO */}

      <section

        id="inicio"

        className="hero"

      >

        <div className="hero-content">



          <div className="tag">

            GDW PARK • ESTACIONAMENTO

          </div>



          <h1>

            Seu carro seguro,

            <span>

              enquanto você cuida do que importa.

            </span>

          </h1>



          <p>

            Estacionamento seguro, mensalistas,

            lavagem rápida e atendimento direto

            pelo WhatsApp.

          </p>



          <div className="hero-buttons">



            <button

              onClick={() =>

                setMostrarMensalista(true)

              }

            >

              Quero ser mensalista →

            </button>



            <button

              className="secondary"

              onClick={falarWhatsApp}

            >

              Falar no WhatsApp

            </button>



          </div>



          <div className="hero-info">



            <div>

              <strong>🔒</strong>

              <span>Segurança</span>

              <small>Veículo protegido</small>

            </div>



            <div>

              <strong>🧼</strong>

              <span>Lavagem</span>

              <small>Agendamento fácil</small>

            </div>



            <div>

              <strong>📱</strong>

              <span>WhatsApp</span>

              <small>Atendimento direto</small>

            </div>



          </div>

        </div>



        {/* CARD DE ACESSO ÀS UNIDADES */}
        <div className="hero-card hero-units-card">
          <div className="units-card-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <path d="M32 56s20-18.2 20-34A20 20 0 0 0 12 22c0 15.8 20 34 20 34Z" />
              <circle cx="32" cy="22" r="7" />
            </svg>
          </div>

          <span className="units-card-eyebrow">GDW PARK</span>
          <h3>Encontre sua unidade</h3>
          <p>
            Escolha a unidade mais perto de você e confira o endereço,
            os horários de funcionamento e como chegar.
          </p>

          <div className="units-card-features">
            <div>
              <span className="units-feature-icon">⌖</span>
              <span>3 unidades em São Paulo</span>
            </div>
            <div>
              <span className="units-feature-icon">◷</span>
              <span>Horários de funcionamento</span>
            </div>
          </div>

          <a className="units-card-button" href="#unidades">
            Ver unidades <span aria-hidden="true">→</span>
          </a>
          <small className="units-card-note">Encontre a melhor opção para você</small>
        </div>

      </section>



      {/* NOSSAS UNIDADES */}
      <section id="unidades" className="units-section">
        <div className="section-title">
          <span>NOSSAS UNIDADES</span>
          <h2>Encontre a GDW Park mais perto de você</h2>
          <p>Confira os horários de cada estacionamento antes de vir.</p>
        </div>

        <div className="units-grid">
          {unidades.map((unidade) => {
            const statusUnidade = verificarStatusUnidade(unidade);
            const diasUteis = unidade.horarios.segunda;
            const sabado = unidade.horarios.sabado;

            return (
              <article className="unit-card" key={unidade.nome}>
                <div className="unit-card-top">
                  <div className="unit-icon">📍</div>
                  <span className="unit-label">GDW PARK</span>
                </div>

                <h3>{unidade.nome}</h3>
                <p className="unit-address">
                  {unidade.endereco}<br />
                  {unidade.complemento}<br />
                  CEP: {unidade.cep}
                </p>

                <div className={`unit-status ${statusUnidade.aberto ? "status-aberto" : "status-fechado"}`}>
                  <span />
                  <div>
                    <strong>{statusUnidade.aberto ? "Aberto agora" : "Fechado agora"}</strong>
                    <small>{statusUnidade.mensagem}</small>
                  </div>
                </div>

                <div className="unit-hours">
                  <div>
                    <span>Segunda a sexta</span>
                    <strong>{formatarHora(diasUteis.abertura)} – {formatarHora(diasUteis.fechamento)}</strong>
                  </div>
                  <div>
                    <span>Sábado</span>
                    <strong>{formatarHora(sabado.abertura)} – {formatarHora(sabado.fechamento)}</strong>
                  </div>
                  <div>
                    <span>Domingo</span>
                    <strong className="unit-closed">Fechado</strong>
                  </div>
                </div>

                <a className="unit-map-button" href={unidade.maps} target="_blank" rel="noreferrer">
                  Ver no Google Maps <span>↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="section">

        <div className="section-title">



          <span>

            NOSSOS SERVIÇOS

          </span>



          <h2>

            Tudo para facilitar seu dia

          </h2>



          <p>

            Estacione, lave e cuide do seu

            veículo em um só lugar.

          </p>



        </div>



        <div className="services">



          <div className="service-card">



            <div className="service-icon">

              🅿️

            </div>



            <h3>

              Estacionamento

            </h3>



            <p>

              Vagas para você deixar seu

              veículo com tranquilidade.

            </p>



            <a href="#mensalista">

              Ver vagas →

            </a>



          </div>



          <div className="service-card">



            <div className="service-icon">

              🧼

            </div>



            <h3>

              Lava-rápido

            </h3>



            <p>

              Aproveite seu tempo e deixe

              seu carro limpo enquanto está

              estacionado.

            </p>



            <button

              onClick={() =>

                setMostrarLavagem(true)

              }

            >

              Agendar lavagem →

            </button>



          </div>



          <div className="service-card">



            <div className="service-icon">

              📱

            </div>



            <h3>

              Atendimento

            </h3>



            <p>

              Tire suas dúvidas e fale

              diretamente com nossa equipe.

            </p>



            <button

              onClick={falarWhatsApp}

            >

              Falar conosco →

            </button>



          </div>



        </div>

      </section>



      {/* MENSALISTA */}

      <section

        id="mensalista"

        className="monthly-section"

      >

        <div className="monthly-content">



          <span className="tag">

            PLANO MENSALISTA

          </span>



          <h2>

            Tenha sua vaga garantida

            <span>

              todos os meses.

            </span>

          </h2>



          <p>

            Consulte os valores iniciais para mensalistas e escolha o plano ideal para seu veículo.

          </p>



          <div className="monthly-plans">

            {[
              { tipo: "pequeno", nome: "Carro", preco: 250, emoji: "🚗" },
              { tipo: "moto", nome: "Moto", preco: 150, emoji: "🏍️" },
              { tipo: "van", nome: "Van", preco: 500, emoji: "🚐" },
              { tipo: "caminhao", nome: "Caminhão", preco: 800, emoji: "🚚" },
            ].map((plano) => (
              <div className="monthly-plan-card" key={plano.tipo}>
                <span className="monthly-plan-emoji">{plano.emoji}</span>
                <h3>{plano.nome}</h3>
                <span className="monthly-plan-caption">A partir de</span>
                <strong>R$ {plano.preco.toLocaleString("pt-BR")},00</strong>
                <span className="monthly-plan-period">por mês</span>
                <button
                  type="button"
                  onClick={() => {
                    setCarro(plano.tipo);
                    setResultado("");
                    document.getElementById("consulta-mensalista")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  Consultar vaga
                </button>
              </div>
            ))}

          </div>



          <div className="consult-box" id="consulta-mensalista">



            <h3>

              🔎 Consulte sua vaga

            </h3>



            <label>

              Qual é o seu veículo?

            </label>



            <select

              value={carro}

              onChange={(e) => {

                setCarro(e.target.value);

                setResultado("");

              }}

            >

              <option value="">

                Selecione o tipo

              </option>



              <option value="moto">

                Moto

              </option>



              <option value="pequeno">

                Carro pequeno

              </option>



              <option value="medio">

                Carro médio

              </option>



              <option value="grande">

                SUV / Carro grande

              </option>

              <option value="van">

                Van

              </option>

              <option value="caminhao">

                Caminhão

              </option>

            </select>



            <button

              onClick={consultarVaga}

            >

              Verificar disponibilidade

            </button>



            {resultado && (

              <div className="result">

                {resultado}

              </div>

            )}



          </div>



          <button

            className="whatsapp-button"

            onClick={() =>

              setMostrarMensalista(true)

            }

          >

            Quero ser mensalista pelo WhatsApp

          </button>



        </div>



        <div className="monthly-image">



          <div className="parking-decoration">

            🚗 🚙 🚘

          </div>



          <div className="price-card">



            <small>

              A PARTIR DE

            </small>



            <strong>

              R$ 250

            </strong>



            <span>

              / mês para carros

            </span>



          </div>



        </div>

      </section>



      {/* LAVAGEM */}

      <section

        id="lavagem"

        className="wash-section"

      >



        <div className="wash-image">

          🧽🚗

        </div>



        <div className="wash-content">



          <span className="tag">

            GDW LAVA-RÁPIDO

          </span>



          <h2>

            Enquanto você estaciona,

            <span>

              a gente cuida do seu carro.

            </span>

          </h2>



          <p>

            Aproveite seu tempo e saia com o

            carro limpo. Faça seu agendamento

            de forma rápida pelo WhatsApp.

          </p>



          <ul>

            <li>✓ Lavagem externa</li>

            <li>✓ Limpeza interna</li>

            <li>✓ Aspiração</li>

            <li>✓ Secagem completa</li>

          </ul>



          <button

            onClick={() =>

              setMostrarLavagem(true)

            }

          >

            Agendar minha lavagem

          </button>



        </div>

      </section>



      {/* DIFERENCIAIS */}

      <section className="section">



        <div className="section-title">



          <span>

            POR QUE ESCOLHER A GDW?

          </span>



          <h2>

            Seu carro em boas mãos

          </h2>



        </div>



        <div className="advantages">



          <div>

            <strong>🔒</strong>



            <h3>

              Segurança

            </h3>



            <p>

              Ambiente preparado para manter

              seu veículo protegido.

            </p>

          </div>



          <div>

            <strong>⏰</strong>



            <h3>

              Praticidade

            </h3>



            <p>

              Horários definidos para facilitar

              sua rotina.

            </p>

          </div>



          <div>

            <strong>🧼</strong>



            <h3>

              Lava-rápido

            </h3>



            <p>

              Cuide do seu carro enquanto

              ele está estacionado.

            </p>

          </div>



          <div>

            <strong>📱</strong>



            <h3>

              Atendimento

            </h3>



            <p>

              Fale diretamente com nossa

              equipe pelo WhatsApp.

            </p>

          </div>



        </div>

      </section>



      {/* CONTATO */}

      <section

        id="contato"

        className="contact-section"

      >



        <div>



          <span className="tag">

            FALE CONOSCO

          </span>



          <h2>

            Precisa de ajuda?

          </h2>



          <p>

            Nossa equipe está pronta para

            responder suas dúvidas, consultar

            vagas ou ajudar com seu agendamento.

          </p>



          <button

            onClick={falarWhatsApp}

          >

            💬 Chamar no WhatsApp

          </button>



        </div>



        <div className="contact-info">



          <div>

            <strong>

              📍 Unidades

            </strong>



            <p>

              Rua Estados Unidos, 43 -

              Jardins

            </p>

            <p>

              Av. Conselheiro Rodrigues Alves, 601 - Vila Mariana

            </p>

            <p>

              Rua Anhaia, 807 - Bom Retiro

            </p>

          </div>



          <div>

            <strong>

              🕐 Funcionamento

            </strong>



            <p>

              Segunda a sexta — 07:00 - 19:00

            </p>



            <p>Sábados: Jardim Paulista 08:00–17:00</p>
            <p>Bom Retiro 09:00–17:00</p>
            <p>Vila Mariana 09:00–17:00</p>

          </div>



          <div>

            <strong>

              📞 WhatsApp

            </strong>



            <p>

              (11) 99896-7873

            </p>

          </div>



        </div>

      </section>



      {/* FOOTER */}

      <footer>



        <div className="logo">



          <img src={logo} alt="GDW Park" className="logo-image" />



          <div className="logo-text">



            <strong>

              GDW <span>PARK</span>

            </strong>



            <small>

              ESTACIONAMENTO

            </small>



          </div>



        </div>



        <p>

          © 2026 GDW Park. Todos os direitos reservados.

        </p>



        <button

          onClick={falarWhatsApp}

        >

          WhatsApp 💬

        </button>



      </footer>



      {/* WHATSAPP FLUTUANTE */}

      <button

        className="floating-whatsapp"

        onClick={falarWhatsApp}

      >

        💬

      </button>



      {/* MODAL DE LAVAGEM */}

      {mostrarLavagem && (

        <div className="modal-background">



          <div className="modal">



            <button

              className="close"

              onClick={() => {

                setMostrarLavagem(false);



                setLavagem({

                  nome: "",

                  telefone: "",

                  carro: "",

                  data: "",

                  horario: "",

                  unidade: "",

                });

              }}

            >

              ×

            </button>



            <h2>

              Agendar lavagem 🧼

            </h2>



            <p>

              Preencha os dados e continuaremos

              pelo WhatsApp.

            </p>



            <form

              onSubmit={enviarLavagem}

            >



              {/* NOME */}

              <input

                type="text"

                placeholder="Seu nome"

                required

                value={lavagem.nome}

                onChange={(e) =>

                  setLavagem({

                    ...lavagem,

                    nome: e.target.value,

                  })

                }

              />



              {/* TELEFONE */}

              <input

                type="tel"

                placeholder="Seu telefone"

                required

                maxLength={11}

                value={lavagem.telefone}

                onChange={(e) =>

                  setLavagem({

                    ...lavagem,

                    telefone: e.target.value

                      .replace(/\D/g, "")

                      .slice(0, 11),

                  })

                }

              />



              {/* MODELO DO CARRO */}

              <input

                type="text"

                placeholder="Modelo do carro"

                required

                value={lavagem.carro}

                onChange={(e) =>

                  setLavagem({

                    ...lavagem,

                    carro: e.target.value,

                  })

                }

              />



              {/* DATA */}

              <label>

                Data da lavagem

              </label>



              <input

                type="date"

                required

                min={getDataHoje()}

                value={lavagem.data}

                onChange={(e) => {

                  setLavagem({

                    ...lavagem,

                    data: e.target.value,

                    horario: "",

                  });

                }}

              />



              {/* AVISO DE DOMINGO */}

              {lavagem.data &&

                getDiaDaData(lavagem.data) ===

                  0 && (

                  <div className="warning-message">

                    ⚠️ Lavagens não são realizadas

                    aos domingos.

                  </div>

                )}



              {/* HORÁRIO */}

              {lavagem.data &&

                getDiaDaData(lavagem.data) !==

                  0 && (

                  <>

                    <label>

                      Horário da lavagem

                    </label>



                    <select

                      required

                      value={lavagem.horario}

                      onChange={(e) =>

                        setLavagem({

                          ...lavagem,

                          horario:

                            e.target.value,

                        })

                      }

                    >

                      <option value="">

                        Escolha o horário

                      </option>



                      {getHorariosDisponiveis().map(

                        (horario) => (

                          <option

                            key={horario}

                            value={horario}

                          >

                            {horario}

                          </option>

                        )

                      )}

                    </select>



                    <small className="schedule-info">

                      Segunda a sexta: até 18:00.

                      <br />

                      Sábado: até 14:00.

                    </small>

                  </>

                )}



              {/* UNIDADE */}

              <select

                required

                value={lavagem.unidade}

                onChange={(e) =>

                  setLavagem({

                    ...lavagem,

                    unidade: e.target.value,

                  })

                }

              >

                <option value="">

                  Selecione a unidade

                </option>



                <option value="Rua Estados Unidos, 43">

                  Rua Estados Unidos, 43

                </option>



                <option value="Av. Conselheiro Rodrigues Alves, 601">

                  Av. Conselheiro Rodrigues Alves, 601

                </option>



                <option value="R. Anhaia">

                  R. Anhaia, 806/807

                </option>

              </select>



              <button type="submit">

                Continuar pelo WhatsApp

              </button>



            </form>

          </div>

        </div>

      )}



      {/* MODAL MENSALISTA */}

      {mostrarMensalista && (

        <div className="modal-background">



          <div className="modal">



            <button

              className="close"

              onClick={() => {

                setMostrarMensalista(false);



                setMensalista({

                  nome: "",

                  telefone: "",

                  unidade: "",

                  carro: "",

                  modelo: "",

                });

              }}

            >

              ×

            </button>



            <h2>

              Encontrar uma vaga 🅿️

            </h2>



            <p>

              Informe seus dados e entraremos

              em contato pelo WhatsApp.

            </p>



            <form

              onSubmit={enviarMensalista}

            >



              {/* NOME */}

              <input

                type="text"

                placeholder="Seu nome"

                required

                value={mensalista.nome}

                onChange={(e) =>

                  setMensalista({

                    ...mensalista,

                    nome: e.target.value,

                  })

                }

              />



              {/* TELEFONE */}

              <input

                type="tel"

                placeholder="Seu telefone"

                required

                maxLength={11}

                value={mensalista.telefone}

                onChange={(e) =>

                  setMensalista({

                    ...mensalista,

                    telefone: e.target.value

                      .replace(/\D/g, "")

                      .slice(0, 11),

                  })

                }

              />



              {/* MODELO DO CARRO */}

              <input

                type="text"

                placeholder="Modelo do carro"

                required

                value={mensalista.modelo}

                onChange={(e) =>

                  setMensalista({

                    ...mensalista,

                    modelo: e.target.value,

                  })

                }

              />



              {/* TIPO DO VEÍCULO */}

              <select

                required

                value={mensalista.carro}

                onChange={(e) =>

                  setMensalista({

                    ...mensalista,

                    carro: e.target.value,

                  })

                }

              >

                <option value="">

                  Tipo do veículo

                </option>



                <option value="moto">

                  Moto

                </option>



                <option value="pequeno">

                  Carro pequeno

                </option>



                <option value="medio">

                  Carro médio

                </option>



                <option value="grande">

                  SUV / Carro grande

                </option>

              </select>



              {/* UNIDADE */}

              <select

                required

                value={mensalista.unidade}

                onChange={(e) =>

                  setMensalista({

                    ...mensalista,

                    unidade: e.target.value,

                  })

                }

              >

                <option value="">

                  Selecione a unidade

                </option>



                <option value="Rua Estados Unidos, 43">

                  Rua Estados Unidos, 43

                </option>



                <option value="Av. Conselheiro Rodrigues Alves, 601">

                  Av. Conselheiro Rodrigues Alves, 601

                </option>



                <option value="R. Anhaia">

                  R. Anhaia, 806/807

                </option>

              </select>



              {/* PREÇO */}

              {mensalista.carro && (

                <div className="modal-price">

                  Mensalidade estimada:{" "}

                  <strong>

                    R$ {precos[mensalista.carro]},00

                  </strong>

                </div>

              )}



              {/* BOTÃO */}

              <button type="submit">

                Enviar pelo WhatsApp

              </button>



            </form>

          </div>

        </div>

      )}



    </div>

  );

}



export default App;