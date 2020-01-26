const formatPrice = price => {
  const arrPrice = String(price).split('');
  const out = [];

  arrPrice.reverse().forEach((digit, index) => {
    if (index % 3 === 0) {
      out.push(',');
    }
    out.push(digit);
  });

  out.shift();

  return `Rp. ${out.reverse().join('')}`;
};

module.exports = formatPrice;

// driver code
// console.log(formatPrice(123)); // <- Rp. 123
// console.log(formatPrice(1234)); // <- Rp. 1,234
// console.log(formatPrice(12345)); // <- Rp. 12,345
// console.log(formatPrice(123456)); // <- Rp. 123,456
// console.log(formatPrice(1234567)); // <- Rp. 1,234,567
// console.log(formatPrice(12345678)); // <- Rp. 12,345,678
// console.log(formatPrice(123456789)); // <- Rp. 123,456,789
