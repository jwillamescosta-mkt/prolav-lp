import water from "@/assets/media/problema-agua-suja.mp4.asset.json";
import waterPoster from "@/assets/media/problema-agua-suja-poster.webp.asset.json";
import family from "@/assets/media/persona-familia.mp4.asset.json";
import familyPoster from "@/assets/media/persona-familia-poster.webp.asset.json";
import pet from "@/assets/media/persona-pet.mp4.asset.json";
import petPoster from "@/assets/media/persona-pet-poster.webp.asset.json";
import stains from "@/assets/media/persona-manchas.mp4.asset.json";
import stainsPoster from "@/assets/media/persona-manchas-poster.webp.asset.json";
import office from "@/assets/media/persona-empresa.mp4.asset.json";
import officePoster from "@/assets/media/persona-empresa-poster.webp.asset.json";

export const proofMedia = { src: water.url, poster: waterPoster.url };
export const personaMedia = {
  familia: { src: family.url, poster: familyPoster.url }, pet: { src: pet.url, poster: petPoster.url },
  manchas: { src: stains.url, poster: stainsPoster.url }, empresa: { src: office.url, poster: officePoster.url },
};