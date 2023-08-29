export interface Question{
  _id: { $oid: string }; // MongoDB ObjectId
  title:string;
  content:string;
  location:string;
  favorites:string[];
}
