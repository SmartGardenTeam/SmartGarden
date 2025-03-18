export interface GardenModel {
  id: string;
  name: string;
  owner: {
    id: string;
    username: string;
    email: string;
  };
  creationDate: Date;
}
