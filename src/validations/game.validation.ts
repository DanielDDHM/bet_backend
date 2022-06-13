import * as z from "zod";

export const getGamesValidation = z.object({
  id: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  page: z.number()
    .nonnegative()
    .optional(),
  perPage: z.number()
    .nonnegative()
    .optional()
}).strict();

export const createGamesValidation = z.object({
  name: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  ownerId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  prize: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  sortDate: z.date(),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const updateGamesValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  prize: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  sortDate: z.date()
    .optional(),
  winner: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  prizePhoto: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  isActive: z.boolean()
    .optional(),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const activateGameValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  isActive: z.boolean().optional(),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
  nick: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const deleteGamesValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();
