export default function formatDate(isoDate: string): string | undefined{
  const date = new Date(isoDate);

  if (!isoDate) {
    return undefined;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
