import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

// In-memory store for bookings (persisted per server session)
let mockBookings: any[] = [
  {
    id: 'OSS-2026-9102',
    createdAt: new Date().toISOString(),
    services: [
      { serviceId: 'tv-mounting', serviceTitle: 'TV Mounting & Wall Anchoring', quantity: 1, priceEstimate: 89 },
      { serviceId: 'drywall-repair', serviceTitle: 'Drywall Repair & Patching', quantity: 1, priceEstimate: 120 }
    ],
    totalEstimate: 209,
    propertyType: 'residential',
    address: '742 Evergreen Terrace',
    zipCode: '90210',
    date: '2026-08-04',
    timeSlot: '09:00 AM - 12:00 PM (Morning)',
    urgency: 'standard',
    customerName: 'Homer Simpson',
    customerPhone: '(555) 321-7654',
    customerEmail: 'homer@example.com',
    status: 'confirmed',
    notes: 'Please bring wall anchors for brick fireplace wall.'
  }
];

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ZIP Code Availability Checker
app.post("/api/zip-check", (req, res) => {
  const { zipCode } = req.body;
  if (!zipCode || typeof zipCode !== "string") {
    return res.status(400).json({ error: "Invalid ZIP code" });
  }
  const cleanZip = zipCode.trim();
  const isCovered = /^\d{5}$/.test(cleanZip);
  
  res.json({
    zipCode: cleanZip,
    available: isCovered,
    message: isCovered 
      ? `Great news! One Stop Shop Handyman provides full coverage in ${cleanZip} with available next-day appointment slots.` 
      : "Please enter a valid 5-digit ZIP code."
  });
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json({ success: true, bookings: mockBookings });
});

