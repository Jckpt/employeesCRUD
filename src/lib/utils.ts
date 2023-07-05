export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
  }

export function convertDate(dateString: string) {
    const dateObj = new Date(dateString);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Indeks miesiąca zaczyna się od 0, więc dodajemy 1
    const year = dateObj.getUTCFullYear();
  
    // Formatowanie dnia i miesiąca, aby zawsze miały dwa miejsca
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
  
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  }