export async function callOpenAI(messages) {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://visualgpt-ba-aux-gccxwajtmoiyb.herokuapp.com';

  const last = messages[messages.length - 1];
  const prompt = last.content ?? last.text ?? '';

  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.answer ?? data;
}
