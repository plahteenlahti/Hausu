export type Apartment = {
  id: string; // Unique identifier, can use something like UUID.
  name: string; // Name or title of the apartment.
  address: string; // Address of the apartment.
  purchaseCost: number; // Cost at which the apartment was purchased.
  monthlyRentalIncome: number; // Income from rent every month.
  monthlyExpenses: number; // Sum of all monthly expenses related to this apartment.
  imageUrl?: string; // Optional image URL, can be a local path or web URL.
  notes?: string; // Optional notes or description about the apartment.
  squareFootage: number; // Area of the apartment in square feet.
};

export const apartments: Apartment[] = [
  {
    id: "1",
    name: "Kallio Retreat",
    address: "Kaikukatu 4, 00530 Helsinki",
    purchaseCost: 480000,
    monthlyRentalIncome: 900,
    monthlyExpenses: 700,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2580&q=80",
    notes:
      "A stylish apartment in the vibrant Kallio district. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique necessitatibus impedit laudantium fuga nemo voluptatum, culpa sapiente deserunt ut, ipsum debitis dignissimos eligendi, voluptate beatae qui aspernatur quasi molestias? Magni.",
    squareFootage: 32
  },
  {
    id: "2",
    name: "Eira",
    address: "Tehtaankatu 10, 00140 Helsinki",
    purchaseCost: 520000,
    monthlyRentalIncome: 1200,
    monthlyExpenses: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2580&q=80",
    notes: "An elegant property in the prestigious Eira district.",
    squareFootage: 45
  },
  {
    id: "3",
    name: "Punavuori Paradise",
    address: "Punavuorenkatu 22, 00150 Helsinki",
    purchaseCost: 500000,
    monthlyRentalIncome: 1600,
    monthlyExpenses: 730,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2580&q=80",
    notes: "A cozy property in the heart of Punavuori.",
    squareFootage: 77
  }
];
