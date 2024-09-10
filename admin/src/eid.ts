interface EID {
  id: string;
  type: string;
}

export const formatEID = (eid: EID | undefined) => {
  if (eid === undefined) return "";
  if (eid.id === "") return `All ${eid.type}s`;
  return `${eid.type}::"${eid.id}"`;
};
