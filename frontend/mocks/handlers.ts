import { rest } from 'msw';

const BASE_URL = 'http://localhost:8000/api';

export const handlers = [
  rest.get(`${BASE_URL}/submissions/`, (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            status: 'new',
            priority: 'high',
            company: { legalName: 'Acme Corp', industry: 'Software' },
            broker: { name: 'Broker A' },
            owner: { fullName: 'Owner A' },
            documentCount: 2,
            noteCount: 1,
            latestNote: { bodyPreview: 'Test note', authorName: 'Tester' },
            createdAt: '2023-01-01T00:00:00Z',
          },
        ],
      }),
    );
  }),

  rest.get(`${BASE_URL}/submissions/:id/`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id: Number(id),
        status: 'new',
        priority: 'high',
        summary: 'Test summary',
        company: { id: 1, legalName: 'Acme Corp', industry: 'Software', headquartersCity: 'NY' },
        broker: { id: 1, name: 'Broker A', primaryContactEmail: 'a@test.com' },
        owner: { id: 1, fullName: 'Owner A', email: 'owner@test.com' },
        contacts: [],
        documents: [],
        notes: [],
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      }),
    );
  }),

  rest.get(`${BASE_URL}/brokers/`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Broker A', primaryContactEmail: 'a@test.com' },
        { id: 2, name: 'Broker B', primaryContactEmail: 'b@test.com' },
      ]),
    );
  }),
];
