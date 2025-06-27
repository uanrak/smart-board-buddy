// Simple Node server for ChatGPT and Notion integration
import http from 'http';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

export async function getTasksFromNotion() {
  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({})
  });
  const data = await res.json();
  return data.results.map(page => ({
    id: page.id,
    title: page.properties.Name?.title?.[0]?.plain_text || '',
    status: page.properties.Status?.select?.name || '',
    priority: page.properties.Priority?.select?.name || ''
  }));
}

async function createTaskInNotion(title, description = '') {
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: title } }]
        },
        Description: description ? {
          rich_text: [{ text: { content: description } }]
        } : undefined
      }
    })
  });
  const data = await res.json();
  return {
    id: data.id,
    title,
    description
  };
}



const server = http.createServer(async (req, res) => {
  // Basic CORS headers to allow requests from the frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === 'POST' && req.url === '/api/chat') {
    try {
      const { messages } = await getRequestBody(req);
      const formatted = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      const systemMessage = {
        role: 'system',
        content: 'You are a planning assistant that manages tasks in Notion. Use the available functions to fetch or create tasks.'
      };
      const functions = [
        {
          name: 'getTasks',
          description: 'Get current tasks from Notion',
          parameters: { type: 'object', properties: {} }
        },
        {
          name: 'createTask',
          description: 'Create a new task in Notion',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' }
            },
            required: ['title']
          }
        }
      ];

      let aiResponse = await callOpenAI([systemMessage, ...formatted], functions);
      const choice = aiResponse.choices[0].message;

      if (choice.function_call) {
        let result;
        if (choice.function_call.name === 'getTasks') {
          result = await getTasksFromNotion();
        }
        if (choice.function_call.name === 'createTask') {
          const args = JSON.parse(choice.function_call.arguments || '{}');
          result = await createTaskInNotion(args.title, args.description);
        }
        const followUp = await callOpenAI([
          systemMessage,
          ...formatted,
          choice,
          { role: 'function', name: choice.function_call.name, content: JSON.stringify(result) }
        ]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ response: followUp.choices[0].message.content }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ response: choice.content }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  } else if (req.method === 'GET' && req.url === '/api/tasks') {
    try {
      const tasks = await getTasksFromNotion();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ tasks }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.API_PORT || 3001;
server.listen(PORT, () => {
  console.log('API server listening on port', PORT);
});

