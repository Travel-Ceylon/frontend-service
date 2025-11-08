import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BookingDashboard = () => {
  const [activeTab, setActiveTab] = useState("Bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // User dataset with real user information and their galleries
  const users = {
    1: {
      id: 1,
      name: "Sarah Johnson",
      username: "sarah.johnson2024",
      email: "sarah.johnson@email.com",
      phone: "+1-555-0123",
      country: "United States",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          caption: "Mountain hiking adventure",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
          caption: "Beach sunset experience",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
          caption: "Forest trail exploration",
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          caption: "Wildlife photography",
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
          caption: "Scenic valley views",
        },
      ],
    },
    2: {
      id: 2,
      name: "Marcus Weber",
      username: "marcus.weber.de",
      email: "marcus.weber@email.de",
      phone: "+49-30-12345678",
      country: "Germany",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
          caption: "City architecture tour",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
          caption: "Ocean adventure",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          caption: "Mountain climbing",
        },
      ],
    },
    3: {
      id: 3,
      name: "Claire Dubois",
      username: "claire.dubois",
      email: "claire.dubois@email.fr",
      phone: "+33-1-42-34-56-78",
      country: "France",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=800&h=600&fit=crop",
          caption: "Cultural heritage sites",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
          caption: "Local cuisine experience",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
          caption: "Lake adventures",
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          caption: "Garden photography",
        },
      ],
    },
    4: {
      id: 4,
      name: "David Chen",
      username: "david.chen.nyc",
      email: "david.chen@email.com",
      phone: "+1-212-555-0189",
      country: "United States",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          caption: "Urban exploration",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
          caption: "Sunset photography",
        },
      ],
    },
    5: {
      id: 5,
      name: "Elena Rossi",
      username: "elena.rossi.roma",
      email: "elena.rossi@email.it",
      phone: "+39-06-1234-5678",
      country: "Italy",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
          caption: "Historical monuments",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
          caption: "Coastal views",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=800&h=600&fit=crop",
          caption: "Art and culture",
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
          caption: "Romantic getaways",
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
          caption: "Nature walks",
        },
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          caption: "Wildlife encounters",
        },
      ],
    },
    6: {
      id: 6,
      name: "Arjun Sharma",
      username: "arjun.sharma.mumbai",
      email: "arjun.sharma@email.in",
      phone: "+91-98765-43210",
      country: "India",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
          caption: "Street food tours",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=800&h=600&fit=crop",
          caption: "Temple visits",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          caption: "Adventure sports",
        },
      ],
    },
  };

  // Booking data with user references
  const [bookings, setBookings] = useState([
    {
      id: 1,
      userId: 1,
      date: "25 Feb 2025",
      status: "pending",
      bookingDetails: {
        place: "Tissamaharama Safari",
        bookingDate: "04 Feb 2025",
        time: "10:00am",
      },
    },
    {
      id: 2,
      userId: 2,
      date: "26 Feb 2025",
      status: "pending",
      bookingDetails: {
        place: "Sigiriya Rock Fortress",
        bookingDate: "05 Feb 2025",
        time: "2:30pm",
      },
    },
    {
      id: 3,
      userId: 3,
      date: "05 Feb 2025",
      status: "viewed",
      bookingDetails: {
        place: "Kandy Temple Tour",
        bookingDate: "02 Feb 2025",
        time: "11:15am",
      },
    },
    {
      id: 4,
      userId: 4,
      date: "05 Feb 2025",
      status: "viewed",
      bookingDetails: {
        place: "Ella Nine Arches Bridge",
        bookingDate: "03 Feb 2025",
        time: "9:45am",
      },
    },
    {
      id: 5,
      userId: 5,
      date: "03 Feb 2025",
      status: "viewed",
      bookingDetails: {
        place: "Galle Fort Walking Tour",
        bookingDate: "01 Feb 2025",
        time: "3:20pm",
      },
    },
    {
      id: 6,
      userId: 6,
      date: "03 Feb 2025",
      status: "viewed",
      bookingDetails: {
        place: "Colombo City Highlights",
        bookingDate: "01 Feb 2025",
        time: "4:00pm",
      },
    },
  ]);

  // Helper function to get user data for a booking
  const getUserForBooking = (booking) => {
    return users[booking.userId];
  };

  // Helper function to get enriched booking data
  const getEnrichedBooking = (booking) => {
    const user = getUserForBooking(booking);
    return {
      ...booking,
      user: user,
      details: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        place: booking.bookingDetails.place,
        bookingDate: booking.bookingDetails.bookingDate,
        time: booking.bookingDetails.time,
      },
    };
  };

  // Filter bookings by status and enrich with user data
  const pendingBookings = bookings
    .filter((booking) => booking.status === "pending")
    .map(getEnrichedBooking);
  const viewedBookings = bookings
    .filter((booking) => booking.status === "viewed")
    .map(getEnrichedBooking);

  const handleBookingClick = (enrichedBooking) => {
    setSelectedBooking(enrichedBooking);

    // Mark booking as viewed if it was pending
    if (enrichedBooking.status === "pending") {
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === enrichedBooking.id ? { ...b, status: "viewed" } : b
        )
      );

      // Update the selected booking status as well
      setSelectedBooking((prev) => ({ ...prev, status: "viewed" }));
    }
  };

  const handleImageClick = (image, gallery) => {
    const imageIndex = gallery.findIndex((img) => img.id === image.id);
    setCurrentImageIndex(imageIndex);
    setEnlargedImage({ image, gallery });
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const navigateImage = (direction) => {
    if (!enlargedImage) return;

    const gallery = enlargedImage.gallery;
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : gallery.length - 1;
    } else {
      newIndex =
        currentImageIndex < gallery.length - 1 ? currentImageIndex + 1 : 0;
    }

    setCurrentImageIndex(newIndex);
    setEnlargedImage({
      image: gallery[newIndex],
      gallery: gallery,
    });
  };

  // Get current user for Dashboard tab (using first user as default)
  const currentUser = users[1];

  const BookingCard = ({ booking, section }) => (
    <div
      className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleBookingClick(booking)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={booking.user.avatar}
              alt={booking.user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect fill='%236b7280' width='40' height='40'/%3E%3Ctext x='20' y='20' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3E${booking.user.name.charAt(
                  0
                )}%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{booking.user.name}</h3>
            <p className="text-sm text-gray-500">{booking.user.country}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">{booking.date}</p>
        </div>
      </div>
      <button className="w-full mt-3 bg-green-300 text-black py-2 px-4 rounded-md hover:bg-green-700 hover:text-white transition-colors">
        View Booking
      </button>
    </div>
  );

  const BookingDetails = ({ booking }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={booking.user.avatar}
            alt={booking.user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect fill='%236b7280' width='48' height='48'/%3E%3Ctext x='24' y='24' text-anchor='middle' dy='.3em' fill='white' font-size='18'%3E${booking.user.name.charAt(
                0
              )}%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {booking.user.name}
          </h2>
          <p className="text-sm text-gray-500">{booking.details.country}</p>
          <p className="text-xs text-gray-400">{booking.date}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Client Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User name</span>
              <span className="text-sm text-gray-900">
                {booking.details.username}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.email}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone number
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.phone}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Country
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.country}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Booking Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Place
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.place}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Date
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.bookingDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Time
              </span>
              <span className="text-sm text-gray-900">
                {booking.details.time}
              </span>
            </div>
          </div>
        </div>

        {/* User's Gallery Section in Booking Details */}
        {booking.user.gallery && booking.user.gallery.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {booking.user.name}'s Photos
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {booking.user.gallery.slice(0, 6).map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleImageClick(image, booking.user.gallery)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {booking.user.gallery.length > 6 && (
                <div
                  className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() =>
                    handleImageClick(
                      booking.user.gallery[6],
                      booking.user.gallery
                    )
                  }
                >
                  +{booking.user.gallery.length - 6} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Image Modal Component
  const ImageModal = ({ enlargedImage, onClose, onNavigate }) => {
    if (!enlargedImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {enlargedImage.gallery.length > 1 && (
            <>
              <button
                onClick={() => onNavigate("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => onNavigate("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <img
            src={enlargedImage.image.url}
            alt={enlargedImage.image.caption}
            className="max-w-full max-h-full object-contain"
          />

          {enlargedImage.image.caption && (
            <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black bg-opacity-50 rounded p-2">
              {enlargedImage.image.caption}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="bg-white rounded-t-lg border-b border-gray-200">
          <div className="flex">
            {["Bookings", "Dashboard", "Account"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "Bookings" && (
          <div className="bg-white rounded-b-lg min-h-96">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Bookings List */}
              <div className="p-6 border-r border-gray-200">
                {/* Pending Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-600 mb-4">
                    Pending
                  </h2>
                  <div className="space-y-0">
                    {pendingBookings.length > 0 ? (
                      pendingBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          section="pending"
                        />
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm italic py-4">
                        No pending bookings
                      </div>
                    )}
                  </div>
                </div>

                {/* Viewed Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-600 mb-4">
                    Viewed
                  </h2>
                  <div className="space-y-0">
                    {viewedBookings.length > 0 ? (
                      viewedBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          section="viewed"
                        />
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm italic py-4">
                        No viewed bookings
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                {selectedBooking ? (
                  <BookingDetails booking={selectedBooking} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Select a booking to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "Dashboard" && (
          <div className="bg-white rounded-b-lg p-6">
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                My Gallery
              </h2>

              {/* Image Gallery */}
              <div className="grid grid-cols-12 gap-3 mb-8">
                {currentUser.gallery.map((image, index) => {
                  if (index === 0) {
                    // Large left image
                    return (
                      <div key={image.id} className="col-span-12 md:col-span-7">
                        <div
                          className="rounded-lg overflow-hidden h-64 md:h-80 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() =>
                            handleImageClick(image, currentUser.gallery)
                          }
                        >
                          <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  } else if (index === 1) {
                    // Start right column
                    return (
                      <div
                        key={image.id}
                        className="col-span-12 md:col-span-5 grid grid-rows-2 gap-3"
                      >
                        <div
                          className="rounded-lg overflow-hidden h-32 md:h-auto cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() =>
                            handleImageClick(image, currentUser.gallery)
                          }
                        >
                          <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {currentUser.gallery.slice(2, 4).map((img, idx) => (
                            <div
                              key={img.id}
                              className="rounded-lg overflow-hidden h-32 md:h-auto cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() =>
                                handleImageClick(img, currentUser.gallery)
                              }
                            >
                              <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {currentUser.gallery.length > 4 && (
                            <div
                              className="relative rounded-lg overflow-hidden h-32 md:h-auto cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() =>
                                handleImageClick(
                                  currentUser.gallery[4],
                                  currentUser.gallery
                                )
                              }
                            >
                              <img
                                src={currentUser.gallery[4].url}
                                alt={currentUser.gallery[4].caption}
                                className="w-full h-full object-cover"
                              />
                              {currentUser.gallery.length > 5 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <span className="text-white text-lg font-semibold">
                                    +{currentUser.gallery.length - 5}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Description Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Hello! I'm a licensed tour guide based in Sri Lanka, with
                    over 7 years of experience helping travelers explore the
                    beauty, culture, and history of this incredible island.
                    Whether you're interested in ancient cities like
                    Anuradhapura and Sigiriya, the misty mountains of Ella, or
                    the golden beaches of the south coast, I'm here to make your
                    trip truly unforgettable.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I'm friendly, reliable, and fully committed to making sure
                    you feel safe, informed, and inspired throughout your
                    journey. If you're looking for someone to guide you with
                    passion, knowledge, and a personal touch — I'd be honored to
                    be part of your adventure in Sri Lanka.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                      <span className="mr-1">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "Account" && (
          <div className="bg-white rounded-b-lg p-6">
            <div className="max-w-2xl">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                  <div className="mb-2 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-900">
                      Name
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">sample User</span>
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-sm transition-colors"
                      onClick={() => {
                        // Handle change name logic here for the backend
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                  <div className="mb-2 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-900">
                      Email
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">sampleuser@gmail.com</span>
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-sm transition-colors"
                      onClick={() => {
                        // Handle change email logic here for the backend
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                  <div className="mb-2 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">•••••••</span>
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-sm transition-colors"
                      onClick={() => {
                        // Handle change password logic here for the backend
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
                  <div className="mb-2 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-900">
                      Phone number
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">0774342348</span>
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-sm transition-colors"
                      onClick={() => {
                        // Handle change phone number logic here for the backend
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        enlargedImage={enlargedImage}
        onClose={closeEnlargedImage}
        onNavigate={navigateImage}
      />

      {/* Mobile Responsive Layout */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .grid-cols-1.lg\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }

          .border-r {
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingDashboard;
