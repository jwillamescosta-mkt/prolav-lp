// Vídeos da etapa 2. Servidos de /public/media (mesma origem da página): recodificados em
// H.264 Main 3.1, 1 quadro-chave/s e taxa limitada — decodificação leve em qualquer celular.
// (As cópias antigas continuam em src/assets/media/*.asset.json como referência no CDN.)
const m = (name: string) => ({ src: `/media/${name}.mp4`, poster: `/media/${name}.webp` });

export const proofMedia = m("problema-agua-suja");
export const personaMedia = {
  familia: m("persona-familia"),
  pet: m("persona-pet"),
  manchas: m("persona-manchas"),
  empresa: m("persona-empresa"),
};
