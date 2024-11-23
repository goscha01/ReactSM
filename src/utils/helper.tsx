export const RoundPathString = (radius: number, width: number, height: number) => `
      M ${width / 2} ${height / 2 + radius}
      A ${radius} ${radius} 0 1 1 ${width / 2} ${height / 2 - radius}
      A ${radius} ${radius} 0 1 1 ${width / 2} ${height / 2 + radius}
    `;