import heroBg from '../assets/hero_bg.jpg';
import shareLocation from '../assets/share_location.svg';
import taxiAlert from '../assets/taxi_alert.svg';
import stays from '../assets/stays.svg';
import collage from '../assets/collage.png';
import travelMan from '../assets/travel_man.jpg';
import followSign from '../assets/follow_the_signs.svg';
import kingBed from '../assets/king_bed.svg';
import localTaxi from '../assets/local_taxi.svg';
import star from '../assets/star.png';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';
import womenWithHand from '../assets/women_with_hand.png';
import r1 from '../assets/r1.svg';
import r2 from '../assets/r2.svg';
import r3 from '../assets/r3.svg';
import r4 from '../assets/r4.svg';
import r5 from '../assets/r5.svg';
import Stays_hero_section from '../assets/Stays_hero_section.png'
import Central from '../assets/Central.jpg';
import Estern from '../assets/Eastern.jpg';
import North from '../assets/North.jpg';
import NorthWestern from '../assets/NorthWestern.jpg';
import Sabaragamuwa from '../assets/Sabaragamuwa.jpg';
import Northern from '../assets/Northern.jpg';
import Southern from '../assets/Southern.jpg';
import Uva from '../assets/Uva.jpg';
import Western from '../assets/Western.jpg';
import Bt_bg from '../assets/Bt_bg.jpg';
import login_img from '../assets/login_img.png';
import register_img from '../assets/register_img.png';
import searchMan from '../assets/SearchMan.jpg'
import taxiBanner from '../assets/taxiBanner.jpg';
import taxibtm from '../assets/taxibtm.png';
import StaysOffer1 from '../assets/StaysOffer1.svg';
import StaysOffer2 from '../assets/staysOffer2.svg';
import StaysOffer3 from '../assets/StaysOffer3.svg';
import StaysOffer4 from '../assets/StaysOffer4.svg';

import businessman from '../assets/businessmanV2.png';

import fb from '../assets/fb.svg';
import whatsapp from '../assets/whatsapp.svg';
import instagram from '../assets/instagram.svg';
import email from '../assets/email.svg';
import google from '../assets/google.svg';
import fb_color from '../assets/fb_color.svg';

import tick from '../assets/tick.svg';
import close from '../assets/close.svg';
import userBg from '../assets/userBg.jpg';
import new_bg from '../assets/new_bg.png';

import bikes from '../assets/bikes.png';
import buses from '../assets/buses.png';
import cars from '../assets/cars.png';
import tuktuk from '../assets/tuktuk.png';

import hotel1 from '../assets/hotel1.jpg';
import hotel2 from '../assets/hotel2.jpg';
import hotel3 from '../assets/hotel3.jpg';
import taxiBg from '../assets/taxiBg.jpg';

// Hotel facility icons
import breakfastIcon from '../assets/breakfastIcon.png';
import poolIcon from '../assets/poolIcon.png';
import busIcon from '../assets/busIcon.png';
import parkingIcon from '../assets/parkingIcon.png';

// Guide assets
import guide_cover from "../assets/guide_cover.jpg";
import guide1 from "../assets/guide1.svg";
import guide2 from "../assets/guide2.svg";
import guide3 from "../assets/guide3.svg";
import guide4 from "../assets/guide4.svg";
import guider from "../assets/guider.png";
import kandy from "../assets/places/Kandy.png";
import ella from "../assets/places/Ella.png";
import yala from "../assets/places/Yala.png";
import tissa from "../assets/places/Tissa.png";
import jaffna from "../assets/places/Jaffna.png";
import galle from "../assets/places/Galle.png";

const visitCardList = [
    {
        title: "Stays",
        icon: kingBed,
        desc: "1000+ Hotels and stays for you",
        to: '/stays'
    },
    {
        title: "Rides",
        icon: localTaxi,
        desc: "Comfortable and safe rides anytime",
        to:"/taxi"
    },
    {
        title: "Guides",
        icon: followSign,
        desc: "Discover places with local experts",
        to:"guides"
    }
]

const taxiTypeCard = [
    {
        name: "Bikes",
        start: "$3.00",
        img:bikes
    },
    {
        name: "TukTuks",
        start: "$4.00",
        img:tuktuk
    },
    {
        name: "Cars",
        start: "$5.00",
        img:cars
    },
    {
        name: "Vans",
        start: "$7.00",
        img:buses
    }
]

const testimonials = [
    {
        user: 'Sofia',
        country: 'Germany',
        text:
            'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
        rating: 4,
        img: user1,
    },
    {
        user: 'Zara',
        country: 'Canada',
        text:
            'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
        rating: 5,
        img: user2,
    },
    {
        user: 'Jean-Luc',
        country: 'United Kingdom',
        text:
            'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
        rating: 5,
        img: user3,
    }
];

