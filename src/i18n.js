var map = {
    "ar-sa": "ar-sa",
    "en-us": "en-us",
    "de-de": "de-de"};

var i18n = {
    "ar-sa": {
        sideBarTitle: 'Premium Related Products',
        bottomBarTitle: 'Premium Related Products',
        goldSupplier: {
            showText: 'Gold Supplier',
            tipText: 'What is Gold Supplier?'
        },
        atmTexts: {
            showText: ['التحادث الأن', 'offline', 'التحادث الأن', 'التحادث الأن'],
            tipText: ['التحادث الأن', 'Please Leave a Message', 'التحادث الأن', 'التحادث الأن']
        }
    },
    "en-us": {
        sideBarTitle: 'Premium Related Products',
        bottomBarTitle: 'Premium Related Products',
        goldSupplier: {
            showText: 'Gold Supplier',
            tipText: 'What is Gold Supplier?'
        },
        atmTexts: {
            showText: ['Chat Now!', 'Leave Messages', 'Chat Now!', 'Chat Now!'],
            tipText: ['Chat with the supplier on TradeManager', 'Please Leave a Message', 'Chat with the supplier on TradeManager', 'Chat with the supplier on TradeManager']
        }
    },
    "de-de": {
        sideBarTitle: 'Premium Related Products',
        bottomBarTitle: 'Premium Related Products',
        goldSupplier: {
            showText: 'Gold Supplier',
            tipText: 'What is Gold Supplier?'
        },
        atmTexts: {
            showText: ['Jetzt chatten', 'Oставлять Cообщения', 'Jetzt chatten', 'Jetzt chatten'],
            tipText: ['Jetzt chatten', 'Please Leave a Message', 'Jetzt chatten', 'Jetzt chatten']
        }
    }};

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