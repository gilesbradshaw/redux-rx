import { Observable } from 'rxjs';

export default function isObservable(val) {
  return val instanceof Observable;
}
