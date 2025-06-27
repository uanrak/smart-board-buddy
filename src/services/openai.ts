export async function callOpenAI(messages, functions = []) {

const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
  console.log(` callOpenAI ~ process.env:`, process.env)
  console.log(` callOpenAI ~ OPENAI_API_KEY:`, OPENAI_API_KEY)
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      functions
    })
  });
  return res.json();
}
