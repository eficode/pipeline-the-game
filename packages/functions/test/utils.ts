export async function allSequentially(promises: Promise<any>[]) {
  for (const promise of promises) {
    await promise;
  }
}
