import { create } from "zustand";
import { api } from "../config/api";

export const useTaxiStore = create((set, get) => ({
    // ---------- STATE ----------
    profile:null,

    driverName: null,
    nic: null,
    drivingId: null,
    profilePic: null,
    nicImg: null,
    drivingIdImg: null,
    contact1: null,
    contact2: null,
    email: null,
    website: null,
    image1: null,
    image2: null,
    image3: null,
    chasyNo: null,
    vehicleNo: null,
    province: null,
    vehicleType: null,
    perKm: null,
    location: null,
    aggree: false,
    currentIndex: 0,

    // ---------- SETTERS ----------
    setDriverName: (driverName) => set({ driverName }),
    setNic: (nic) => set({ nic }),
    setDrivingId: (drivingId) => set({ drivingId }),
    setProfilePic: (profilePic) => set({ profilePic }),
    setNicImg: (nicImg) => set({ nicImg }),
    setDrivingIdImg: (drivingIdImg) => set({ drivingIdImg }),
    setContact1: (contact1) => set({ contact1 }),
    setContact2: (contact2) => set({ contact2 }),
    setEmail: (email) => set({ email }),
    setWebsite: (website) => set({ website }),
    setImage1: (image1) => set({ image1 }),
    setImage2: (image2) => set({ image2 }),
    setImage3: (image3) => set({ image3 }),
    setChasyNo: (chasyNo) => set({ chasyNo }),
    setVehicleNo: (vehicleNo) => set({ vehicleNo }),
    setProvince: (province) => set({ province }),
    setVehicleType: (vehicleType) => set({ vehicleType }),
    setPerKm: (perKm) => set({ perKm }),
    setLocation: (location) => set({ location }),
    setAggree: (aggree) => set({ aggree }),
    setCurrentIndex: (currentIndex) => set({ currentIndex }),

    // ---------- SUBMIT ----------
    submit: async () => {
        const {
            driverName,
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
            location,
            aggree,
        } = get();

        if (!aggree) {
            throw new Error("You must agree to terms and conditions");
        }

        const formData = {
            driverName,
            nic,
            drivingId,
            profilePic,
            nicImg,
            drivingIdImg,
            contact: [contact1, contact2],
            email,
            website,
            images: [image1, image2, image3],
            chasyNo,
            vehicleNo,
            province,
            vehicleType,
            perKm: Number(perKm),
            location,
        };

        try {
            const { data } = await api.post("/service/taxi", formData);
            set({profile:data})
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Something went wrong");
        }
    },
}));
