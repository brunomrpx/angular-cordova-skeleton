export enum RESUMO_VISITA {
  REALIZADA_COM_DECISOR,
  RESPONSAVEL_AUSENTE,
  EC_CANCELOU_ENTREGANDO_POS,
  CADASTRO_INCORRETO,
  ENCERROU_ATIVIDADES,
  ENDERECO_RESIDENCIAL
};

export const  RESUMO_VISITA_OPCOES = {
  [RESUMO_VISITA.REALIZADA_COM_DECISOR]: {
    label: 'Visita realizada com decisor'
  },
  [RESUMO_VISITA.RESPONSAVEL_AUSENTE]: {
    label: 'Responsável ausente'
  },
  [RESUMO_VISITA.EC_CANCELOU_ENTREGANDO_POS]: {
    label: 'EC cancelou com a GET (Entregando POS)'
  },
  [RESUMO_VISITA.CADASTRO_INCORRETO]: {
    label: 'Cadastro incorreto'
  },
  [RESUMO_VISITA.ENCERROU_ATIVIDADES]: {
    label: 'Estabelecimento encerrou as atividades'
  },
  [RESUMO_VISITA.ENDERECO_RESIDENCIAL]: {
    label: 'Endereço residencial'
  }
};
