
import { GoogleGenAI, Type } from "@google/genai";
import { Job, CandidateProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateJobDescription(title: string, companyType: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Gere uma descrição curta e atraente para uma vaga de ${title} em um(a) ${companyType}. Foque em simplicidade para o comércio local. Máximo 150 caracteres.`,
      });
      return response.text || "Descrição não disponível.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Erro ao gerar descrição automática.";
    }
  }

  async generateMatchAlert(profile: CandidateProfile, job: Job): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `O candidato ${profile.name} tem habilidades em ${profile.skills.join(', ')}. Uma vaga de ${job.title} apareceu na ${job.company}. Escreva uma frase curta e empolgante notificando o candidato sobre esse match ideal. Use tom humano e direto. Máximo 100 caracteres.`,
      });
      return response.text || `Nova vaga de ${job.title} combina com seu perfil!`;
    } catch (error) {
      return `Vaga de ${job.title} encontrada perto de você!`;
    }
  }

  async getAiRecommendations(candidateExp: string, jobs: Job[]): Promise<string[]> {
    try {
      const jobSummaries = jobs.map(j => `${j.id}: ${j.title} na ${j.company}`).join('\n');
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Com base na experiência: "${candidateExp}", quais destes IDs de vagas são os 2 melhores matches? Retorne apenas os IDs separados por vírgula.\n\n${jobSummaries}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recommendedIds: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["recommendedIds"]
            }
        }
      });
      const data = JSON.parse(response.text || '{"recommendedIds": []}');
      return data.recommendedIds;
    } catch (error) {
      console.error("Gemini Match Error:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
