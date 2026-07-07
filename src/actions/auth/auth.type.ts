export type Me = {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN';
  businessId: string;
  businessName: string;
  staffId: string | null;
};
