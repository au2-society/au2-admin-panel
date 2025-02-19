export interface IAdmin {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  bio: string;
  avatar: string;
  coverImage: string;
  email: string;
  role: "admin" | "superadmin";
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TAdmin = Partial<Omit<IAdmin, "id" | "createdAt" | "updatedAt">>;

export interface IEvent {
  _id: string;
  photo: string;
  heading: string;
  subHeading: string;
  category: string;
  date: string;
  venue: string;
  time: string;
  description: string;
  society: "Tech Path Finder" | "Minded Peers";
  dutyLeaveInfo: string;
  owner: {
    _id: string;
    phoneNumber: string;
    fullName: string;
    email: string;
  };
  isActive: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export type TEvent = Partial<Omit<IEvent, "id" | "createdAt" | "updatedAt">>;
