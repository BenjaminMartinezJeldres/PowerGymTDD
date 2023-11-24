export interface ExerciseMachine {
    id: string;
    name: string;
    type: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    imageUrl: string;
    description: string;
  }
  