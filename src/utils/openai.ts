import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const generateMessageVariants = async (objective: string) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a marketing copywriter. Generate concise SMS messages.'
      },
      {
        role: 'user',
        content: `Generate three SMS variants for: ${objective}`
      }
    ]
  });
  const text = completion.choices[0].message.content || '';
  return text.split(/\n+/).filter((v) => v.trim()).slice(0, 3);
};

export const nlToRules = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Convert marketing audience description into JSON rules.' },
      { role: 'user', content: prompt }
    ]
  });
  try {
    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch {
    return {};
  }
};
