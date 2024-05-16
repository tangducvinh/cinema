export const calender = (dateString) => {
  function getDatesInVietnamese(dateString) {
    const currentDate = new Date(dateString);
    const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const dayAfterTomorrow = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const daysOfWeek = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
      ];
      const dayOfWeek = daysOfWeek[date.getDay()];

      return `${year}-${month}-${day} (${dayOfWeek})`;
    };

    const todayFormatted = formatDate(currentDate);
    const tomorrowFormatted = formatDate(tomorrow);
    const dayAfterTomorrowFormatted = formatDate(dayAfterTomorrow);

    return [todayFormatted, tomorrowFormatted, dayAfterTomorrowFormatted];
  }

  // Sử dụng hàm để lấy mảng ngày
  const datesArray = getDatesInVietnamese(dateString);

  return datesArray;
};

export const convertCalender = (dateString) => {
  function convertDateToVietnameseFormat(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = `${dayOfWeek} ${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

    return formattedDate;
  }
  return convertDateToVietnameseFormat(dateString);
};

export const converTimeShow = (dateString) => {
  try {
    // Chuyển chuỗi ISO thành đối tượng Date
    const dateObject = new Date(dateString);
    // Trích xuất giờ và phút
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    // Trả về chuỗi định dạng giờ:phút
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    return "Không thể trích xuất thời gian từ chuỗi đã cho.";
  }
};
export const formatCash = (str) => {
  str = str?.toString();
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};
