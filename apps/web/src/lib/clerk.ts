import { auth, currentUser } from "@clerk/nextjs/server";

export { auth, currentUser };

export async function getOrganizationDetails() {
  const { orgId, orgRole, orgSlug } = auth();
  return {
    orgId,
    orgRole,
    orgSlug,
  };
}
