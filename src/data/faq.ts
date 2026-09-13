// Cópia de simplecote-front/src/admin/ajuda/faq.ts — manter em sincronia manualmente.

export interface FaqItem {
  pergunta: string
  resposta: string
  /** ID do vídeo do YouTube (a preencher quando os tutoriais forem gravados). */
  videoUrl?: string
}

export const PERGUNTAS_FREQUENTES: FaqItem[] = [
  {
    pergunta: 'Como criar uma nova cotação?',
    resposta:
      'No menu lateral, acesse Cotações e clique em "Nova cotação". Preencha o título e as informações da cotação e clique em Criar. Depois, adicione os itens (produtos) que farão parte da cotação.',
  },
  {
    pergunta: 'Como convidar representantes?',
    resposta:
      'Abra o detalhe da cotação e clique em "Representantes". Selecione as empresas que deseja convidar e clique em Convidar. Os representantes recebem o convite por e-mail com o link de acesso.',
  },
  {
    pergunta: 'Como apurar uma cotação e gerar pedidos?',
    resposta:
      'Encerre a cotação para impedir novas respostas e clique em Apurar para definir os vencedores de cada item. Revise o resultado e envie os pedidos aos vencedores.',
  },
  {
    pergunta: 'Como cancelar uma cotação?',
    resposta:
      'Abra o detalhe da cotação e clique em Cancelar. Confirme a ação no diálogo, pois o cancelamento é irreversível e nenhum pedido será gerado.',
  },
]
