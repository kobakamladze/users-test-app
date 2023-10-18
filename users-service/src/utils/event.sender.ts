import axios from "axios";
import { config } from "dotenv";
config();

const EVENTS_SERVICE_URL =
  process.env.EVENTS_SERVICE_URL || "http://events_service:3000";

interface EventType {
  userId: number;
  eventType: string;
}

async function sendEvent({ userId, eventType }: EventType) {
  try {
    await axios.post(`${EVENTS_SERVICE_URL}/api/events/create`, {
      userId,
      eventType,
    });

    return;
  } catch (error) {
    console.error(error);
  }
}

export default sendEvent;
