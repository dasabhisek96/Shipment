interface Trip {
    startPoint: string;
    endPoint: string;
}

interface Shipment {
    pickups: string[];
    dropoffs: string[];
}

function validateTrips(trips: Trip[], shipment: Shipment): boolean {
    // Create a copy of the shipment pickups and dropoffs to track remaining points
    let remainingPickups = [...shipment.pickups];
    let remainingDropoffs = [...shipment.dropoffs];

    for (const trip of trips) {
        // Check if trip start point is a pickup or dropoff
        const isPickup = remainingPickups.includes(trip.startPoint);
        const isDropoff = remainingDropoffs.includes(trip.startPoint);

        if (!isPickup && !isDropoff) {
            // If the start point is neither a pickup nor a dropoff, trip is invalid
            return false;
        }

        // Remove start point from remaining pickups or dropoffs based on its type
        if (isPickup) {
            remainingPickups = remainingPickups.filter(point => point !== trip.startPoint);
        } else {
            remainingDropoffs = remainingDropoffs.filter(point => point !== trip.startPoint);
        }

        // Check if trip end point is a pickup or dropoff
        const isEndPickup = remainingPickups.includes(trip.endPoint);
        const isEndDropoff = remainingDropoffs.includes(trip.endPoint);

        if (!isEndPickup && !isEndDropoff) {
            // If the end point is neither a pickup nor a dropoff, trip is invalid
            return false;
        }

        // Remove end point from remaining pickups or dropoffs based on its type
        if (isEndPickup) {
            remainingPickups = remainingPickups.filter(point => point !== trip.endPoint);
        } else {
            remainingDropoffs = remainingDropoffs.filter(point => point !== trip.endPoint);
        }
    }

    // If all trips have been validated and no pickups or dropoffs remain, trips are valid
    return remainingPickups.length === 0 && remainingDropoffs.length === 0;
}

// Example usage
const trips: Trip[] = [
    { startPoint: "A", endPoint: "W" },
    { startPoint: "B", endPoint: "W" },
    { startPoint: "W", endPoint: "C" },
    { startPoint: "W", endPoint: "D" }
];

const shipment: Shipment = {
    pickups: ["A", "B"],
    dropoffs: ["C", "D"]
};

console.log(validateTrips(trips, shipment)); 