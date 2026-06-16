import { OpportunitiesClient } from "./OpportunitiesClient";

type OpportunitiesPageProps = {
  searchParams: Promise<{
    search?: string | string[];
    age?: string | string[];
    category?: string | string[];
    free?: string | string[];
  }>;
};

function readFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  const params = await searchParams;
  const initialSearch = readFirstParam(params.search);
  const initialAge = readFirstParam(params.age);
  const initialCategory = readFirstParam(params.category);
  const initialFreeOnly = readFirstParam(params.free) === "true";

  return (
    <OpportunitiesClient
      initialSearch={initialSearch}
      initialAge={initialAge}
      initialCategory={initialCategory}
      initialFreeOnly={initialFreeOnly}
    />
  );
}
