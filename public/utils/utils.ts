export function formatDate(dateString: string) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 맞춤
  const day = dateObject.getDate().toString().padStart(2, "0"); // 두 자리 맞춤
  return `${year}년 ${month}월 ${day}일`;
}
