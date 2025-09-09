export const catchError = async <T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const response = await promise;
    return [response, null];
  } catch (error) {
    console.log({ error });
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
};
