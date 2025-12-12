import { useEffect, useState } from "react";

export const BookingsTab = ({ bookings, getTaxiBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Select first pending booking by default
  useEffect(() => {
    const pending = bookings.filter((b) => b.status === "Pending");
    if (pending.length > 0 && !selectedBooking) {
      setSelectedBooking(pending[0]);
    }
  }, [bookings, selectedBooking]);

  if (bookings.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600">No bookings found.</p>
    );
  }

  // Filter bookings by status
  const pending = bookings.filter((b) => b.status === "Pending");
  const history = bookings.filter((b) => b.status !== "Pending");

  // Individual booking card component
  const BookingCard = ({ booking, isPending = false }) => {
    const isSelected = selectedBooking?._id === booking._id;

    return (
      <div
        onClick={() => setSelectedBooking(booking)}
        className={`flex items-center justify-between p-4 border-b cursor-pointer transition ${
          isSelected ? "bg-green-50" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center space-x-3">
          <img
            src={booking.user?.profilePic || "/default-avatar.jpg"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">
              {booking.user?.name || "Booking User"}
            </p>
            <p className="text-xs text-gray-500">
              {booking.pickUpLocation || "Pickup location"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            {new Date(booking.date || Date.now()).toLocaleDateString()}
          </p>
          <button
            className={`px-4 py-1 rounded-full text-white text-xs font-medium ${
              isPending ? "bg-green-400" : "bg-gray-400"
            }`}
          >
            {isPending ? "New Booking" : "View Booking"}
          </button>
        </div>
      </div>
    );
  };

  // Booking details panel (right side)
  const DetailsPanel = () => {
    if (!selectedBooking) {
      return (
        <div className="p-6 border rounded-lg bg-white text-center text-gray-500">
          Select a booking to view details
        </div>
      );
    }

    return (
      <div className="p-6 border rounded-lg bg-white space-y-4 sticky top-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          Booking User
        </h3>

        {/* Client Information */}
        <div className="space-y-3 pb-4 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">User name:</span>
            <span className="font-medium">
              {selectedBooking.user?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">
              {selectedBooking.user?.email || "user@email.com"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Phone number:</span>
            <span className="font-medium">
              {selectedBooking.user?.phone || "+94XXXXXXXXX"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Country:</span>
            <span className="font-medium">Sri Lanka</span>
          </div>
        </div>

        {/* Booking Information */}
        <h4 className="font-semibold text-gray-800 pt-2">
          Booking Information
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pickup city:</span>
            <span className="font-medium">
              {selectedBooking.pickUpLocation || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Drop city:</span>
            <span className="font-medium">
              {selectedBooking.dropLocation || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {new Date(selectedBooking.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">
              {selectedBooking.time || "10:00am"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Additional info:</span>
            <span className="font-medium">
              {selectedBooking.additionalInfo || "148 km"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 gap-6">
      {/* Left side - Bookings list */}
      <div className="col-span-2 space-y-6">
        {/* Pending bookings section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Bookings</h2>
          <div className="border rounded-lg bg-white divide-y">
            {pending.length > 0 ? (
              pending.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  isPending={true}
                />
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                No new booking requests
              </p>
            )}
          </div>
        </section>

        {/* Booking history section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">History</h2>
          <div className="border rounded-lg bg-white divide-y">
            {history.length > 0 ? (
              history.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                No completed bookings yet
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Right side - Booking details */}
      <div className="col-span-1">
        <DetailsPanel />
      </div>
    </div>
  );
};
