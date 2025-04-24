import React from "react";
import { Card, CardContent,Button } from "@mui/material";

import { motion } from "framer-motion";
import { AlertCircle, ShieldCheck, Car, Baby, Beer, AlertTriangle, Activity, Users, HeartPulse, Thermometer, Biohazard, UserCheck, Radiation, Brain, SmilePlus } from "lucide-react";

const awarenessTopics = [
  {
    color: "bg-red-500",
    title: "Red Means Responsibility",
    content: "Stop. Think. Act. It's not just a signal — it's a life pause.",
    icon: <AlertCircle className="text-white w-8 h-8" />,
  },
  {
    color: "bg-yellow-400",
    title: "Yellow Means You Matter",
    content: "A reminder to slow down and value your life.",
    icon: <AlertTriangle className="text-white w-8 h-8" />,
  },
  {
    color: "bg-green-500",
    title: "Green Means Go Smart",
    content: "Proceed only when safe. Green is permission — not pressure.",
    icon: <ShieldCheck className="text-white w-8 h-8" />,
  },
  {
    color: "bg-gray-800",
    title: "Helmet is Not Just Gear — It's a Guard",
    content: "Your Life Deserves a Second Chance. A Helmet Gives You That. Kids too need helmets — not just adults.",
    icon: <Activity className="text-white w-8 h-8" />,
    tagline: "Cover your head, not your regrets."
  },
  {
    color: "bg-blue-600",
    title: "Seatbelt Awareness",
    content: "Click before you shift — one second of effort saves a lifetime of regret. Back seat belts save lives too!",
    icon: <Car className="text-white w-8 h-8" />,
    tagline: "Seatbelt — because you’re priceless."
  },
  {
    color: "bg-pink-600",
    title: "Drunk Driving Destroys Lives",
    content: "Don’t drive high — stay alive. One drink can blur your future. Alcohol impairs judgement faster than you think.",
    icon: <Beer className="text-white w-8 h-8" />,
    tagline: "Drive sober or don’t drive at all."
  },
  {
    color: "bg-orange-500",
    title: "Speeding: Thrill Can Kill",
    content: "Speeding might save minutes, but can cost lives. Every +10 km/h increases fatal crash risk significantly.",
    icon: <AlertTriangle style={{color:"yellow"}} />,
    tagline: "Better late than never — speed thrills but kills."
  },
  {
    color: "bg-purple-700",
    title: "Kids’ Road Safety",
    content: "Children learn by watching — be the example. Teach them to cross at zebra crossings and follow signals. Never let them sit in the front seat under age 12.",
    icon: <Baby className="text-white w-8 h-8" />,
    tagline: "Safe kids. Safe future."
  },
  {
    color: "bg-teal-600",
    title: "Every Road User Matters",
    content: "From two-wheelers to pedestrians — safety is everyone’s right and responsibility.",
    icon: <Users className="text-white w-8 h-8" />,
  },
  {
    color: "bg-rose-600",
    title: "Heart Health Awareness",
    content: "Regular exercise, a healthy diet, and stress management reduce heart disease risk.",
    icon: <HeartPulse style={{color:"black"}} />,
    tagline: "Keep your heart in check — it's the rhythm of your life."
  },
  {
    color: "bg-cyan-600",
    title: "Fever & Infection Prevention",
    content: "Wash hands frequently, avoid touching face, and consult a doctor early.",
    icon: <Thermometer className="text-white w-8 h-8" />,
    tagline: "Stay cool. Stay safe."
  },
  {
    color: "bg-indigo-700",
    title: "COVID-19 Awareness",
    content: "Wear masks, maintain social distancing, and get vaccinated.",
    icon: <Biohazard className="text-white w-8 h-8" />,
    tagline: "Together we fight. Together we win."
  },
  {
    color: "bg-lime-600",
    title: "Regular Health Checkups",
    content: "Routine checkups help detect problems early — prevention is better than cure.",
    icon: <UserCheck className="text-white w-8 h-8" />,
    tagline: "Know your numbers. Know your health."
  },
  {
    color: "bg-fuchsia-600",
    title: "Radiation Safety",
    content: "Avoid excessive exposure. Use protective equipment where necessary.",
    icon: <Radiation className="text-white w-8 h-8" />,
    tagline: "Invisible danger. Visible caution."
  },
  {
    color: "bg-yellow-700",
    title: "Mental Health Awareness",
    content: "Talk about it. Seek help. You are not alone.",
    icon: <Brain className="text-white w-8 h-8" />,
    tagline: "It’s okay to not be okay."
  },
  {
    color: "bg-emerald-700",
    title: "Hygiene and Sanitation",
    content: "Clean hands save lives. Use toilets, wash hands, and keep surroundings clean.",
    icon: <SmilePlus style={{color:"greeny"}} />,
    tagline: "Cleanliness is safety."
  }
];

export default function TrafficolorAwarenessPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-blue">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚦 Trafficolor - The Language of the Road & Health
      </motion.h1>
      <motion.p
        className="text-center text-lg md:text-xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Understand Safety. Embrace Wellness. Save Lives.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awarenessTopics.map((tip, index) => (

            <>
          <motion.div
            key={index}
            className={`rounded-2xl   p-4`}
            initial={{ opacity: 0, y: 50 }}
            style={{ backgroundColor:tip.color.split("-")[1],
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginBottom: "20px",
          


             }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div  >
              {tip.icon}
              <h2 className="text-xl font-bold">{tip.title}</h2>
            </div>
            <p className="text-base mb-2">{tip.content}</p>
            {tip.tagline && <p className="italic text-sm mt-2">Tagline: <strong>{tip.tagline}</strong></p>}

          </motion.div>

          <br />
            </>
        
        ))}
      </div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-4">🚨 Want to Spread Awareness Further?</h3>
        <p className="mb-2">📸 Spot an unsafe or unhealthy act? Upload and tag us. Let’s build a safer and healthier India together.</p>
        <Button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold mt-4">Join the Movement</Button>
      </motion.div>
    </div>
  );
}
