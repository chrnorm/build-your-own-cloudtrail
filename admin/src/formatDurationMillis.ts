import { Duration } from "@bufbuild/protobuf";

export const formatDurationMillis = (dur: Duration | undefined) => {
  if (dur === undefined) {
    return "<unknown>";
  }
  const seconds = Number(dur.seconds);
  const nanos = dur.nanos;

  if (seconds === 0 && nanos < 1_000_000) {
    return `${(nanos / 1_000_000).toFixed(3)}ms`;
  }

  const total = Math.round(seconds * 1000 + nanos / 1_000_000);

  return `${total}ms`;
};
