$(document).ready(function() {
    // JS Class to represent a row in the seat reservations grid

    this.totalPrice =0;

    function SeatReservation(name, initialMeal) {
        var self = this; //Using self instead of "this" is a common design pattern to avoid “this” conflicts.
        self.name = name;
        self.meal = ko.observable(initialMeal);
        self.formattedPrice = ko.computed(function() {
            var price = self.meal().price;
            return price ? "$" + price.toFixed(2) : "None";
        });
    }

    // Overall viewmodel for this screen, along with initial state
    function ReservationsViewModel() {
        var self = this;

        // Non-editable catalog data - come sfrom the server
        self.availableMeals = [
            { mealName: "Standard (sandwich)", price: 0 },
            { mealName: "Premium (lobster)", price: 34.95 },
            { mealName: "Ultimate (whole zebra)", price: 290 }
        ];

        // Editable data
        self.seats = ko.observableArray([
            new SeatReservation("Steve", self.availableMeals[0]),
            new SeatReservation("Bert", self.availableMeals[1]),
            new SeatReservation("Bert", self.availableMeals[2])
        ]);

        //Access this in the html like totalCharge(). Needs parenthesis because it's a computed value
        self.totalCharge = ko.computed(function() {
            var total = 0;
            for (var i = 0; i < self.seats().length; i++)
                total += self.seats()[i].meal().price;
            return total;
        });

        self.addSeat = function() {
            self.seats.push(new SeatReservation("", self.availableMeals[0]));
        };

        self.removeSeat= function(seat) {
            self.seats.remove(seat);
        };
    }

    ko.applyBindings(new ReservationsViewModel()); //Don’t forget to do it all
});