export async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockNetworkDelay(minMs = 280, maxMs = 420): Promise<void> {
  const duration = minMs + Math.floor(Math.random() * (maxMs - minMs));
  await delay(duration);
}
