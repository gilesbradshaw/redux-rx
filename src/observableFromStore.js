import { Observable } from 'rxjs';

export default function observableFromStore(store) {
  return Observable.create(observer =>
    store.subscribe(() => observer.next(store.getState()))
  );
}
