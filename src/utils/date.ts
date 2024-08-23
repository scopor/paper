export function formattedDate(date: string): string {
    if (!date) {
        return ""
    }
    return new Date(date).toLocaleString('zh', {
        hour12: false,
        year: 'numeric',
        month: "2-digit",
        day: '2-digit',
        hour: "2-digit",
        minute: '2-digit',
        second: '2-digit'
    })
        .replaceAll('/', '-');
}

export function formatGistDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
