export async function callOpenAI(messages, functions = []) {

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0613',
      messages,
      functions
    })
  });
  return res.json();
}
