export type ReviewResponse = {
  ok: boolean;
  review?: Review | null;
  error?: string | null;
};
