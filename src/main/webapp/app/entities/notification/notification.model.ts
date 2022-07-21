import dayjs from 'dayjs/esm';

export interface INotification {
  id?: number;
  description?: string | null;
  date?: dayjs.Dayjs | null;
  vu?: boolean | null;
  message?: string | null;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public description?: string | null,
    public date?: dayjs.Dayjs | null,
    public vu?: boolean | null,
    public message?: string | null
  ) {
    this.vu = this.vu ?? false;
  }
}

export function getNotificationIdentifier(notification: INotification): number | undefined {
  return notification.id;
}
