export enum Type {
    Personal='Personal',
    Work='Work',
    Shopping='Shopping',
    Others='Others'
}
  
export enum Priority {
    Important='Important',
    Normal='Normal'
}
  
export type Todo = {
    text: string;
    todoType: string;
    priority: string;
    complete: boolean;
}