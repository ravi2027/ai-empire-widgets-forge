
interface AIServiceConfig {
  apiKey?: string;
  baseURL?: string;
  model?: string;
}

interface EnhancementRequest {
  text: string;
  mode: 'professional' | 'casual' | 'concise' | 'creative';
  maxTokens?: number;
}

interface AIResponse {
  enhancedText: string;
  confidence: number;
  suggestions?: string[];
}

export class AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.openai.com/v1',
      model: config.model || 'gpt-4',
      ...config
    };
  }

  async enhanceText(request: EnhancementRequest): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('AI service not configured. Please provide an API key.');
    }

    const prompt = this.buildPrompt(request.text, request.mode);

    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional writing assistant. Enhance the given text according to the specified tone while maintaining the original meaning.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: request.maxTokens || 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      const data = await response.json();
      const enhancedText = data.choices[0]?.message?.content || request.text;

      return {
        enhancedText: enhancedText.trim(),
        confidence: 0.95,
        suggestions: []
      };
    } catch (error) {
      console.error('AI enhancement failed:', error);
      throw error;
    }
  }

  async checkGrammar(text: string): Promise<Array<{
    original: string;
    suggestion: string;
    position: { start: number; end: number };
    type: 'grammar' | 'spelling' | 'style';
  }>> {
    // Mock implementation for demo
    return [
      {
        original: 'your',
        suggestion: "you're",
        position: { start: 0, end: 4 },
        type: 'grammar'
      }
    ];
  }

  private buildPrompt(text: string, mode: string): string {
    const prompts = {
      professional: `Rewrite the following text to be more professional and formal while maintaining the core message: "${text}"`,
      casual: `Rewrite the following text to be more casual and conversational while maintaining the core message: "${text}"`,
      concise: `Rewrite the following text to be more concise and direct while maintaining all key information: "${text}"`,
      creative: `Rewrite the following text to be more creative and engaging while maintaining the core message: "${text}"`
    };

    return prompts[mode as keyof typeof prompts] || prompts.professional;
  }

  updateConfig(newConfig: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

export const aiService = new AIService();
