import { z } from 'zod';

export const messageSchema =z.string().min(1).regex(/^\S.*$/,'Message cannot be empty or contain only whitespace');
