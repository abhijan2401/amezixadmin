export const getNotes = async (data) => {
  try {
    const response = await fetch("https://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/getAllData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        tablename: data,
      }),
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteData = async (data) => {
  console.log("second", data);
  try {
    const response = await fetch(
      "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/delete",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          tablename: data.table_name,
        }),
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};
