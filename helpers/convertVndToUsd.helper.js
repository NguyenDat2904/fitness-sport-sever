const axios = require('axios');

async function convertVndToUsd(amount) {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = response.data.rates;

        const usdRate = rates.VND;

        if (usdRate) {
            const usdAmount = amount / usdRate;
            return usdAmount.toFixed(2);
        } else {
            console.log('Không thể tìm thấy tỷ giá VND/USD.');
            return null;
        }
    } catch (error) {
        console.log('Đã xảy ra lỗi khi lấy tỷ giá hối đoái.');
        return null;
    }
}
module.exports = convertVndToUsd;
