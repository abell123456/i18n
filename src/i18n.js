var map = {
    "ar-sa": "ar-sa",
    "de-de": "de-de",
    "en-us": "en-us"};

var i18n = {
    "ar-sa": {
        "sideBarTitle": "Premium Related Products",
        "bottomBarTitle": "Premium Related Products",
        "goldSupplier": {
            "showText": "Gold Supplier",
            "tipText": "What is Gold Supplier?"
        },
        "atmTexts": {
            "showText": [
                "text1",
                "text2",
                "text3",
                "text4"
            ],
            "tipText": [
                "text1Tip",
                "Please Leave a Message",
                "text3Tip",
                "text4Tip"
            ]
        }
    },
    "de-de": {
        "sideBarTitle": "Premium Related Products",
        "bottomBarTitle": "Premium Related Products",
        "goldSupplier": {
            "showText": "Gold Supplier",
            "tipText": "What is Gold Supplier?"
        },
        "atmTexts": {
            "showText": [
                "Jetzt chatten",
                "Oставлять Cообщения",
                "Jetzt chatten",
                "Jetzt chatten"
            ],
            "tipText": [
                "Jetzt chatten",
                "Please Leave a Message",
                "Jetzt chatten",
                "Jetzt chatten"
            ]
        }
    },
    "en-us": {
        "sideBarTitle": "Premium Related Products",
        "bottomBarTitle": "Premium Related Products",
        "goldSupplier": {
            "showText": "Gold Supplier",
            "tipText": "What is Gold Supplier?"
        },
        "atmTexts": {
            "showText": [
                "Chat Now!",
                "Leave Messages",
                "Chat Now!",
                "Chat Now!"
            ],
            "tipText": [
                "Chat with the supplier on TradeManager",
                "Please Leave a Message",
                "Chat with the supplier on TradeManager",
                "Chat with the supplier on TradeManager"
            ]
        }
    }
};

function _(locale) {
    var r = i18n[map[locale] || 'en-us'];
    r._ = _;
    return r;
}
try {
   var locale = seajs.data.vars.locale;
} catch (e) {
   var locale = 'en-us';
}

module.exports = _(locale);