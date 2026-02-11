// Dados oficiais da cooperativa - Ano Base 2025

export type ItemValor = {
  nome: string;
  valor: number;
  tipo?: string;
  destaque?: boolean;
};

export const DADOS_COOPERATIVA = {
  periodo: {
    inicio: "01/01/2025",
    fim: "31/12/2025",
    anoBase: 2025,
  },

  receitaOperacionalBruta: 11026304.46,

  receitasPorBeneficiário: [
    { nome: "INSTITUTO SINAI SERVICOS MEDICOS LTDA", valor: 3470064.11 },
    { nome: "INSTITUTO SINAI SERVICOS MEDICOS S.A.", valor: 2783316.9 },
    { nome: "HOSPITAL BOM JESUS LTDA", valor: 1099862.75 },
    { nome: "UNIMED VILHENA COOPERATIVA DE TRABALHO MEDICO", valor: 1080711.63 },
    { nome: "HOSPITAL DE URGENCIA DE PALMAS LTDA", valor: 673445.0 },
    { nome: "UNIMED PALMAS COOPERATIVA DE TRABALHO MEDICO", valor: 583143.09 },
    { nome: "VIVENTI HOME CARE HOSPITAL DOMICILIAR LTDA", valor: 295450.92 },
    { nome: "INSTITUTO DE TERAPIA INTENSIVA DE PALMAS LTDA", valor: 136209.0 },
    { nome: "HOSPITAL SAO LUCAS DE ARAGUAINA LTDA", valor: 104408.39 },
    { nome: "SENAR AR/TO", valor: 65150.0 },
    { nome: "MEDICAL VET LTDA", valor: 179.68 },
    { nome: "CLINICA LONGEVIE SERVICOS DE MEDICINA E ODONTOLOGIA LTDA", valor: 145.0 },
  ] as ItemValor[],

  impostosIncidencias: {
    items: [
      { nome: "ISS", valor: 132351.48, tipo: "imposto" },
      { nome: "PIS", valor: 9879.22, tipo: "imposto" },
      { nome: "COFINS", valor: 45596.25, tipo: "imposto" },
      { nome: "Despesas financeiras (IOF, juros, multas)", valor: 34000.36, tipo: "financeiro" },
      { nome: "Despesas tributárias (IPTU, JUCETINS, alvará)", valor: 7700.1, tipo: "tributario" },
    ] as ItemValor[],
    total: 229527.41,
  },

  custosAtosCooperados: {
    items: [
      { nome: "Repasse aos cooperados", valor: 10022322.78, destaque: true },
      { nome: "Serviços PJ (treinamentos, assessorias etc.)", valor: 162725.56 },
      { nome: "Alimentação", valor: 122764.83 },
      { nome: "Seguro de vida", valor: 45595.25 },
      { nome: "Uniformes e EPIs", valor: 9495.9 },
    ] as ItemValor[],
    total: 10362904.32,
  },

  despesasAdministrativas: {
    items: [
      { nome: "Administrativas", valor: 391920.06 },
      { nome: "Pessoal", valor: 198362.01 },
      { nome: "Eventos", valor: 25400.79 },
      { nome: "Assistência médica", valor: 5745.0 },
    ] as ItemValor[],
    total: 621427.86,
  },

  resultadoReservas: {
    perdasAntesIRPJ: 21981.99,
    fundoReserva: { percentual: 15, valor: 3297.3 },
    fates: { percentual: 5, valor: 1099.1 },
    perdasPeriodo: 20882.89,
    inconsistencia: {
      existe: true,
      descricao: "Referência a período 2026 encontrada nos dados de 2025",
      severidade: "media",
    },
  },
};

export const GLOSSARIO = [
  {
    termo: "Receita Operacional Bruta",
    definicao:
      "Total de valores recebidos pela cooperativa pela prestação de serviços, antes de qualquer dedução.",
  },
  {
    termo: "ISS",
    definicao:
      "Imposto Sobre Serviços - tributo municipal incidente sobre a prestação de serviços.",
  },
  {
    termo: "PIS",
    definicao:
      "Programa de Integração Social - contribuição social destinada ao financiamento do seguro-desemprego e abono salarial.",
  },
  {
    termo: "COFINS",
    definicao:
      "Contribuição para o Financiamento da Seguridade Social - tributo federal sobre o faturamento das empresas.",
  },
  {
    termo: "Atos Cooperados",
    definicao:
      "Operações realizadas entre a cooperativa e seus cooperados, que constituem a atividade principal da organização.",
  },
  {
    termo: "Repasse aos Cooperados",
    definicao:
      "Valores distribuídos aos profissionais cooperados pelos serviços prestados através da cooperativa.",
  },
  {
    termo: "FATES",
    definicao:
      "Fundo de Assistência Técnica, Educacional e Social - reserva obrigatória destinada a programas de assistência aos cooperados.",
  },
  {
    termo: "Fundo de Reserva",
    definicao:
      "Reserva legal destinada a cobrir possíveis perdas e ao desenvolvimento das atividades da cooperativa.",
  },
  {
    termo: "IOF",
    definicao:
      "Imposto sobre Operações Financeiras - tributo federal incidente sobre operações de crédito, câmbio e seguros.",
  },
  {
    termo: "JUCETINS",
    definicao:
      "Junta Comercial do Estado do Tocantins - órgão responsável pelo registro de empresas no estado.",
  },
  {
    termo: "EPIs",
    definicao:
      "Equipamentos de Proteção Individual - itens de segurança obrigatórios para profissionais da saúde.",
  },
];

// =======================
// Funções utilitárias
// =======================

export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

/**
 * Percentual fiel à planilha:
 * - Usa pt-BR (vírgula decimal)
 * - Default: 2 casas decimais (0,00%)
 * - Protege contra total = 0
 *
 * Exemplos:
 *  - 145 / 11026304,46 => 0,0013% => "0,00%"
 *  - 179,68 / 11026304,46 => 0,0016% => "0,00%"
 *  - 295450,92 / 11026304,46 => 2,68% => "2,68%"
 */
export const formatarPercentual = (valor: number, total: number, casas: number = 2) => {
  if (!Number.isFinite(valor) || !Number.isFinite(total) || total <= 0) {
    return (0).toFixed(casas).replace(".", ",") + "%";
  }

  const pct = (valor / total) * 100;

  // ✅ Corrige os casos "0,00%" que na verdade são > 0
  // Ex.: 145 / 11.026.304,46 = 0,0013%  => "< 0,01%"
  if (pct > 0 && pct < 0.01) {
    return "< 0,01%";
  }

  return pct.toFixed(casas).replace(".", ",") + "%";
};


/**
 * Totais usados no WaterfallChart etc.
 * Aqui permanecem os totais oficiais que você definiu (planilha).
 */
export const calcularTotais = () => {
  const dados = DADOS_COOPERATIVA;
  return {
    receita: dados.receitaOperacionalBruta,
    impostos: dados.impostosIncidencias.total,
    custos: dados.custosAtosCooperados.total,
    despesas: dados.despesasAdministrativas.total,
    resultado: dados.resultadoReservas.perdasPeriodo,
  };
};
