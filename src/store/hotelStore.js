import { create } from "zustand";
import { api } from "../config/api";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useHotelStore = create((set, get) => ({

  // ---------- STATE ----------

  profile: null,
  isFetching: false,
  facilities: [],


  name: null,
  location: null,
  contact1: null,
  contact2: null,
  email: null,
  website: null,

  // facilities
  breakfast: false,
  roomService: false,
  bar: false,
  fitnessCenter: false,
  garden: false,
  parking: false,
  familyRooms: false,
  freeWifi: false,
  airConditioning: false,
  spa: false,
  swimmingPool: false,
  waterPark: false,

  // images
  image1: null,
  image2: null,
  image3: null,

  profilePic: null,
  cover: null,

  aggree: false,
  currentIndex: 0,

  // ---------- SETTERS ----------
  setName: (name) => set({ name }),
  setLocation: (location) => set({ location }),
  setContact1: (contact1) => set({ contact1 }),
  setContact2: (contact2) => set({ contact2 }),
  setEmail: (email) => set({ email }),
  setWebsite: (website) => set({ website }),

  setBreakfast: (breakfast) => set({ breakfast }),
  setRoomService: (roomService) => set({ roomService }),
  setBar: (bar) => set({ bar }),
  setFitnessCenter: (fitnessCenter) => set({ fitnessCenter }),
  setGarden: (garden) => set({ garden }),
  setParking: (parking) => set({ parking }),
  setFamilyRooms: (familyRooms) => set({ familyRooms }),
  setFreeWifi: (freeWifi) => set({ freeWifi }),
  setAirConditioning: (airConditioning) => set({ airConditioning }),
  setSpa: (spa) => set({ spa }),
  setSwimmingPool: (swimmingPool) => set({ swimmingPool }),
  setWaterPark: (waterPark) => set({ waterPark }),

  setImage1: (image1) => set({ image1 }),
  setImage2: (image2) => set({ image2 }),
  setImage3: (image3) => set({ image3 }),
  setProfilePic: (image) => set({ profilePic: image }),
  setCover: (image) => set({ cover: image }),

  setAggree: (aggree) => set({ aggree }),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),

  // ---------- SUBMIT ----------

  submit: async () => {
    const {
      name,
      location,
      contact1,
      contact2,
      email,
      website,
      breakfast,
      roomService,
      bar,
      fitnessCenter,
      garden,
      parking,
      familyRooms,
      freeWifi,
      airConditioning,
      spa,
      swimmingPool,
      waterPark,
      image1,
      image2,
      image3,
      profilePic,
      cover,
      aggree,
    } = get();

    if (!aggree) {
      throw new Error("You must agree to terms and conditions");
    }

    const formData = {
      name,
      location,
      contact: [contact1, contact2],
      email,
      website,
      facilities: {
        breakfast,
        roomService,
        bar,
        fitnessCenter,
        garden,
        parking,
        familyRooms,
        freeWifi,
        airConditioning,
        spa,
        swimmingPool,
        waterPark,
      },
      images: [image1, image2, image3],
      profilePic,
      cover
    };

    try {
      const { data } = await api.post("/api/service/stays", formData);
      const loadUser = useAuthStore.getState().loadUser;
      await loadUser();
      const payload = data.data || data;
      set({ profile: payload });
      set({ facilities: payload?.facilities ? Object.entries(payload.facilities) : [] });
      set({ isFetching: false });
      toast.success("Hotel profile created successfully!");
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  },

  loadProfile: async () => {
    try {
      set({ isFetching: true })
      // Fetch the stays profile for the current provider
      const { data } = await api.get("/api/service/stays/profile");
      const payload = data?.data || data;
      const profileData = payload || null;
      const normalizedProfile = profileData ? { ...profileData, rooms: profileData.rooms || [] } : null;
      set({ profile: normalizedProfile });
      set({ facilities: normalizedProfile?.facilities ? Object.entries(normalizedProfile.facilities) : [] });
      set({ isFetching: false })
    } catch (error) {
      console.error(error);
      set({ profile: null })
      set({ isFetching: false })
    }
  },

  updateDescription: async (description) => {
    try {
      await api.put("/api/service/stays", description);
      toast.success("Description updated successfully!")
    } catch (error) {
      toast.error(error?.message);
    }
  },



  // Rooms
  roomType: null,
  bedType: null,
  price: null,
  maxGuest: null,
  image: null,
  WIFI: false,
  AC: false,

  setRoomType: (value) => set({ roomType: value }),
  setBedType: (value) => set({ bedType: value }),
  setPrice: (value) => set({ price: value }),
  setMaxGuest: (value) => set({ maxGuest: value }),
  setWifi: (value) => set({WIFI:value}),
  setAc: (value) => set({AC:value}),
  setImage: (img) => set({ image: img }),

  addRoom: async (e) => {
    e.preventDefault();

    const {
      roomType,
      bedType,
      price,
      image,
      maxGuest,
      AC,
      WIFI,
      loadProfile
    } = get();

    const formData = {
      roomType,
      bedType,
      price,
      image,
      maxGuest,
      facilites: {
        AC,
        WIFI
      }

    }
    try {
      await api.post("/api/service/stays/rooms", formData);
      await loadProfile();
      toast.success("Room added Sucessfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  deleteRoom:async(id)=>{
    const {loadProfile} = get();
    try {
      await api.delete(`/api/service/stays/rooms/${id}`);
      await loadProfile();
      toast.success("Room Deleted Sucessfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }


}));
