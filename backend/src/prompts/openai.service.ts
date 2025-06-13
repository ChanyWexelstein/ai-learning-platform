import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askOpenAI(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error: any) {
    console.error('OpenAI error:', error?.message || error);
    throw new Error('Failed to get response from OpenAI');
  }
}