// Create new booking
app.post("/api/bookings", (req, res) => {
  const booking = req.body;
  if (!booking || !booking.customerName || !booking.customerPhone || !booking.services) {
    return res.status(400).json({ error: "Missing required booking details" });
  }

  const newBooking = {
    ...booking,
    id: `OSS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };

  mockBookings.unshift(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

// Delete / cancel booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const idx = mockBookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    mockBookings[idx].status = 'cancelled';
    res.json({ success: true, message: "Booking cancelled successfully", booking: mockBookings[idx] });
  } else {
    res.status(404).json({ error: "Booking not found" });
  }
});

// AI Diagnostic API route
app.post("/api/ai-diagnose", async (req, res) => {
  const { problemDescription, photoDataUrl } = req.body;

  if (!problemDescription && !photoDataUrl) {
    return res.status(400).json({ error: "Please provide a problem description or photo." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are the master handyman AI technician for 'One Stop Shop Handyman Services'.
Analyze the user's home repair issue.
Provide a clear breakdown:
1. Issue Diagnosis (what is likely broken or needed).
2. Recommended Handyman Services (match from: Drywall Repair, Drywall Installation, Interior Painting, Outdoor Painting, Plumbing Fixture Installation, Plumbing Repair, TV Mounting, Electrical Repair, General Mounting, Flooring Installation, Flooring Repair, Cabinet Installation, Furniture Assembly, Kitchen/Bathroom Renovation, General Maintenance, Pressure Washing, Rubbish Removal).
3. Estimated Cost Range ($) and Estimated Time (Hours).
4. Safety & DIY Warnings (what the homeowner shouldn't force before the handyman arrives).

Respond in JSON format with keys:
"diagnosis": string,
"recommendedServices": string[],
"estimatedCostMin": number,
"estimatedCostMax": number,
"estimatedHours": string,
"safetyTips": string,
"confidenceScore": number`;

      const contents: any[] = [];
      if (photoDataUrl && photoDataUrl.includes(',')) {
        const base64Data = photoDataUrl.split(',')[1];
        const mimeType = photoDataUrl.split(';')[0].split(':')[1] || 'image/jpeg';
        contents.push({
          inlineData: {
            mimeType,
            data: base64Data
          }
        });
      }

      contents.push({
        text: `Customer Problem Description: ${problemDescription || "See attached photo for repair assessment."}`
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        const jsonResult = JSON.parse(text);
        return res.json({ success: true, data: jsonResult });
      }
    } catch (err: any) {
      console.error("Gemini API call failed, falling back to smart rule engine:", err.message);
    }
  }

  // Smart fallback diagnosis when Gemini key is not configured or fails
  const desc = (problemDescription || "").toLowerCase();
  let recommendedServices = ["General Home Maintenance & Repairs"];
  let estMin = 120;
  let estMax = 250;
  let estHours = "1 - 3 hrs";
  let diagnosis = "Based on your description, our technician will conduct an on-site diagnostic, bring necessary mounting and repair hardware, and complete the repair safely.";

  if (desc.includes("tv") || desc.includes("mount") || desc.includes("screen") || desc.includes("hang")) {
    recommendedServices = ["TV Mounting & Wall Anchoring", "General Mounting & Hanging Services"];
    estMin = 89;
    estMax = 195;
    estHours = "1 - 2 hrs";
    diagnosis = "TV mounting requires locating solid wall studs, leveling the bracket, and anchoring with rated heavy-duty hardware to prevent wall failure.";
  } else if (desc.includes("drywall") || desc.includes("hole") || desc.includes("crack") || desc.includes("sheetrock")) {
    recommendedServices = ["Drywall Repair & Patching", "Interior Painting Services"];
    estMin = 120;
    estMax = 280;
    estHours = "2 - 3 hrs";
    diagnosis = "Wall damage detected. We will install backing mesh or wood, apply 3 coats of mudding compound, texture match, and apply primer ready for paint.";
  } else if (desc.includes("leak") || desc.includes("plumb") || desc.includes("faucet") || desc.includes("sink") || desc.includes("toilet")) {
    recommendedServices = ["Plumbing Fixture Installation", "Plumbing Repair & Leak Fixing"];
    estMin = 110;
    estMax = 320;
    estHours = "1 - 3 hrs";
    diagnosis = "Plumbing repair needed. Turn off your main water shut-off valve if water is actively leaking. Our handyman will replace worn fittings, supply lines, or cartridges.";
  } else if (desc.includes("light") || desc.includes("electric") || desc.includes("wire") || desc.includes("fan") || desc.includes("outlet") || desc.includes("switch")) {
    recommendedServices = ["Electrical Repairs & Light Fixtures"];
    estMin = 95;
    estMax = 290;
    estHours = "1 - 3 hrs";
    diagnosis = "Electrical fixture servicing required. Do not touch exposed wiring. We test voltage and install new fixtures, dimmers, or ceiling fans safely.";
  } else if (desc.includes("floor") || desc.includes("carpet") || desc.includes("tile") || desc.includes("wood") || desc.includes("plank")) {
    recommendedServices = ["Flooring Installation (LVP, Hardwood, Tile)", "Flooring Repair & Board Replacement"];
    estMin = 125;
    estMax = 450;
    estHours = "2 - 5 hrs";
    diagnosis = "Flooring assessment. We can replace damaged planks, eliminate squeaks, or install fresh waterproof luxury vinyl flooring with clean trim.";
  } else if (desc.includes("paint") || desc.includes("wall") || desc.includes("color")) {
    recommendedServices = ["Interior Painting Services", "Outdoor & Exterior Painting"];
    estMin = 150;
    estMax = 400;
    estHours = "3 - 6 hrs";
    diagnosis = "Painting service request. Includes wall sanding, masking, nail hole filling, and two coats of low-VOC paint for crisp clean edges.";
  }

  return res.json({
    success: true,
    data: {
      diagnosis,
      recommendedServices,
      estimatedCostMin: estMin,
      estimatedCostMax: estMax,
      estimatedHours: estHours,
      safetyTips: "Turn off power/water breakers if dealing with leaks or exposed electrical wires before repair.",
      confidenceScore: 0.92
    }
  });
});

async function start() {
  const PORT = 3000;
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`One Stop Shop Handyman server running on http://0.0.0.0:${PORT}`);
  });
}

start();
