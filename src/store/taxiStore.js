import { create } from "zustand";
import { api } from "../config/api";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useTaxiStore = create((set, get) => ({
  profile: null, // Provider profile data
  bookings: [], // List of all bookings

  // Step 1: Driver/Owner Information
  driverName: null,
  driverBio: null,
  nic: null,
  drivingId: null,
  profilePic: null,
  nicImg: null,
  drivingIdImg: null,

  // Step 2: Contact & Pricing
  contact1: null,
  contact2: null,
  email: null,
  website: null,
  perKm: null,

  // Step 3: Vehicle Information
  description: null,
  chasyNo: null,
  vehicleNo: null,
  province: "Western",
  vehicleType: "Car",
  city: "Colombo",
  model: null,
  fuelType: "Petrol",

  // Step 4: Vehicle Images
  image1: null,
  image2: null,
  image3: null,
  aggree: false,

  // UI State
  currentIndex: 0,

  // SETTER FUNCTIONS

  setDriverName: (driverName) => set({ driverName }),
  setDriverBio: (driverBio) => set({ driverBio }),
  setDescription: (description) => set({ description }),
  setNic: (nic) => set({ nic }),
  setDrivingId: (drivingId) => set({ drivingId }),
  setProfilePic: (profilePic) => set({ profilePic }),
  setNicImg: (nicImg) => set({ nicImg }),
  setDrivingIdImg: (drivingIdImg) => set({ drivingIdImg }),
  setContact1: (contact1) => set({ contact1 }),
  setContact2: (contact2) => set({ contact2 }),
  setEmail: (email) => set({ email }),
  setWebsite: (website) => set({ website }),
  setPerKm: (perKm) => set({ perKm }),
  setChasyNo: (chasyNo) => set({ chasyNo }),
  setVehicleNo: (vehicleNo) => set({ vehicleNo }),
  setProvince: (province) => set({ province }),
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setCity: (city) => set({ city }),
  setAggree: (aggree) => set({ aggree }),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  setModel: (model) => set({ model }),
  setFuelType: (fuelType) => set({ fuelType }),

  setImage1: (image1) => {
    set({ image1 });
  },

  setImage2: (image2) => {
    set({ image2 });
  },

  setImage3: (image3) => {
    set({ image3 });
  },

  // Get taxi profile
  // Fetches complete taxi service profile from backend
  // Updates both taxi store and auth store

  getProviderProfile: async () => {
    const { setUser } = useAuthStore.getState();

    try {
      const { data } = await api.get("/api/service-provider/me");

      if (data && data.data) {
        const providerProfile = data.data.profile;

        // Update Auth Store (for Account tab)
        setUser(providerProfile);

        return { providerProfile };
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load profile data."
      );
      setUser(null);
      throw error;
    }
  },

  //get taxiAdminDashboard details(about the taxi)

  getTaxiDashboardProfile: async () => {
    try {
      const { data } = await api.get("/api/service/taxi/profile");

      if (data && data.data) {
        const taxiProfile = data.data;
        set({ profile: taxiProfile });
        return { profile: taxiProfile };
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load profile data."
      );
      set({ profile: null });
      throw error;
    }
  },

  //get taxi bookings details that a service provider gets

  getTaxiBookings: async () => {
    try {
      const { data } = await api.get("/api/service/taxi/bookings"); // The backend controller returns the array in data.data
      const providerBookings = data.data || [];
      set({ bookings: providerBookings });
      return providerBookings;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load provider bookings."
      );
      throw error;
    }
  },

  // Sends all form data to backend

  submit: async () => {
    const {
      driverName,
      driverBio,
      description,
      nic,
      drivingId,
      profilePic,
      nicImg,
      drivingIdImg,
      contact1,
      contact2,
      email,
      website,
      image1,
      image2,
      image3,
      chasyNo,
      vehicleNo,
      province,
      vehicleType,
      perKm,
      aggree,
      city,
      model,
      fuelType,
    } = get();

    if (!aggree) {
      throw new Error("You must agree to terms and conditions");
    }

    // Filter out null/undefined images
    const vehicleImages = [image1, image2, image3].filter((img) => img);

    // Prepare form data

    const formData = {
      // Driver Information
      driverName,
      driverBio,
      nic,
      drivingId,
      profilePic,
      nicImg,
      drivingIdImg,

      // Contact & Pricing
      contact: [contact1, contact2].filter((c) => c), // Remove null contacts
      email,
      website,
      perKm: Number(perKm),

      // Vehicle Information
      description,
      chasyNo,
      vehicleNo,
      province,
      vehicleType,
      city,
      model,
      fuelType,

      // Vehicle Images
      images: vehicleImages,
    };

    try {
      const { data } = await api.post("/api/service/taxi", formData);
      set({ profile: data.data });
      const { updateServiceDetails } = useAuthStore.getState();
      // The service ID is the ID of the newly created profile object
      const newServiceId = data.data._id;
      const newServiceType = "Taxi";

      // Call the new function to immediately update the user's status globally
      updateServiceDetails(newServiceId, newServiceType);
      toast.success("Taxi service registered successfully!");
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  },
  updateTaxiDetails: async (updates) => {
    try {
      // The API call uses the PUT method and sends the 'updates' object as the request body.
      const response = await api.put("/api/service/taxi/", updates);

      if (response.data && response.data.data) {
        const updatedTaxiProfile = response.data.data;

        // Updating the local store state (merging the new data)
        set((state) => ({
          // Spread the existing profile state and then overwrite with the new properties
          profile: { ...state.profile, ...updatedTaxiProfile },
        }));

        toast.success("Taxi profile updated successfully!");
        return updatedTaxiProfile;
      } else {
        // Handle case where API call succeeds but returns an unexpected payload
        toast.error("Update successful, but data refresh failed.");
        return null;
      }
    } catch (error) {
      // Handle network errors, 403, 404, or 500 errors
      const message =
        error.response?.data?.message ||
        "Failed to update profile due to a server error.";
      toast.error(message);
      console.error("Taxi Update Error:", error);
      throw error; // Re-throw the error so the component/modal can handle loading state
    }
  },

  //mark a booking completed when a provider clicks the button
  markBookingComplete: async (bookingId) => {
    try {
      const { data } = await api.patch(
        `/api/service/taxi/bookings/${bookingId}/complete`
      );

      if (data.success) {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b._id === bookingId ? { ...b, status: "completed" } : b
          ),
        }));
        toast.success("Booking marked as completed!");
        return data;
      } else {
        throw new Error(data.message || "Failed to mark booking complete");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to mark booking as completed";
      toast.error(message);
      throw error;
    }
  },

  //cancel a booking of a user by a provider
  cancelBooking: async (bookingId) => {
    try {
      const { data } = await api.patch(
        `/api/service/taxi/bookings/${bookingId}/cancel`
      );

      if (data.success) {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b
          ),
        }));
        toast.success("Booking cancelled successfully!");
        return data;
      } else {
        throw new Error(data.message || "Failed to cancel booking");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to cancel booking";
      toast.error(message);
      throw error;
    }
  },
}));
