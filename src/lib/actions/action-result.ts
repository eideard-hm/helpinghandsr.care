export type ActionErrors = {
  form?: string[];
  fields?: Record<string, string[]>;
};

export type ActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; errors: ActionErrors };
