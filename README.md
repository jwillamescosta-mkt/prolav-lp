# Prolav Lp

Crie a ETAPA 1 (Hero imersivo + base do projeto) de uma landing page de altíssima conversão para a PROLAV – Higienização & Blindagem de Estofados, Maceió/AL. Idioma: português do Brasil. Stack: React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion + three.js via @react-three/fiber e @react-three/drei.

PÚBLICO: classes A e B de Maceió (Ponta Verde, Pajuçara, Jatiúca, Farol...), donos de pets, famílias com crianças/alérgicos, escritórios e donos de lanchas. Tom: premium, confiável, direto.

DESIGN TOKENS (defina em index.css/tailwind): azul marinho #0B1E36 (fundo/autoridade), ciano #06B6D4 e #0EA5E9 (frescor/tecnologia), branco gelo #F8FAFC, cinza escuro #1E293B, CTA dourado #D98E3A, verde WhatsApp #25D366 só nos botões de contato. Fontes: Plus Jakarta Sans (títulos), Inter (corpo), JetBrains Mono (números/valores).

ETAPA 1 – ENTREGAR:
1. Header fixo translúcido com wordmark SVG provisório "PROLAV" (componente <Logo /> isolado para eu trocar depois pelo logo vetorizado) e botão "Orçar no WhatsApp".
2. HERO full-screen com cena three.js em canvas de fundo: partículas/bolhas de espuma e gotas em ciano flutuando com profundidade, reagindo suavemente ao mouse (hover/parallax) e ao scroll (câmera avança levemente). Em mobile reduzir contagem de partículas, desligar efeitos pesados e respeitar prefers-reduced-motion. Lazy-load do canvas para não prejudicar LCP; o texto do hero deve renderizar imediatamente, sem esperar o three.js.
3. COPY do hero (use exatamente):
 - Selo: "Higienização & Blindagem de Estofados • Maceió"
 - H1: "Seu sofá parece limpo. Mas é lá dentro que mora o problema."
 - Subtítulo: "Extração profunda elimina ácaros, fungos e odores que a aspiração não alcança. A blindagem têxtil protege contra manchas e líquidos por muito mais tempo. Seu estofado limpo de verdade, sua família respirando melhor."
 - CTA primário (verde WhatsApp): "Quero meu orçamento grátis no WhatsApp"
 - CTA secundário (texto): "Ver como funciona ↓"
 - Microprova abaixo do CTA: "Resposta em minutos • Técnicos uniformizados • Pontualidade garantida"
4. Barra de 3 provas rápidas (contadores animados ao entrar na tela, fonte mono): "+500 estofados higienizados", "100% produtos certificados", "Garantia de satisfação". (Números provisórios, deixe em um arquivo src/data/content.ts fácil de editar.)
5. Botão flutuante de WhatsApp em todas as páginas com rastreamento de UTM: capturar utm_source/medium/campaign/content/term da URL, salvar em sessionStorage e anexar ao texto da mensagem; ao clicar, disparar window.dataLayer.push({event:'Contact'}) e {event:'Lead'} e fbq('track','Lead') se existir. Número em constante única (placeholder 5582999999999) em src/data/content.ts.
6. Preparar no index.html os snippets comentados de Google Tag Manager e Meta Pixel (IDs placeholder).
7. Indicador de scroll animado no fim do hero e transição suave para uma seção placeholder "Etapa 2" (vazia, só id="problema").
8. Acessibilidade e performance: contraste AA, alt/aria, fontes com display swap, sem layout shift, código modular e comentado em português.

Não crie as demais seções ainda; vamos iterar por etapas. Deixe os componentes preparados para receber fotos e vídeos reais de antes/depois nas próximas etapas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/90d0d056-8583-472c-930d-fcc95e381c62).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
