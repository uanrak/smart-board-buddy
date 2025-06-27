export async function callOpenAI(messages, functions = []) {
  const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
  console.log(` callOpenAI ~ process.env:`, process.env);
  console.log(` callOpenAI ~ OPENAI_API_KEY:`, OPENAI_API_KEY);

  // Ensure messages are in OpenAI chat completion format
  const formattedMessages = messages.map((m) => {
    if (m.role && m.content) {
      return m;
    }
    return {
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    };
  });

  const body: any = {
    model: 'gpt-4o',
    messages: formattedMessages,
  }

  if (functions.length > 0) {
    body.functions = functions
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
