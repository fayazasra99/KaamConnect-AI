import type { Request, Response } from 'express';
import { z } from 'zod';

const inputSchema = z.object({
  message: z.string().trim().min(1).max(1200),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(1200),
  })).max(10).optional().default([]),
});

export function assistantStatus(_req: Request, res: Response) {
  res.json({
    configured: Boolean(process.env.NEBIUS_API_KEY),
    provider: 'Nebius Token Factory',
    model: process.env.NEBIUS_MODEL || 'nvidia/Nemotron-3_5-Lightning',
  });
}

export async function askAssistant(req: Request, res: Response): Promise<void> {
  const parsed = inputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Enter a question up to 1,200 characters.' });
    return;
  }

  const apiKey = process.env.NEBIUS_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'The assistant is not configured yet. Add NEBIUS_API_KEY to the server environment.' });
    return;
  }

  const baseUrl = (process.env.NEBIUS_BASE_URL || 'https://api.tokenfactory.nebius.com/v1').replace(/\/+$/, '');
  const model = process.env.NEBIUS_MODEL || 'nvidia/Nemotron-3_5-Lightning';
  const messages = [
    { role: 'system', content: 'You are the KaamConnect job-search guide. Help people understand how to browse jobs, compare listed wages and locations, apply, and use worker or contractor dashboards. Keep answers short, practical, and respectful. Reply in the language the person uses when possible (English, Hindi, or Telugu). Do not claim a job is guaranteed, a worker is verified, a payment has been made, or GPS tracking is active. Never ask for passwords, OTPs, payment card details, or precise home addresses. If asked about a listing, direct the person to review the live listing details in KaamConnect.' },
    ...parsed.data.history.slice(-8),
    { role: 'user', content: parsed.data.message },
  ];

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, max_tokens: 350, temperature: 0.35 }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) {
      console.error(`Nebius Token Factory returned HTTP ${response.status}.`);
      res.status(502).json({ error: 'The assistant service could not answer right now. Please try again shortly.' });
      return;
    }
    const data = await response.json() as any;
    const answer = data?.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) {
      res.status(502).json({ error: 'The assistant returned an empty reply. Please try again.' });
      return;
    }
    res.json({ answer: answer.trim(), provider: 'Nebius Token Factory', model, usage: data.usage?.total_tokens ?? null });
  } catch (error: any) {
    console.error(error?.name === 'TimeoutError' ? 'Nebius Token Factory request timed out.' : 'Nebius Token Factory request failed.');
    res.status(error?.name === 'TimeoutError' ? 504 : 502).json({ error: 'The assistant service could not be reached. Please try again shortly.' });
  }
}
