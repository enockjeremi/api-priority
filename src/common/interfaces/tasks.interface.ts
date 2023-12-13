import { Priority } from 'src/tasks/attributes/interfaces/priority.interface';
import { Status } from 'src/tasks/attributes/interfaces/status.interfaces';

export class ITasks {
  //Nombre de la tarea
  name: string;
  //Objetivos a cumplir
  goals: string;
  //Prioridad de la misma
  priority: Priority;
  //Fecha limite de entrega
  deadline: Date;
  //Estado en el que se encuentra la tarea
  status: Status;
  //Commentarios o notas
  remarks: string;
}
