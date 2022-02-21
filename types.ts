export type Museum = {
   name: string;
   city: string;
   id: number;
   works?:Work[]
};

export type museumData = Omit<Museum, 'id'>

export type Work = {
   name: string;
   picture: string;
   museumId: number;
   id: number;
   museum?:Museum
};

export type workData = Omit<Work, 'id'>