class Discount {
    discount;
    constructor(price) {
        this.totalPrice = price;
    }
    checkData(searchCode) {
        fetch('discount.json').then((response) => {
            return response.json()
        }).then((obj) => {
            let flag = false;
            Object.keys(obj).forEach((key) => {
                obj[key].forEach((data) => {
                    if (data.code === searchCode) {
                        flag = true;
                        this.makeDiscount(key, data.code, data.discount);
                    }
                });
            });
            if (!flag) {
                console.log('not found');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    makeDiscount(key, code, value) {
        if (key === 'vouchers') {
           this.totalPrice = this.totalPrice - (value/100 * this.totalPrice);
           console.log(this.totalPrice);
        } else {
            this.totalPrice = this.totalPrice - value;
            console.log(this.totalPrice);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('calcDiscount').addEventListener('click', () => {
        const codeInput = document.getElementById('codeInput').value.toUpperCase();
        const totalPrice = Number(document.getElementById('price').innerHTML);
        const myName = new Discount(totalPrice);
        myName.checkData(codeInput);
    });
});
