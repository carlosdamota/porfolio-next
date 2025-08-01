const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEVELOPER_ID = process.env.NEXT_PUBLIC_DEVELOPER_ID

export const getProjects = async () => {
  try {
    const resp = await fetch(
      `${API_URL}/projects/developer/${DEVELOPER_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error in fetch");
    }

    const data = await resp.json();
    return { projects: Array.isArray(data) ? data : [] };
  } catch (error) {
  console.error("Failed to fetch projects by developer:", error);
  const errorMessage = error instanceof Error ? error.message : "Error desconocido";
  return { error: true, message: errorMessage };
}
};

export const getProjectById = async (id: string) => {
  try {
    const resp = await fetch(`${API_URL}/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error in fetch");
    }
    const data = await resp.json();
    return { project: data };
  } catch (error) {
    console.error("Failed to fetch project:", error);
     const errorMessage = error instanceof Error ? error.message : "Error desconocido";
  return { error: true, message: errorMessage };
  }
};