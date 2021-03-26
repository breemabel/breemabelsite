import { Venue } from "./venue.interface";

export interface Event {
  venue: Venue;
  coverPhotoUrl: String;
  headerLogoUrl: String;
  startDate: String;
  supportEmail: String;
  timezone: String;
  endDate: String;
  modified: String;
  websiteUrl: String;
  status: String;
  name: String;
  type: String[];
  id: number;
}
