import { NotionDataResponse } from "@/interfaces/Notion"

export const mockNotionData: NotionDataResponse = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: '21d37737-8de8-8151-a91b-d6a77bf3ecfe',
      created_time: '2025-06-25T07:10:00.000Z',
      last_edited_time: '2025-06-25T07:10:00.000Z',
      created_by: {
        object: 'user',
        id: '32ba7e3e-3058-4155-8735-5337acd5196c',
      },
      last_edited_by: {
        object: 'user',
        id: '32ba7e3e-3058-4155-8735-5337acd5196c',
      },
      cover: null,
      icon: {
        type: 'emoji',
        emoji: '📊',
      },
      parent: {
        type: 'database_id',
        database_id: '21d37737-8de8-81bb-be44-e5fac30ada82',
      },
      archived: false,
      in_trash: false,
      properties: {
        Today: {
          id: 'FLXb',
          type: 'formula',
          formula: {
            type: 'string',
            string: null,
          },
        },
        'To-Do Database': {
          id: 'O%7DDC',
          type: 'relation',
          relation: [
            {
              id: '21d37737-8de8-8129-8827-e1ca6a019421',
            },
            {
              id: '21d37737-8de8-81ba-b1a5-f974fb45d36c',
            },
            {
              id: '21d37737-8de8-81b6-a1a0-e849cdfbcb59',
            },
            {
              id: '21d37737-8de8-81dc-9d28-e42d53933927',
            },
            {
              id: '21d37737-8de8-81d7-a3ea-ff423485caa1',
            },
            {
              id: '21d37737-8de8-81a4-94b4-d58a6bdaaac1',
            },
            {
              id: '21d37737-8de8-818c-a883-d72a41af3321',
            },
            {
              id: '21d37737-8de8-812a-8355-eca124801e34',
            },
            {
              id: '21d37737-8de8-8143-933d-c979abce2650',
            },
            {
              id: '21d37737-8de8-8123-98a4-c79befbd22ed',
            },
            {
              id: '21d37737-8de8-8136-b664-d57ce42424b0',
            },
          ],
          has_more: false,
        },
        'Multi-select Today': {
          id: 'SXaV',
          type: 'multi_select',
          multi_select: [
            {
              id: '\\Esa',
              name: 'Hoy',
              color: 'red',
            },
          ],
        },
        Month: {
          id: 'Wwzl',
          type: 'formula',
          formula: {
            type: 'number',
            number: 0.272727272727,
          },
        },
        Week: {
          id: 'ipIP',
          type: 'formula',
          formula: {
            type: 'number',
            number: 0.375,
          },
        },
        'Multi-select Year': {
          id: 'k%7BVA',
          type: 'multi_select',
          multi_select: [
            {
              id: '|nWB',
              name: 'Año',
              color: 'yellow',
            },
          ],
        },
        'Multi-select Week': {
          id: 'raK%3E',
          type: 'multi_select',
          multi_select: [
            {
              id: 'QDnJ',
              name: 'Semana',
              color: 'gray',
            },
          ],
        },
        Year: {
          id: '%7B_a%7B',
          type: 'formula',
          formula: {
            type: 'number',
            number: 0.272727272727,
          },
        },
        'Multi-select Month': {
          id: '~vzx',
          type: 'multi_select',
          multi_select: [
            {
              id: 'Hw~?',
              name: 'Mes',
              color: 'blue',
            },
          ],
        },
        Name: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: 'Tareas',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'Tareas',
              href: null,
            },
          ],
        },
      },
      url: 'https://www.notion.so/Tareas-21d377378de88151a91bd6a77bf3ecfe',
      public_url: null,
    },
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
  developer_survey:
    'https://notionup.typeform.com/to/bllBsoI4?utm_source=postman',
  request_id: '42e1e2bd-0f23-40f7-8c32-ce304151223a',
}
