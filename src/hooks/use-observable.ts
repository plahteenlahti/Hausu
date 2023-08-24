import { useEffect, useMemo, useState } from "react";
import { Subject, Subscription } from "rxjs";

export default function useObservable(
  observable: any,
  initial?: any,
  inputs: any[] = []
) {
  const [state, setState] = useState(initial);
  const subject = useMemo(() => new Subject(), inputs);

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(subject);
    subscription.add(
      subject.pipe(() => observable).subscribe((value) => setState(value))
    );
    return () => subscription.unsubscribe();
  }, [subject]);

  return state;
}
