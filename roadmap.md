# Etapa 2 — PROLAV
- [x] Incorporar vídeos com reprodução apenas em tela e respeito a movimento reduzido.
- [x] Criar raio-X fixado no desktop e sequência leve no celular.
- [x] Criar cards de personas com mensagens específicas no WhatsApp.
- [x] Criar diagnóstico, regras de prioridade, eventos e testes.
- [x] Validar desktop, celular e navegação ao WhatsApp; manter Etapa 1.
# Etapa 3 — PROLAV (feita fora do Lovable)
- [x] Redesenho editorial "laboratório têxtil": Inter Tight + Instrument Serif + JetBrains Mono, papel/navy, hairlines; sem pílulas, brilhos e vidro.
- [x] Hero em duas colunas com vídeo real de extração; faixa de provas com fatos do playbook.
- [x] Método em 4 passos com vídeo fixo que troca na rolagem (celular: vídeo por passo).
- [x] Teste da gota em three.js (sem blindagem mancha × com blindagem perolada), interativo, montado só quando visível.
- [x] Prova real (gotas e vinho), segurança da blindagem, comparação informal × PROLAV e CTA de WhatsApp.
- [ ] Confirmar autorização de uso de imagem do depoimento e da clínica.

# Etapa 4 — PROLAV (resultados reais + acessibilidade)
- [x] Linha do tempo arrastável antes → durante → depois em vídeos reais (sem legendas embutidas), mobile first.
- [x] Lógica de capítulos em módulo puro testado (src/lib/chapters.ts).
- [x] WCAG: botão de pausar em todo vídeo automático (2.2.2), atalho "pular para o conteúdo" (2.4.1), foco visível (2.4.7), contraste AA nos textos de apoio, alternativa por botão ao clique no canvas 3D (2.1.1), alvos de toque ≥ 44px.

# Correção — vídeos travando
- [x] Coordenador único de vídeos: pré-carrega 1 tela antes, toca só os mais visíveis (1 no celular, 2–3 no desktop), zero em economia de dados.
- [x] Cena 3D do hero para de renderizar fora da tela; vídeo do método não é recriado a cada passo.
- [x] Recodificação H.264 Main 3.1, 1 quadro-chave/s, taxa limitada; vídeos da etapa 2 servidos de /public/media.
- [x] Linha do tempo sem re-render a cada quadro; grão sem mix-blend-mode.

# Etapa 5 — otimização de conversão
- [x] Fechamento: dúvidas (objeções), área atendida, CTA final e rodapé; dados estruturados LocalBusiness + FAQPage.
- [x] Hero: título e CTA no HTML do servidor (sem animação), vídeo real também no celular, sem three.js no celular.
- [x] WhatsApp: abre na mesma aba se a nova for bloqueada (navegador do Instagram); captura gclid/fbclid; botão flutuante com rótulo.
- [ ] Pendências do cliente: número real do WhatsApp, IDs de GTM/Pixel + consentimento LGPD, og:image, depoimentos e garantia.
