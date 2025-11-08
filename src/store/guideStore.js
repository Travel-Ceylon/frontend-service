import { create } from "zustand";
import { api } from "../config/api";
import toast from "react-hot-toast";

export const useGuideStore = create((set, get) => ({

    profile:null,

    name: null,
    nic: null,
    contact1: null,
    contact2: null,
    email: null,
    profilePic: null,
    province: null,
    district: null,
    city: null,
    english: false,
    sinhala: false,
    french: false,
    german: false,
    tamil: false,
    history: false,
    wildLife: false,
    adventure: false,
    price: null,
    guideLicenceImg: null,
    policeClearanceImg: null,
    aggree: false,
    currentIndex: 0,

    // Setters
    setName: (name) => set({ name }),
    setNic: (nic) => set({ nic }),
    setContact1: (contact1) => set({ contact1 }),
    setContact2: (contact2) => set({ contact2 }),
    setEmail: (email) => set({ email }),
    setProfilePic: (profilePic) => set({ profilePic }),
    setProvince: (province) => set({ province }),
    setDistrict: (district) => set({ district }),
    setCity: (city) => set({ city }),
    setEnglish: (english) => set({ english }),
    setSinhala: (sinhala) => set({ sinhala }),
    setFrench: (french) => set({ french }),
    setGerman: (german) => set({ german }),
    setTamil: (tamil) => set({ tamil }),
    setHistory: (history) => set({ history }),
    setWildLife: (wildLife) => set({ wildLife }),
    setAdventure: (adventure) => set({ adventure }),
    setPrice: (price) => set({ price }),
    setGuideLicenceImg: (guideLicenceImg) => set({ guideLicenceImg }),
    setPoliceClearanceImg: (policeClearanceImg) => set({ policeClearanceImg }),
    setAggree: (aggree) => set({ aggree }),
    setCurrentIndex: (currentIndex) => set({ currentIndex }),

    submit: async () => {
        const {
            name,
            nic,
            contact1,
            contact2,
            email,
            profilePic,
            province,
            district,
            city,
            english,
            sinhala,
            french,
            german,
            tamil,
            history,
            wildLife,
            adventure,
            price,
            guideLicenceImg,
            policeClearanceImg,
            aggree,
        } = get();

        if (!aggree) {
            toast.error("You must agree to terms and conditions");
            return;
        }

        const formData = {
            name,
            nic,
            contact: [contact1, contact2],
            profilePic,
            email,
            province,
            district,
            city,
            languages: { english, sinhala, french, german, tamil },
            specializeArea: { history, wildLife, adventure },
            guideLicenceImg,
            policeClearanceImg,
            price: Number(price),
        };

        try {
            const { data } = await api.post("/service/guide", formData);
            set({profile:data})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },
}));
