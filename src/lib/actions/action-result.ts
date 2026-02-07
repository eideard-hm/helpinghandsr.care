export type ActionErrors = {
  form?: string[];
  fields?: Record<string, string[]>;
};

export type ActionResult = { ok: true } | { ok: false; errors: ActionErrors };
