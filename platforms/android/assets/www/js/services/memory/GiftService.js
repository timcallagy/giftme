var GiftService = function() {

    self = this;
        
    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var gift = null;
        var l = gifts.length;
        for (var i=0; i < l; i++) {
            if (gifts[i].id === id) {
                gift = gifts[i];
                break;
            }
        }
        deferred.resolve(gift);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = gifts.filter(function(element) {
            var name = element.name;
            return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }

    this.allGifts = function() {
        var deferred = $.Deferred();
        deferred.resolve(gifts);
        return deferred.promise();
    }
    var gifts = [
        {"id": 1, "Name": "Climbing Shoes", "price": "$89", "url": "http://www.amazon.co.uk/Boreal-Joker--/dp/B001HDIDMG/ref=sr_1_2?ie=UTF8&qid=1426025577&sr=8-2&keywords=climbing+shoes", "crowdfunded": "$22", "pic": "shoes.jpg"},
        {"id": 2, "Name": "FishEye Lens", "price": "$98", "url": "http://www.amazon.co.uk/Canon-24-105mm-4-0-USM-Lens/dp/B000B84KAW/ref=sr_1_4?ie=UTF8&qid=1426025844&sr=8-4&keywords=canon+lens", "crowdfunded": "$70", "pic": "lens.jpg"},
        {"id": 3, "Name": "The Intelligent Investor", "price": "$25", "url": "http://www.amazon.co.uk/Intelligent-Investor-Definitive-Investing-Practical/dp/B008KUPTSU/ref=sr_1_9?ie=UTF8&qid=1426025800&sr=8-9&keywords=intelligent+investor", "crowdfunded": "$0", "pic": "investor.jpg"},
        {"id": 4, "Name": "Settlers of Catan", "price": "$55", "url": "http://www.amazon.co.uk/The-Settlers-Catan-Expansion-Seafarers/dp/B000W7G78A/ref=sr_1_3?ie=UTF8&qid=1426025882&sr=8-3&keywords=catan", "crowdfunded": "$0", "pic": "catan.jpg"}
    ];

}
