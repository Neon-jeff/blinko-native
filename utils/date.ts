export function formDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} s`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 604800 / 3) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}Hr${hours !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 2419200) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
