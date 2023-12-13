import { IPriority } from '../../tasks/attributes/interfaces/priority.interface';
import { IStatus } from '../../tasks/attributes/interfaces/status.interfaces';

export class ITasks {
  //Nombre de la tarea
  name: string;
  //Objetivos a cumplir
  goals: string;
  //Prioridad de la misma
  priority: IPriority;
  //Fecha limite de entrega
  deadline: Date;
  //Estado en el que se encuentra la tarea
  status: IStatus;
  //Commentarios o notas
  remarks: string;
}
