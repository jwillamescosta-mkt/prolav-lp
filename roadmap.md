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

# Etapa 6 — Landing de tráfego pago (/orcamento)
- [x] Nova rota /orcamento, separada da página principal (que segue em /), com noindex.
- [x] Hero em tela cheia com vídeo real (vertical no celular, recorte 16:9 no desktop), título curto e um CTA de WhatsApp.
- [x] Antes e depois em fotos reais (Drive › PROLAV/Fotos/antes e depois): 5 móveis conferidos foto a foto, recorte 3:2 sem alterar cor, porta-retratos do cliente desfocados; teste impede misturar pares.
- [x] Resultados em duas galerias horizontais (deslize no celular, setas e bordas esmaecidas no desktop): fotos antes/depois e 6 vídeos "Em ação" (2 novos do Drive: IMG_5940 e IMG_5944, cortado em 10 s).
- [ ] Vídeos do Drive acima de 10 MB (IMG_5933, 5941, 5942, 5943, 5950, 3195, 3207) não puderam ser baixados pelo conector; IMG_5951 ficou de fora por mostrar a marca de outra empresa.
- [x] Hero com a frase da marca "Seu conforto tratado com excelência."
- [x] Provas, 4 serviços com mensagem própria no WhatsApp, 4 dúvidas e CTA final.
- [ ] Confirmar autorização de imagem do vídeo da hero e das fotos de antes e depois.
- [ ] Fotos sem par usadas: nenhuma. Close-ups IMG_5957 (antes) e IMG_5959 (depois) ficaram de fora: não dá para provar que são a mesma cadeira.

# Etapa 7 — Otimização da landing /orcamento (auditoria Lighthouse + axe)
- [x] Fontes servidas pelo próprio site (@fontsource) em vez do Google Fonts; pré-carga das 2 fontes do título.
- [x] Vídeo da hero só depois do load + ocioso; capa via <picture> (certa já no HTML); sem vídeo em conexão lenta/economia de dados.
- [x] Antes e depois: só a foto visível é baixada até o card se aproximar; variante de 480 px para celular.
- [x] Dúvidas em <details> nativo (−58 KB de JS nesta página).
- [x] Botão flutuante escondido enquanto o CTA da hero está na tela; nome acessível igual ao texto visível.
- [x] "Como funciona" em 3 passos no lugar dos números repetidos; cabeçalho de resultados mais enxuto.
- [x] Imagem de compartilhamento 1200×630 (og:image) com porta-retratos do cliente desfocados.
- [x] Resultado (celular, 4G simulado, com compressão): desempenho 88 → 94; LCP 3,6 s → 2,9 s; FCP 2,1 s → 1,8 s; axe sem violações.
- [ ] Antes de anunciar: número real do WhatsApp (src/data/content.ts), IDs de Meta Pixel/GTM + política de privacidade (LGPD).
