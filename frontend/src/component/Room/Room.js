function Room({ row = 10, col = 7 }) {
  var numbers = [];

  // Lặp theo hàng
  for (var i = 0; i < col; i++) {
    numbers[i] = [];
    var x = 1;
    // Lặp theo cột, số cộ từ 0 -> số lượng phần tử của hàng i
    for (var j = 0; j < row; j++) {
      numbers[i][j] = x;
      x++;
    }
  }

  console.log("mảng: ", numbers);

  return (
    <div className="flex items-center">
      <table className="w-full">
        {numbers.map((col, index) => {
          return (
            <div className="flex items-center justify-between">
              <tr>
                <p className="leading-none w-5 h-5 my-auto text-center font-semibold text-[text-primary] uppercase">
                  {String.fromCharCode(97 + index)}
                </p>
              </tr>
              <tr>
                {col.map((row) => {
                  return (
                    <td className="leading-none ">
                      <p className="min-h-5 mx-1 my-2 min-w-5 border border-gray-300 text-center rounded-md">
                        {row}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <p className="leading-none w-5 h-5 text-center my-auto font-semibold text-[text-primary] uppercase">
                  {String.fromCharCode(97 + index)}
                </p>
              </tr>
            </div>
          );
        })}
      </table>
    </div>
  );
}

export default Room;
