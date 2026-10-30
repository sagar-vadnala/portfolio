import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "carepilot",
    name: "CarePilot",
    tagline:
      "An AI medical scribe: visit audio recorded in the browser, streamed in real time over Socket.io, and posted back into the right EHR.",
    badge: "Largest contributor · 215 of 391 commits",
    problem:
      "An AI scribe is only as good as the audio it receives. Visit recordings have to survive flaky clinic networks and out-of-order packets without corrupting the transcript — and every finished visit has to land in the correct patient context across several EHR vendors.",
    solution:
      "I built the browser recording interface that streams audio over Socket.io with voice-activity detection and sequence-indexed chunks, keeps recording through network drops, and replays buffered audio on reconnect — plus SMART-on-FHIR launch flows that post each visit back to the right EHR context.",
    architecture: [
      {
        title: "Capture",
        description: "Browser audio capture with voice-activity detection, so only speech gets streamed.",
      },
      {
        title: "Chunk & index",
        description: "Audio is base64-encoded, split into chunks, and stamped with a sequence index.",
      },
      {
        title: "Stream",
        description:
          "A singleton Socket.io manager owns the connection, eliminating duplicate-connection race conditions.",
      },
      {
        title: "Survive drops",
        description:
          "Client-side buffering keeps recording through network drops and replays queued chunks on reconnect.",
      },
      {
        title: "Reassemble",
        description: "Sequence indexes keep the transcript correct even when packets arrive out of order.",
      },
      {
        title: "Post to the EHR",
        description:
          "SMART-on-FHIR OAuth launch carries practitioner and clinic identifiers, so each visit posts back to the correct EHR context.",
      },
    ],
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "Socket.io",
      "SMART-on-FHIR",
      "Firebase Firestore",
      "Docker",
      "Jest",
      "React Testing Library",
    ],
    contributions: [
      "Built the real-time recording interface: browser audio streamed over Socket.io with voice-activity detection, base64 chunk splitting, and sequence-indexed ordering so transcripts stay correct under packet reordering.",
      "Implemented pause/resume recording with client-side buffering that keeps recording through network drops and replays chunks on reconnect, plus a singleton socket manager that eliminated duplicate-connection race conditions.",
      "Integrated SMART-on-FHIR OAuth launch flows for Epic, Cerner, Athena, and eClinicalWorks, wiring practitioner and clinic identifiers so visits post back to the correct EHR context.",
      "Shipped four clinical analytics dashboards with date-range filtering, weekly aggregation, interactive tooltips, and responsive charts.",
      "Migrated persistence to Firebase Firestore with a PHI-redacting structured logger and correlation IDs for cross-service tracing.",
      "Set up a four-environment CI/CD pipeline (dev/QA/demo/prod) with a branch-parameterized Docker image, and wrote Jest + React Testing Library coverage under enforced TypeScript strict mode.",
    ],
    results: [
      "Largest contributor: 215 of 391 commits across a 34k-line TypeScript codebase.",
      "EHR launch support for Epic, Cerner, Athena, and eClinicalWorks.",
      "Four clinical analytics dashboards and a four-environment (dev/QA/demo/prod) delivery pipeline.",
    ],
    links: [],
    featured: true,
  },
  {
    slug: "car-rental-app",
    name: "Car Rental App",
    tagline:
      "A cross-platform booking app — maps, OTP sign-in, payments, and invoices — shipped to Android and iOS from one Flutter codebase.",
    problem:
      "Renting a car from a phone touches auth, location, payments, and invoicing, and all of it has to feel native on both Android and iOS — without the cost of maintaining two separate codebases.",
    solution:
      "A single Flutter codebase with Firebase Auth (email and phone OTP, Google, Apple), Google Maps pickup selection, MyFatoorah checkout, and PDF invoices — structured with Riverpod, auto_route, Hive, and Dio.",
    architecture: [
      {
        title: "Sign in",
        description: "Firebase Auth with email and phone OTP, Google Sign-In, and Sign in with Apple.",
      },
      {
        title: "Pick up",
        description: "Google Maps with Geolocator and Geocoding for location and pickup selection.",
      },
      {
        title: "Book & pay",
        description: "Booking and checkout with discounts, paid through the MyFatoorah payment gateway.",
      },
      {
        title: "After the trip",
        description: "PDF invoice generation, FCM push notifications, and reviews.",
      },
      {
        title: "Under the hood",
        description:
          "Riverpod for state, auto_route for navigation, Hive for local storage, and Dio for networking, with multilingual localization throughout.",
      },
    ],
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "Google Maps", "MyFatoorah", "Hive", "Dio"],
    contributions: [
      "Built the booking app and shipped it to Android and iOS from a single Flutter codebase.",
      "Implemented Firebase Auth (email and phone OTP), Google Sign-In, Sign in with Apple, and FCM notifications.",
      "Integrated Google Maps with Geolocator/Geocoding for location and pickup selection, the MyFatoorah payment gateway for checkout, and PDF invoice generation.",
      "Architected the app with Riverpod, auto_route, Hive, and Dio, delivering onboarding, booking, checkout with discounts, reviews, and multilingual localization.",
    ],
    results: [
      "Shipped to Android and iOS from a single Flutter codebase.",
      "End-to-end flow: onboarding, booking, discounted checkout, invoices, and reviews.",
      "Multilingual localization across the whole app.",
    ],
    links: [],
    featured: true,
  },
];