const provinces = [
    { Image: Southern, title: "Southern Province", description: "Sun, Sand, and Serendipity" },
    { Image: Estern, title: "Eastern Province", description: "Where the Island Breezes" },
    { Image: Uva, title: "Uva Province", description: "Nature's Playgrounds" },
    { Image: Western, title: "Western Province", description: "City Vibes, Coastal Charms" },
    { Image: Northern, title: "Nothern Province", description: "Ancient Soul, Modern Vibe" },
    { Image: Sabaragamuwa, title: "Sabaragamuwa Province", description: "Hidden Gems Awaitts" },
    { Image: Central, title: "Central Province", description: "Hill Country Heartbeat" },
    { Image: NorthWestern, title: "North Western Province", description: "History Untouched" },
    { Image: North, title: "North Central Province", description: "Land of Legends" }
]

const locations = [
    {
        title: "Top Attractions",
        items: [
            { name: "Tissamaharama Raja Maha Vihara", distance: "02 km" },
            { name: "Yatala Raja Maha Vihara", distance: "04 km" },
            { name: "Kataragama Dewalaya", distance: "17 km" },
            { name: "Sithulpawwa temple", distance: "23 km" }
        ]
    },
    {
        title: "Nature",
        items: [
            { name: "Yala National Park", distance: "25 km" },
            { name: "Bundala Bird Sanctuary", distance: "15 km" },
            { name: "Lunugamwehera National Park", distance: "14 km" },
            { name: "Lunugamwehera Tank", distance: "10 km" },
            { name: "Debarawewa Bird sanctuary", distance: "02 km" },
            { name: "Kirinda Beach", distance: "15 km" },
            { name: "Andagala Beach", distance: "12 km" }
        ]
    },
    {
        title: "Practical Access",
        items: [
            { name: "Tissamaharama Bus stand", distance: "02 km" },
            { name: "Southern Express way", distance: "18 km" },
            { name: "Mattala International Airport", distance: "24 km" },
            { name: "Beliatta Railway", distance: "63 km" }
        ]
    }
];

const heroSlides = [
    { image: heroBg, heading: "Dream it - Plan it", subheading: "We’ll make it happen", description: "Your travel dreams, our responsibility" },
    { image: Bt_bg, heading: "Explore - Experience", subheading: "Live your adventure", description: "Curated trips with local experts" },
    { image: new_bg, heading: "Relax - Rejuvenate", subheading: "Your island escape", description: "Luxury stays at your fingertips" },
];

const staysOffers = [
    { image: StaysOffer1, heading: "Early Check-in Privilege", description: "Arriving before standard check-in time? We’ll do our best to get your room ready early so you can relax or freshen up right away." },
    { image: StaysOffer2, heading: "Special In-Room Amenities", description: "From bathrobes and spa kits to curated snacks or welcome flowers, enjoy thoughtful touches that elevate your comfort" },
    { image: StaysOffer3, heading: "Secure Booking Guarantee", description: "All bookings are protected with advanced encryption and instant confirmations, so you can plan with peace of mind." },
    { image: StaysOffer4, heading: "Complimentary Airport Pickup", description: "Enjoy smooth airport-to-hotel transfers arranged by your host. It's free, punctual, and stress-free—no taxis or waiting in lines" }
];

const hotelData = [
  {
    id: "hotel-1",
    name: "Hotel Paradise",
    location: "Colombo",
    rooms: [
      { id: "room-1", type: "Standard Double Room", price: 120 },
      { id: "room-2", type: "Standard Twin Room", price: 150 },
    ],
  },
  {
    id: "hotel-2",
    name: "Ocean View Resort",
    location: "Galle",
    rooms: [
      { id: "room-3", type: "Standard Double Room", price: 100 },
      { id: "room-4", type: "Standard Twin Room", price: 140 },
    ],
  },
];

export const asserts = {
    heroBg,
    shareLocation,
    taxiAlert,
    stays,
    collage,
    travelMan,
    followSign,
    kingBed,
    localTaxi,
    visitCardList,
    star,
    user1,
    testimonials,
    womenWithHand,
    taxiBanner,
    taxibtm,
    r1,
    r2,
    r3,
    r4,
    r5,
    provinces,
    Stays_hero_section,
    Bt_bg,
    fb,
    whatsapp,
    email,
    instagram,
    tick,
    close,
    login_img,
    register_img,
    taxiBg,
    google,
    fb_color,
    userBg,
    new_bg,
    heroSlides,
    hotel1,
    hotel3,
    hotel2,
    searchMan,
    staysOffers,
    businessman,
    locations,
    taxiTypeCard,
    breakfastIcon,
    poolIcon,   
    busIcon,
    parkingIcon,
    hotelData,
    guide_cover,
    guide1,
    guide2,
    guide3,
    guide4,
    guider,
    kandy,
    ella,
    yala,
    tissa,
    jaffna,
    galle
}
