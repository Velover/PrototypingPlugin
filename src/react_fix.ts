export function ReactFix() {
  const readable_g = _G as Map<string, string>;
  readable_g.set("__ROACT_17_MOCK_SCHEDULER__", undefined as never)
}