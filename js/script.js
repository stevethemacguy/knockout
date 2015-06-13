$(document).ready(function() {
    // JS Class to represent a row in the seat reservations grid
    function SeatReservation(name, initialMeal) {
        var self = this; //Using self instead of "this" is a common design pattern to avoid “this” conflicts.
        self.name = name;
        self.meal = ko.observable(initialMeal);
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


        self.addSeat = function() {
            self.seats.push(new SeatReservation("", self.availableMeals[0]));
        };
    }

    ko.applyBindings(new ReservationsViewModel()); //Don’t forget to do it all
});