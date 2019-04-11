var data = "Pellentesque ex eros, +380665433321 porttitor eu bibendum ac, aliquam tincidunt urna. Mauris tristique lobortis orci, nec varius magna convallis interdum. Etiam 5363 4567 8765 3454 pharetra tempor ex, vel eleifend (067) 678 44 21 odio lacinia (0562) 35-30-38 eget. Morbi maximus libero vitae aliquet facilisis. Vivamus vitae quam nisi. Quisque 12/45 quis venenatis 5192722517688913 lacus. Sed ac lorem (050)567-45-33 nec leo pharetra 4556796335044346 dapibus sed eu +38067432112 ex. In hac habitasse platea dictumst. In dignissim 5461158320267908 suscipit rutrum. Ut 4916849417542904 luctus  sapien in risus 56th street auctor, ac placerat 067-678-44-21  quam malesuada. Pellentesque (056) 7783322 bibendum justo  5363 4567 87653 3455 tempus purus convallis, a viverra nunc ullamcorper. Nulla 5213 9203 2475 5355 eget lectus gravida, porta eros vitae, semper erat +39-926-1234567.  Aenean volutpat vehicula dui ut pharetra.";

/*

Выбрать из строки корректные номера телефонов и вывести их в полном международном формате, если код страны не указан, считать что Украина.

Также выбрать валидные номера банковских карт и вывести их в формате 4 блока по 4 цифры.

Например:

+380675556677;
+380503335588;
...

5475 0330 3843 6453
4539 1799 4927 2557
...

*/



var patt1 = /[(]{1}[0]{1}[0-9]{2}[)]{1}[ ]{1}[0-9]{3}[ ]{1}[0-9]{2}[ ]{1}[0-9]{2} | [+]{1}[3]{1}[8]{1}[0]{1}[0-9]{9} | [(]{1}[0]{1}[0-9]{2}[)]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2} | [0]{1}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2} | [(){1}][0]{1}[0-9]{3}[)]{1}[ ]{1}[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{2} | [(){1}][0]{1}[0-9]{2}[)]{1}[ ]{1}[0-9]{7} | [+]{1}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{7}/gmi;

var patt2 = /[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4} | [0-9]{16}/gmi;
var result = data.match(patt1);
var card = data.match(patt2);

console.log(result, card);

var total_cardTrue = [];
var total_cardWrong = [];
var numbers = [];

console.log(card)
for (var i = 0; i < card.length; i++) {
    var y = card[i].replace(/ |-/g, "");
    var z = card[i].replace(/(\d)(?=(\d\d\d\d)+([^\d]|$))/g, '$1 ');
    var x = card[i].split("", 16);
    console.log(card[i]);

    function PersonCard(one, two, three, four, start, clean, last) {
        this.dg1 = one;
        this.dg2 = two;
        this.dg3 = three;
        this.dg4 = four;
        this.CardStart = start;
        this.CardClean = clean;
        this.CardLast = last;
        this.totalInfoTrue = function () {
            return this.CardLast
        };
        this.totalInfoFalse = function () {
            return "card: " + this.CardStart + ", accepted: false";
        };
    }


    var myCard = new PersonCard([x[0]], [x[1]], [x[2]], [x[3]], y, x, z)
    console.log(myCard)
    var isCorrect
    console.log(PersonCard)
    PersonCard.prototype.isCorrect = function () {
        var sum = 0;
        for (var i = this.CardClean.length - 1; i >= 0; i--) {
            var dg = +this.CardClean[i];
            if (i % 2 == 0) {
                dg *= 2;
                dg = dg > 9 ? dg - 9 : dg
            }
            sum += dg;
        }
        return (sum % 10 == 0) ? "true" : "false";
    }

    PersonCard.prototype.paymentSystem = function () {
        if (+this.dg1 == 4) {
            return "VISA"
        } else if (2220 < +("this.dg1" + "this.dg2" + "this.dg3" + "this.dg4") < 2721) {
            return "MasterCard"
        } else if (+(this.dg1 + this.dg2) == 50) {
            return "Maestro"
        } else if (50 < +(this.dg1 + this.dg2) && +(this.dg1 + this.dg2) < 56) {
            return "MasterCard"
        } else if (55 < +(this.dg1 + this.dg2) && +(this.dg1 + this.dg2) < 70) {
            return "Maestro"
        } else {
            return ""
        }
    }
    PersonCard.prototype.accepted = function () {

        if ((this.isCorrect() == "true") && (this.paymentSystem() == "Maestro" || "VISA" || "MasterCard")) {
            console.log(this.totalInfoTrue());

            var k = total_cardTrue.push([this.totalInfoTrue()]);
            return;

        } else if (this.isCorrect() == "false") {
            console.log(this.totalInfoFalse());

            var k1 = total_cardWrong.push([this.totalInfoTrue()]);
            return;

        }

    }

    console.log(myCard.accepted());
    console.log(total_cardTrue);
}



for (var i = 0; i < total_cardTrue.length; i++) {

    var tag = ` ${total_cardTrue[i]}<br>`;
    document.getElementById("results").insertAdjacentHTML("beforebegin", `${tag}`);

}
for (var i = 0; i < result.length; i++) {
    var j = result[i].replace(/ |-|[(]|[)]/g, "");
    j = j.replace(/^0/, "+380");

    document.getElementById("numbers").insertAdjacentHTML("beforebegin", `${j} <br>`);

    console.log(j);
}