export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    if ("data" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (error as any).data;
      if (typeof data === "object" && data !== null && "message" in data) {
        return data.message;
      }
    }
    if ("message" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).message;
    }
  }
  return "An unknown error occurred";
}
