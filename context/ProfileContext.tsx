import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  picture: string;
};

type ProfileContextType = {
  user: UserProfile;
  updateUser: (newUserData: Partial<UserProfile>) => void;
};

const defaultUser = {
  name: 'Le Thanh Tai',
  email: '22521276@gm.uit.edu.vn',
  phone: '0356356497',
  address: 'Ho Chi Minh City, Vietnam',
  picture: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1733161834/mnbu7jum3zitwhciwjhn.jpg',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateUser = (newUserData: Partial<UserProfile>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ user, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
