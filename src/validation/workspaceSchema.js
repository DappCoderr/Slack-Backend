import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(3).max(50)
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(150),
});
