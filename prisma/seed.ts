import { ensureOwnerUser } from "@/lib/auth/owner";

async function main() {
  await ensureOwnerUser();
}

main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
