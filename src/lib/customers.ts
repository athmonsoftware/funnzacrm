export async function createCustomerApi(form: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
